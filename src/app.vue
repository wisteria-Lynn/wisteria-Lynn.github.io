<template>
	<div id="app">
		<router-view :key="$route.fullPath"></router-view>
		<v-cropper></v-cropper>
		<v-veiwer></v-veiwer>
	</div>
</template>
<style lang="less" type="text/less">
	#app {
		/*min-width:375px;*/
		width: 100%;
		height: 100%;
	}

	/*<!--公共css样式可以此处导入-->*/
	@import "./assets/less/layout.less";
	@import "assets/font/fontFamily.css";
	@import "./assets/less/chat.less";
</style>
<script>
	import cropper from './components/cropper/cropperMode'
	import viewer from './components/cropper/viewerMode'
	import Bus from './common/bus'

	export default {
		name: 'app',
		components: {
			'v-cropper': cropper,
			'v-veiwer': viewer
		},
		data() {
			return {
				// provide / inject 组合刷新重加载当前页
				isRouterAlive: true,
				chatLoginName: sessionStorage.getItem('chatLoginName'),
				localMessageIndex: '',
				localMessage: JSON.parse(sessionStorage.getItem('localMessage')) || [],// 本地聊天记录
				messageList: []
			}
		},
		provide() {
			return {
				reload: this.reload
			}
		},
		created() {
			// 开启长连接
			this.initWebSocket()
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true
				})
			},
			// websocket 初始化
			initWebSocket() {
				// 链接服务器
				const wsUrl = 'ws://127.0.0.1:3001'// ws地址
				this.websock = new WebSocket(wsUrl)
				this.WS.setWs(this.websock)
				// 开启
				this.websock.onopen = this.websocketonopen
				// 连接出错
				this.websock.onerror = this.websocketonerror
				// 系统消息
				this.websock.onmessage = this.websocketonmessage
				// 关闭
				this.websock.onclose = this.websocketclose
				// 前端代码监听页面关闭或者刷新
				window.onunload = () => {
					this.close()
				}
				//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				window.onbeforeunload = function () {
					this.close()
				}
			},
			websocketonopen() {
				console.log('WebSocket连接成功')
				// 如果当前用户存在
				if (this.chatLoginName) {
					let message = {
						type: 'login',
						username: this.chatLoginName
					}
					this.websock.send(JSON.stringify(message))
				}
			},
			websocketonmessage(e) {
				const data = JSON.parse(e.data)
				console.log(data)
				switch (data.type) {
					// 系统消息
					case 'system':
						this.$store.dispatch('system', data.message)
						break
					// 用户在线列表
					case 'userList':
						this.$store.dispatch('userList', data.message)
						break
					// 对话消息
					case 'message':
						// 判断接收的消息是否属于该用户
						if (this.chatLoginName === data.sendName || this.chatLoginName === data.reciveName) {
							// 该用户的本地消息索引
							this.localMessageIndex = this.localMessage.findIndex((val, index, arr) => {
								return val.name === this.chatLoginName
							})
							// 接收方昵称
							let reciveName = this.chatLoginName === data.sendName ? data.reciveName : data.sendName
							// 消息条数
							let messNum = 0
							let isPage = this.$route.path === '/wechat/chatPage' &&JSON.parse(this.$route.query.info).username === reciveName
							if (!isPage) {
								messNum++
							}
							// 判断该用户是否有本地消息
							if (this.localMessageIndex > -1) {
								// 获取该账户的本地消息
								this.messageList = this.localMessage[this.localMessageIndex].list
								// 获取接收方在本地的消息索引
								let reciveNameIndex = this.messageList.findIndex((val, index, arr) => {
									return val.chatName === reciveName
								})
								if (reciveNameIndex > -1) {
									// 该对象有聊天消息，将新消息压入
									this.messageList[reciveNameIndex].chatArr.push({
										name: data.sendName,
										mess: data.message
									})
									// 新消息提示
									if (messNum > 0) {
										this.$set(this.messageList[reciveNameIndex], 'msNum', this.messageList[reciveNameIndex].msNum + messNum)
									}
								} else {
									// 该对象没有聊天消息，新增
									this.messageList.push({
										chatName: reciveName,
										chatArr: [{
											name: data.sendName,
											mess: data.message
										}],
										msNum: messNum
									})
								}
								// 更新本地消息
								this.localMessage[this.localMessageIndex].list = this.messageList
							} else {
								// 该账户没有聊天记录 新增关于该账户的消息
								this.messageList.push({
									chatName: reciveName,
									chatArr: [{
										name: data.sendName,
										mess: data.message
									}],
									msNum: messNum
								})
								this.localMessage.push({
									name: this.chatLoginName,
									list: this.messageList,
								})
								this.localMessageIndex = this.localMessage.length - 1
							}
							// 更新存储信息
							this.$store.dispatch('localMessageIndex', this.localMessageIndex)
							this.$store.dispatch('localMessage', this.localMessage)
							// 是否是聊天页面
							if(isPage && this.localMessageIndex > -1){
								this.$store.dispatch('chatArr',JSON.parse(this.$route.query.info).username)
							}
						}
						break
				}
			},
			close() {
				if (this.chatLoginName) {
					this.websock.send(JSON.stringify({
						type: 'close',
						username: this.chatLoginName
					}))
				}
				this.websocketclose()
			},
			websocketclose() {
				console.log("服务器关闭")
			},
			websocketonerror() {
				console.log("连接出错")
			},
		},
		watch: {
			'$route': () => {
				window.scrollTo(0, 0)
			}
		},
		destroyed() {
			this.websocketclose()
		}
	}
</script>
