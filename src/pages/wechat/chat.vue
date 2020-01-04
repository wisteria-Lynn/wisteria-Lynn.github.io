<template>
	<div class="chat bg-color--hui" :class="[chatTheme]" style="min-height:100%;">
		<div class="chat-header tc" style="height:15%;line-height:4.5;color:#fff;font-size:32px;">
			欢迎&nbsp;{{chatLoginName}}&nbsp;进入渔火聊天室
		</div>
		<!--聊天全局-->
		<div class="chat-wrap all-wrap">
			<!--聊天居中窗口-->
			<div class="chat-frame bg-color--white">
				<div class="fram-animals">
					<img v-show="animals%3 === 0" class="animal-1" src="../../assets/img/wechat/animals1.png" alt="">
					<img v-show="animals%3 === 1" class="animal-2" src="../../assets/img/wechat/animals2.png" alt="">
					<img v-show="animals%3 === 2" class="animal-3" src="../../assets/img/wechat/animals3.png" alt="">
				</div>
				<!--左侧-->
				<div class="fram-side f14">
					<!--左侧头部-->
					<div class="fram-side-head tc pb20">
						<p style="margin-top:0;" class="tl p10">
							<el-popover
								placement="top"
								trigger="hover">
								<div class="chat-theme" @click="changeChatTheme">
									<span id="chat-bg-color-0"></span>
									<span id="chat-bg-color-1"></span>
									<span id="chat-bg-color-2"></span>
									<span id="chat-bg-color-3"></span>
									<span id="chat-bg-color-4"></span>
									<span id="chat-bg-color-5"></span>
									<span id="chat-bg-color-6"></span>
								</div>
								<span slot="reference" class="cp">主题</span>
							</el-popover>
						</p>
						<img :src="GLOBAL.avatar" alt="">
						<p class="mt10">
							{{chatLoginName}}&nbsp;|&nbsp;<span @click="loginout">切换</span>
						</p>
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
					<el-row style="height: 40px;line-height: 40px;" class="tc">
						<el-col :span="12" class="activePanel cp" :class="[activePanel === 'friend' ? 'active' : '']" @click.native="activePanel = 'friend'">好友({{chatList.length}})</el-col>
						<el-col :span="12" class="activePanel cp" :class="[activePanel === 'groups' ? 'active' : '']" @click.native="activePanel = 'groups'">群聊(0)</el-col>
					</el-row>
					<!--好友列表-->
					<div class="fram-side-list" v-show="activePanel === 'friend'">
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
					<!--群聊列表-->
					<div class="fram-side-list" v-show="activePanel === 'groups'">
						<div class="f-s-scroll scroll-style tc">
							敬请期待！
						</div>
					</div>
				</div>
				<!--中间内容-->
				<div class="fram-container">
					<!--内容头部-->
					<div class="fram-head f14">
						<div>{{chatDetail.chatName}}</div>
					</div>
					<!--聊天内容-->
					<div class="fram-content">
						<div class="m-p-scroll scroll-style" ref="bottomScroll">
							<div class="message-panel">
								<div v-for="list in messageList" v-if="list.chatName === chatDetail.chatName">
									<div class="m-p-wrap" v-for="item in list.chatArr">
										<el-row type="flex" v-if="item.name === chatLoginName" class="message-you">
											<img :src="GLOBAL.avatar" alt>
											<span>{{item.mess}}</span>
										</el-row>
										<el-row v-else type="flex" class="message-he" style="justify-content: flex-end;">
											<span>{{item.mess}}</span>
											<img :src="GLOBAL.avatar" alt>
										</el-row>
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
								@focus="animalsAdd"
								placeholder="请输入内容"
								v-model="message">
							</el-input>
						</div>
					</div>
					<!--聊天发送-->
					<div class="fram-foot">
						<div class="tr" style="padding:0 1px;">
							<el-button @click="send">发送</el-button>
						</div>
					</div>
				</div>
			</div>
			<!--右侧-->
			<div class="fram-rgiht-open" v-show="!isShowSys" @click="isShowSys = !isShowSys">
				<span style="display: block;width:14px;" class="f14 p10 cp">系统消息></span>
			</div>
			<div class="fram-rgiht ml20 f14" v-show="isShowSys">
				<!--右侧头部-->
				<div class="fram-head">
					<div><span @click="isShowSys = false" class="cp"><</span>&nbsp;系统消息</div>
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
				sysMessages: [],//系统消息
				chatTheme:'chat-bg-color-0',
				isShowSys:false,
				animals:1,
				activePanel:'friend'
			}
		},
		methods: {
			// websocket 初始化
			initWebSocket() {
				// 链接服务器
				const wsUrl = 'ws://127.0.0.1:3001'// ws地址
				this.websock = new WebSocket(wsUrl)
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
				console.log(e.data)
				let data = JSON.parse(e.data)
				// 系统消息
				if (data.type === 'system') {
					this.sysMessages.push(data.message)
				}
				// 用户在线列表
				if (data.type === 'userList') {
					this.chatLineList = data.message
				}
				// 对话消息
				if (data.type === 'message') {
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
			// 发送
			send() {
				if (!window.WebSocket) {
					this.layer.msg('服务器关闭，请退出重新登录')
					return
				}
				if (this.chatDetail.chatName === '') {
					this.layer.msg('请选择聊天对象')
					return
				}
				if (this.message.replace(/\s/g, "") === '') {
					this.layer.msg('消息不能为空')
					return
				}
				if (this.chatDetail.type !== 2) {
					this.layer.msg('你们还不是好友，不能聊天哦')
					return
				}
				if (!this.chatDetail.readay) {
					this.layer.msg('该好友不在线，不能聊天哦')
					return
				}
				let message = {
					type: 'message', // 消息类型
					sendName: this.chatLoginName,// 发送方昵称
					reciveName: this.chatDetail.chatName,// 接收方昵称
					message: this.message // 消息
				}
				this.websock.send(JSON.stringify(message))
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
			// 退出
			loginout() {
				this.close()
				this.$router.push({name:'chatLogin'})
			},
			changeChatTheme(e){
				let theme = e.target.id
				this.chatTheme = theme ? theme : this.chatTheme
			},
			animalsAdd(){
				this.animals++
			}
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
				// 开启长连接
				this.initWebSocket()
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
	@chatTheme0:#354a5f;
	@chatTheme1:#3598db;
	@chatTheme2:rgb(55,178,248);
	@chatTheme3:#637cfb;
	@chatTheme4:#6691fa;
	@chatTheme5:#f49110;
	@chatTheme6:#e4d7cf;
	.chat-bg-color-0{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme0;
			color:#fff !important;
		}
		.activePanel{
			&.active{
				background: #1e3750;
			}
		}
		.f-l-item {
			&.active{
				background: #1e3750;
			}
			&:hover{
				background: #41566b;
			}
		}
		.message-you{
			span{
				background:@chatTheme0;
				box-shadow: 0 0 15px #ddd;
			}
		}
	}
	.chat-bg-color-1{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme1;
			color:#fff !important;
		}
		.f-l-isready{
			color:#dcdcdc !important;
		}
	}
	.chat-bg-color-2{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme2;
			color:#fff !important;
		}

		.f-l-isready{
			color:#dcdcdc !important;
		}
	}
	.chat-bg-color-3{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme3;
			color:#fff !important;
		}

		.f-l-isready{
			color:#dcdcdc !important;
		}
	}
	.chat-bg-color-4{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme4;
			color:#fff !important;
		}

		.f-l-isready{
			color:#dcdcdc !important;
		}
	}
	.chat-bg-color-5{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme5;
			color:#fff !important;
		}
		.f-l-isready{
			color:#dcdcdc !important;
		}
	}
	.chat-bg-color-6{
		.chat-header,.fram-side,.fram-side-head,.fram-rgiht .fram-head,.fram-rgiht-open span{
			background:@chatTheme6;
		}
	}
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
	.chat-theme{
		span{
			display: inline-block;
			cursor: pointer;
			width:15px;
			height:15px;
		}
		span:nth-child(1){
			background:@chatTheme0;
		}
		span:nth-child(2){
			background:@chatTheme1;
		}
		span:nth-child(3){
			background:@chatTheme2;
		}
		span:nth-child(4){
			background:@chatTheme3;
		}
		span:nth-child(5){
			background:@chatTheme4;
		}
		span:nth-child(6){
			background:@chatTheme5;
		}
		span:nth-child(7){
			background:@chatTheme6;
		}
	}
</style>
