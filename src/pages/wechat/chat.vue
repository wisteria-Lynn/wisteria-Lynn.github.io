<template>
	<div class="chat">
		<v-head-back-2 url="/"></v-head-back-2>
		<!--聊天全局-->
		<div class="chat-wrap">
			<!--聊天居中窗口-->
			<div class="chat-frame">
				<!--左侧-->
				<div class="fram-side">
					<!--左侧头部-->
					<div class="fram-side-head">
						<span>{{chatLoginName}}</span>
						<span @click="loginout" class="cursor-point">退出</span>
					</div>
					<!--好友列表-->
					<div style="height:40px;line-height: 40px;padding-left:5px;">
						好友列表({{chatList.length}})
					</div>
					<!--搜索框-->
					<div class="fram-side-search">
						<el-input
							size="mini"
							placeholder="请输入内容"
							suffix-icon="el-icon-search"
							v-model="searchName">
						</el-input>
					</div>
					<!--好友列表-->
					<div class="fram-side-list">
						<div class="f-s-scroll scroll-style">
							<div v-for="(item,index) in chatList" @click="chatClick(item)" :key="index"
								 :class="[item.username === chatDetail.chatName?'active':'']" class="f-l-item">
							<!--<div v-for="item in chatList" @click="chatClick(item)" class="f-l-item">-->
								<span class="f-l-name">{{item.username}}</span>
								<div v-if="item.type === 2" style="float:right;">
									<span class="message-num chat-ms-num" v-if="getMessNum(item) > 0">{{getMessNum(item)}}</span>
								</div>
								<span class="f-l-isready">{{getReadyLine(item,index) ? '在线':'离线'}}</span>
								<div v-if="item.type === 0" style="float:right;">
									<span class="btn btn-error chat-btn-reject">待通过</span>
								</div>
								<div v-if="item.type === 1" style="float:right;">
									<span class="btn btn-success chat-btn-agree" @click="getChatAddFriend(item,'recive')">接受</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--中间内容-->
				<div class="fram-container">
					<!--错误提示-->
					<div class="errorMssage" v-if="isShowError">
						<!--<div>{{errorMessage}}</div>-->
						<div><el-alert
							:title="errorMessage"
							type="warning"
							show-icon
							:closable="false">
						</el-alert></div>
					</div>
					<!--内容头部-->
					<div class="fram-head">
						<div>{{chatDetail.chatName}}</div>
					</div>
					<!--聊天内容-->
					<div class="fram-content">
						<div class="m-p-scroll scroll-style" ref="bottomScroll">
							<div class="message-panel">
								<div v-for="list in messageList" v-if="list.chatName === chatDetail.chatName">
									<div class="m-p-wrap" v-for="item in list.chatArr">
										<div v-if="item.name === chatLoginName" class="t-right">
											<div class="m-p-name-1">{{item.name}}</div>
											<span class="m-p-text-1 right">{{item.mess}}</span>
										</div>
										<div v-else class="t-left">
											<div class="m-p-name-2">{{item.name}}</div>
											<span class="m-p-text-2">{{item.mess}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--聊天输入框-->
					<div class="fram-input">
						<div style="padding:0 2px;">
							<el-input
								@keyup.enter.native="send"
								type="textarea"
								placeholder="请输入内容"
								v-model="message">
							</el-input>
						</div>
					</div>
					<!--聊天发送-->
					<div class="fram-foot t-right">
						<div style="padding:0 1px;">
							<el-button @click="send">发送</el-button>
						</div>
					</div>
				</div>
				<!--右侧-->
				<div class="fram-rgiht">
					<!--右侧头部-->
					<div class="fram-head">
						<div>系统消息</div>
					</div>
					<!--右侧系统消息-->
					<div class="fram-right-content">
						<div class="f-r-scroll scroll-style">
							<div v-for="list in sysMessages">{{list}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { chatFriendList,chatAddFriend } from '../../api/user'
	import { codeText } from '../../api/api'
	import Bus from '../../common/bus'
	export default {
		name: "chat",
		data() {
			return {
				chatLoginName: '',// 聊天室登录账号
				ws: '', // 服务器对象
				searchName: '', // 搜索关键字
				chatDetail:{ // 聊天对象信息
					chatName: '',// 对象名字
					type:'', // 和该对象的关系，0已发送加好友信息，1等待好友验证，2已是好友关系
					readay:''// 是否在线
				}, // 对方详情
				chatLineList: [],// 聊天在线用户
				chatList: [],// 好友列表
				message: '', // 发送的消息
				localMessage:JSON.parse(sessionStorage.getItem('messageList')) || [],// 本地聊天记录
				localIndex:'',// 该登录用户在本地消息记录中的索引
				messageList: [],// 消息列表
				errorMessage: '',// 错误信息
				isShowError: false,// 错误信息展示tip
				sysMessages: [],//系统消息
			}
		},
		methods: {
			// 发送
			send() {
				if (!window.WebSocket) {
					this.errorMessage = '服务器关闭，请退出重新登录'
					this.isShowError = true
					return
				}
				if (this.chatDetail.chatName === '') {
					this.errorMessage = '请选择聊天对象'
					this.isShowError = true
					return
				}
				if ( this.message === '') {
					this.errorMessage = '消息不能为空'
					this.isShowError = true
					return
				}
				if (this.chatDetail.type !== 2) {
					this.errorMessage = '你们还不是好友，不能聊天哦'
					this.isShowError = true
					return
				}
				if (!this.chatDetail.readay) {
					this.errorMessage = '该好友不在线，不能聊天哦'
					this.isShowError = true
					return
				}
				let message = {
					type: 'message', // 消息类型
					sendName: this.chatLoginName,// 发送方昵称
					reciveName: this.chatDetail.chatName,// 接收方昵称
					message: this.message // 消息
				}
				this.ws.send(JSON.stringify(message))
				this.message = ''
			},
			// 左侧item点击事件
			chatClick(u) {
				// 消息索引
				let MsIndex = this.messageList.findIndex((val, index, arr) => {
					return val.chatName === u.username
				})
				if (MsIndex > -1) {
					// 是否有未读消息
					if (this.messageList[MsIndex].msNum > 0) {
						this.$set(this.messageList[MsIndex],'msNum',0)
						// 已读过后，更新本地消息
						let localIndex = this.localMessage.findIndex((val, index, arr) => {
							return val.name === this.chatLoginName
						})
						this.localMessage[localIndex].list = this.messageList
						sessionStorage.setItem('messageList', JSON.stringify(this.localMessage))
					}
				}
				// 滚动条居底部
				setTimeout(()=> {
					let div = this.$refs.bottomScroll
					div.scrollTop = div.scrollHeight
				},100)
				// 聊天对象信息
				this.chatDetail = {
					chatName:u.username,
					type:u.type,
					readay:u.readay
				}
				this.errorMessage = ''
				this.isShowError = false
			},
			// 判断用户是否在线
			getReadyLine(item,index){
				let result = this.chatLineList.filter((val, index, arr) => {
					return val.username === item.username
				})
				let readay = result.length === 0 ? false : result[0].readay
				this.chatList[index].readay = readay
				return readay
			},
			// 获取好友列表
			getFrendList(){
				chatFriendList({
					name:this.chatLoginName
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						this.chatList = res.data
					}
				})
			},
			// 判断未读消息
			getMessNum(item) {
				let result = this.messageList.filter((val, index, arr) => {
					return val.chatName === item.username
				})
				return result.length === 0 ? 0 : result[0].msNum
			},
			// 添加/接受 好友
			getChatAddFriend(item,type) {
				chatAddFriend({
					sendName:type === 'add' ? this.chatLoginName : item.username,
					reciveName:type === 'recive' ? this.chatLoginName : item.username,
					type:type
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						this.getFrendList()
					}
				})
			},
			// getChatReciveFriend() {
			// 	chatReciveFriend({}).then((res) => {
			// 		if(res.code !== 0) {
			// 			this.layer.msg(codeText(res.code))
			// 		} else {
			//
			// 		}
			// 	})
			// },
			// 关闭服务器连接
			wsClose(){
				this.ws.send(JSON.stringify({
					type: 'close',
					username: this.chatLoginName
				}))
				this.ws.onclose()
			},
			// 退出
			loginout() {
				this.wsClose()
				this.$router.push({name:'chatLogin'})
			}
		},
		mounted(){
			// 获取ws传值
			Bus.$on('system', (data) => {
				this.sysMessages.push(data.message)
			})
			Bus.$on('userList', (data) => {
				this.chatLineList = data.message
			})
			Bus.$on('message', (data) => {
				// 对方昵称
				let levName = this.chatLoginName === data.sendName ? data.reciveName : data.sendName
				// 消息条数
				let messNum = 0
				// 聊天时是否显示当前 发送/接收 消息的面板
				if(levName !== this.chatDetail.chatName) {
					// 消息条数加1
					messNum++
				} else {
					// 聊天消息置底
					setTimeout(()=> {
						let div = this.$refs.bottomScroll
						div.scrollTop = div.scrollHeight
					},100)
				}
				// 该账户有聊天记录
				if (this.localIndex > -1) {
					this.messageList = this.localMessage[this.localIndex].list
					// 拿取聊天对象的消息索引
					let index = this.messageList.findIndex((val, index, arr) => {
						return val.chatName === levName
					})
					// 判断该对象是否有聊天消息
					if (index > -1) {
						// 该对象有聊天消息，将新消息压入
						this.messageList[index].chatArr.push({
							name: data.sendName,
							mess: data.message
						})
						// 新消息提示
						if(messNum > 0){
							this.$set(this.messageList[index],'msNum',this.messageList[index].msNum + messNum)
						}
					} else {
						// 该对象没有聊天消息，新增
						this.messageList.push({
							chatName: levName,
							chatArr: [{
								name: data.sendName,
								mess: data.message
							}],
							msNum:messNum
						})
					}
					// 更新本地消息
					this.localMessage[this.localIndex].list = this.messageList
				} else {
					// 该账户没有聊天记录 新增关于该账户的消息
					this.messageList.push({
						chatName: levName,
						chatArr: [{
							name: data.sendName,
							mess: data.message
						}],
						msNum:messNum
					})
					this.localMessage.push({
						name:this.chatLoginName,
						list:this.messageList,
					})
					this.localIndex = this.localMessage.length - 1
				}
				// 更新存储信息
				sessionStorage.setItem('messageList', JSON.stringify(this.localMessage))
			})
		},
		created() {
			let r_name = this.$route.params.name || sessionStorage.getItem('chatLoginName')
			let websockLink = sessionStorage.getItem('websocketLink')
			if (r_name && websockLink === '1'){
					// 保存登录名
					sessionStorage.setItem('chatLoginName',r_name)
					this.chatLoginName = r_name
				// 获取好友列表
				this.getFrendList()
				// 当前账户的消息索引
				this.localIndex = this.localMessage.findIndex((val, index, arr) => {
					return val.name === this.chatLoginName
				})
				// 拿取该账户的本地消息
				this.messageList =this.localIndex > -1 ? this.localMessage[this.localIndex].list : []
					// 链接服务器
					// let ws = new WebSocket('ws://127.0.0.1:3001')
					// this.ws = ws
					// ws.onopen = (e) => {
					// 	console.log("连接服务器成功")
					// 	// 发送登录消息
					// 	let message = {
					// 		type: 'login',
					// 		username: this.chatLoginName
					// 	}
					// 	this.ws.send(JSON.stringify(message))
					// }
					// ws.onmessage = (e) => {
					// 	console.log(e.data)
					// 	let data = JSON.parse(e.data)
					// 	// 系统消息
					// 	if (data.type === 'system') {
					// 		this.sysMessages.push(data.message)
					// 	}
					// 	// 用户在线列表
					// 	if (data.type === 'userList') {
					// 		this.chatLineList = data.message
					// 	}
					// 	// 对话消息
					// 	if (data.type === 'message') {
					// 		// 对方昵称
					// 		let levName = this.chatLoginName === data.sendName ? data.reciveName : data.sendName
					// 		// 消息条数
					// 		let messNum = 0
					// 		// 聊天时是否显示当前 发送/接收 消息的面板
					// 		if(levName !== this.chatDetail.chatName) {
					// 			// 消息条数加1
					// 			messNum++
					// 		} else {
					// 			// 聊天消息置底
					// 			setTimeout(()=> {
					// 				let div = this.$refs.bottomScroll
					// 				div.scrollTop = div.scrollHeight
					// 			},100)
					// 		}
					// 		// 该账户有聊天记录
					// 		if (this.localIndex > -1) {
					// 			this.messageList = this.localMessage[this.localIndex].list
					// 			// 拿取聊天对象的消息索引
					// 			let index = this.messageList.findIndex((val, index, arr) => {
					// 				return val.chatName === levName
					// 			})
					// 			// 判断该对象是否有聊天消息
					// 			if (index > -1) {
					// 				// 该对象有聊天消息，将新消息压入
					// 				this.messageList[index].chatArr.push({
					// 					name: data.sendName,
					// 					mess: data.message
					// 				})
					// 				// 新消息提示
					// 				if(messNum > 0){
					// 					this.$set(this.messageList[index],'msNum',this.messageList[index].msNum + messNum)
					// 				}
					// 			} else {
					// 				// 该对象没有聊天消息，新增
					// 				this.messageList.push({
					// 					chatName: levName,
					// 					chatArr: [{
					// 						name: data.sendName,
					// 						mess: data.message
					// 					}],
					// 					msNum:messNum
					// 				})
					// 			}
					// 			// 更新本地消息
					// 			this.localMessage[this.localIndex].list = this.messageList
					// 		} else {
					// 			// 该账户没有聊天记录 新增关于该账户的消息
					// 			this.messageList.push({
					// 				chatName: levName,
					// 				chatArr: [{
					// 					name: data.sendName,
					// 					mess: data.message
					// 				}],
					// 				msNum:messNum
					// 			})
					// 			this.localMessage.push({
					// 				name:this.chatLoginName,
					// 				list:this.messageList,
					// 			})
					// 			this.localIndex = this.localMessage.length - 1
					// 		}
					// 		// 更新存储信息
					// 		sessionStorage.setItem('messageList', JSON.stringify(this.localMessage))
					// 	}
					// }
					// ws.onclose = (e) => {
					// 	console.log("服务器关闭")
					// }
					// ws.onerror = e => {
					// 	console.log("连接出错")
					// }
					// // 前端代码监听页面关闭或者刷新
					// window.onunload = () => {
					// 	this.wsClose()
					// }
					// //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
					// window.onbeforeunload = function () {
					// 	this.wsClose()
					// }
			} else {
				sessionStorage.removeItem('chatLoginName')
				this.$router.push({name:'chatLogin'})
			}
		}
	}
</script>
<style>
	.fram-input textarea {
		height: 120px;
		border: none;
	}
</style>
<style scoped lang="less">
	.chat-btn-agree,.chat-btn-reject{
		padding:0 10px;
		font-size:12px;
		line-height: 20px;
	}
	.chat-ms-num{
		width:20px;
		height:20px;
		line-height: 20px;
		font-size:12px;
		text-align: center;
	}
</style>
