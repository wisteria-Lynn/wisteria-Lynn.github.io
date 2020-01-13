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
						<img :src="chatLoginAvatar||GLOBAL.avatar" alt="" @click="uploadAvatar">
						<p class="mt10">
							{{chatLoginName}}&nbsp;|
							<span v-show="!isChatLogin">离线</span>
							<span v-show="isChatLogin">在线</span>
						</p>
						<p class="mt10 chat-btn-link">
							<el-button v-show="!isChatLogin" type="primary" size="mini" @click="initWebSocket">重新连接
							</el-button>
							<el-button v-show="isChatLogin" type="primary" size="mini" @click="loginout">切换账号
							</el-button>
						</p>
					</div>
					<!--搜索框-->
					<div class="fram-side-search pr">
						<el-input
							@focus="animalsAdd"
							size="mini"
							placeholder="请输入昵称/群聊"
							v-model="searchName">
						</el-input>
						<i @click="searchUserName" class="el-icon-search pa cp"
						   style="right:10px;top:12px;color:#aaa;"></i>
					</div>
					<!--好友列表-->
					<el-row style="height: 40px;line-height: 40px;" class="tc">
						<el-col :span="12" class="activePanel cp" :class="[activePanel === 'friend' ? 'active' : '']"
								@click.native="activePanel = 'friend'">好友({{chatList.length}})
						</el-col>
						<el-col :span="12" class="activePanel cp" :class="[activePanel === 'groups' ? 'active' : '']"
								@click.native="activePanel = 'groups'">群聊(0)
						</el-col>
					</el-row>
					<!--好友列表-->
					<div class="fram-side-list" v-show="activePanel === 'friend'">
						<div class="f-s-scroll scroll-style">
							<div v-for="(item,index) in chatList" @click="chatClick(item,index)" :key="index"
								 :class="[item.username === curChatFriendName?'active':'']" class="f-l-item">
								<!--<div v-for="item in chatList" @click="chatClick(item)" class="f-l-item">-->
								<span class="f-l-name">{{item.username}}</span>
								<div v-if="item.type === 2" style="float:right;">
									<span class="message-num chat-ms-num" v-if="getMessNum(item) > 0">{{getMessNum(item)}}</span>
								</div>
								<span class="f-l-isready">{{item.ready ? '在线':'离线'}}</span>
								<div v-if="item.type === 0" style="float:right;">
									<span class="btn btn-error chat-btn-reject">待通过</span>
								</div>
								<div v-if="item.type === 1" style="float:right;">
									<span class="btn btn-success chat-btn-agree"
										  @click="getChatAddFriend(item,'recive')">接受</span>
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
					<el-alert
						:title="errorMessage"
						type="warning"
						show-icon
						:closable="false"
						v-show="isErrMes" style="position:absolute;top:-50px;">
					</el-alert>
					<template v-if="curChatFriendName">
						<!--内容头部-->
						<el-row class="fram-head f14">
							<el-col :span="12" class="pl20">{{curChatFriendName}}</el-col>
							<el-col :span="12" class="tr">
								<div class="msg-down-drop pr">
									<i class="el-icon-more rotate90 cp mr20" @click="msgDownMenu = !msgDownMenu"></i>
									<div class="msg-down-menu pa bg-color--white tl p10" v-show="msgDownMenu">
										<p @click="downMSG(curChatFriendName)">导出消息</p>
										<p @click="downMSG()">导出全部消息</p>
									</div>
								</div>
							</el-col>
						</el-row>
						<!--聊天内容-->
						<div class="fram-content">
							<div class="m-p-scroll scroll-style" ref="bottomScroll">
								<div class="message-panel">
									<div v-for="list in messageList" v-if="list.chatName === curChatFriendName">
										<div class="m-p-wrap" v-for="(item,index) in list.chatArr" :key="index">
											<el-row class="tc m10" v-if="index > 0 && getDataCapare(list,item,index)">
												<span class="time-box">
													{{getDataCapare(list,item,index)}}
												</span>
											</el-row>
											<el-row type="flex" v-if="item.name === chatLoginName" class="message-you"
													style="justify-content: flex-end;">
												<span class="mr10">{{item.mess}}</span>
												<img :src="chatLoginAvatar||GLOBAL.avatar" alt>
											</el-row>
											<el-row v-else type="flex" class="message-he">
												<img :src="GLOBAL.avatar" alt>
												<span class="ml10">{{item.mess}}</span>
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
									v-show="!isUseEnterSend"
									type="textarea"
									@focus="animalsAdd"
									placeholder="请输入内容"
									v-model="message">
								</el-input>
								<el-input
									v-show="isUseEnterSend"
									@keydown.enter.native="send($event)"
									type="textarea"
									@focus="animalsAdd"
									placeholder="请输入内容"
									v-model="message">
								</el-input>
							</div>
						</div>
						<!--聊天发送-->
						<div class="fram-foot">
							<div class="tr chat-btn-link" style="padding:0 1px;">
								<el-button @click="send">发送</el-button>
							</div>
						</div>
					</template>
					<div v-else class="yl-flex-center" style="height:80%;">
						<img v-show="animals%3 === 1" class="animal-1" src="../../assets/img/wechat/animals1.png"
							 alt="">
						<img v-show="animals%3 === 2" class="animal-2" src="../../assets/img/wechat/animals2.png"
							 alt="">
						<img v-show="animals%3 === 0" class="animal-3" src="../../assets/img/wechat/animals3.png"
							 alt="">
					</div>
				</div>
			</div>
			<!--右侧-->
			<div class="fram-rgiht-open" v-show="!isShowSys" @click="isShowSys = !isShowSys">
				<span style="display: block;width:14px;" class="f14 p10 cp">系统设置<i
					class="el-icon-d-arrow-left rotate270"></i></span>
			</div>
			<div class="fram-rgiht ml20 f14" v-show="isShowSys">
				<!--右侧头部-->
				<div class="fram-head">
					<div><span @click="isShowSys = false" class="cp"><i class="el-icon-d-arrow-left"></i></span>&nbsp;系统设置
					</div>
				</div>
				<!--右侧系统消息-->
				<div class="fram-right-content p10">
					<h2>系统消息</h2>
					<div class="f-r-scroll scroll-style pl10">
						<div v-for="list in sysMessages">
							<p class="f14">{{list.username}}<span class="btn chat-btn-addf"
																  :class="[list.way === '登录' ? 'btn-success' : 'btn-error']">{{list.way}}</span>
							</p>
							<span class="f12 time-box">{{list.time | dateFilter}}</span></div>
					</div>
					<h2 class="pt10">设置快捷键</h2>
					<div class="p10 chat-checkbox">
						<el-checkbox v-model="isUseEnterSend">使用enter发送</el-checkbox>
					</div>
				</div>
			</div>
		</div>
		<!-- 搜索弹窗 -->
		<el-dialog title="搜索结果" :visible.sync="searchPanelDialog">
			<el-tabs v-model="tabActiveName">
				<el-tab-pane label="用户" name="first">
					<div style="min-height:300px;">
						<p v-for="item in 10" :key="item" style="border-bottom:1px solid #ddd;" class="p10">
							{{item}}<span @click="getChatAddFriend(item,'add')"
										  class="btn btn-success chat-btn-addf cp">加为好友</span>
						</p>
					</div>
				</el-tab-pane>
				<el-tab-pane label="群聊" name="second">
					<div style="min-height:300px;">
						<p class="tc"> 没有搜索结果 </p>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
	import {chatUploadAvatar, chatAddFriend} from '../../api/user'
	export default {
		name: "chat",
		data() {
			return {
				isChatLogin: false, // 当前聊天室用户是否登录成功
				chatLoginName: '',// 当前聊天室登录用户
				chatLoginAvatar:'',
				searchName: '', // 搜索关键字
				curChatFriendIndex: null,// 当前聊天好友在列表中的索引
				curChatFriendName: '',//当前聊天好友对象昵称
				chatList: [],// 好友列表
				message: '', // 发送的消息
				localMessage: JSON.parse(localStorage.getItem('messageList')) || [],// 本地所有账号的聊天记录
				localIndex: '',// 该登录用户在本地消息记录中的索引
				messageList: [],// 该登录用户的聊天记录
				sysMessages: [],//系统消息
				chatTheme: 'chat-bg-color-0',//初始皮肤主题
				isShowSys: false,// 是否展示系统设置面板
				animals: 1,// 动画次数
				activePanel: 'friend', // 好友/群聊面板
				errorMessage: '',// 错误消息提示内容
				isErrMes: false, // 是否有错误消息
				isUseEnterSend: true, // 是否使用enter快捷键发送
				searchPanelDialog: false, // 是否展示搜索面板
				tabActiveName: 'first', // 搜索面板中当前应用tab
				msgDownMenu: false,// 下拉菜单
				websocketTime:0,// 连接次数
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
				this.isChatLogin = true
				this.isErrMes = false
				this.websocketTime = 0
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

				// 用户好友列表
				if (data.type === 'friendList') {
					this.chatList = data.message
				}

				// 对话消息
				if (data.type === 'message') {
					// 对方昵称
					let levName = this.chatLoginName === data.sendName ? data.reciveName : data.sendName
					// 消息条数
					let messNum = 0


					// 聊天时是否显示当前 发送/接收 消息的面板
					if (levName !== this.curChatFriendName) {
						// 消息条数加1
						messNum++
					} else {
						// 聊天消息置底
						setTimeout(() => {
							let div = this.$refs.bottomScroll
							div.scrollTop = div.scrollHeight
						}, 100)
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
								time: data.time,
								mess: data.message
							})
							// 新消息提示
							if (messNum > 0) {
								this.$set(this.messageList[index], 'msNum', this.messageList[index].msNum + messNum)
							}
						} else {
							// 该对象没有聊天消息，新增
							this.messageList.push({
								chatName: levName,
								chatArr: [{
									name: data.sendName,
									time: data.time,
									mess: data.message
								}],
								msNum: messNum
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
								time: data.time,
								mess: data.message
							}],
							msNum: messNum
						})
						this.localMessage.push({
							name: this.chatLoginName,
							list: this.messageList,
						})
						this.localIndex = this.localMessage.length - 1
					}
					// 更新存储信息
					localStorage.setItem('messageList', JSON.stringify(this.localMessage))
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
				this.isChatLogin = false
				this.isErrMes = true
				this.errorMessage = 'websocket服务器已关闭，请稍后连接'
				console.log("服务器关闭")
				if(sessionStorage.getItem('websocketLink') && this.websocketTime < 3){
					this.initWebSocket()
				}
			},
			websocketonerror() {
				this.isChatLogin = false
				this.isErrMes = true
				this.errorMessage = 'websocket连接出错，请重新连接'
				console.log("连接出错")
				if(sessionStorage.getItem('websocketLink') && this.websocketTime < 3){
					this.initWebSocket()
				}
			},
			// 发送
			send(e) {
				if (e && this.isUseEnterSend) {
					e.preventDefault();
				}
				if (!this.isChatLogin || !window.WebSocket) {
					this.layer.msg('服务器关闭，请退出重新登录')
					return false;
				}
				if (this.curChatFriendName === '') {
					this.layer.msg('请选择聊天对象')
					return false;
				}
				if (this.chatList[this.curChatFriendIndex].type !== 2) {
					this.layer.msg('你们还不是好友，不能聊天哦')
					return false;
				}
				if (!this.chatList[this.curChatFriendIndex].ready) {
					this.layer.msg('该好友不在线，不能聊天哦')
					return false;
				}
				if (this.message.replace(/\s/g, "") === '') {
					this.layer.msg('消息不能为空')
					return false;
				}
				let msg = {
					type: 'message',
					sendName: this.chatLoginName,// 发送方昵称
					reciveName: this.curChatFriendName,// 接收方昵称
					message: this.message // 消息
				}
				this.sendMes(msg)
			},
			// 发送
			sendMes(item) {
				this.websock.send(JSON.stringify(item))
				this.message = ''
			},
			// 更新头像
			uploadAvatar(){
				this.$prompt('请输入图片地址', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					chatUploadAvatar({
						avatar:value,
						username:this.chatLoginName
					}).then(()=>{
						this.chatLoginAvatar = value
						this.layer.msg('更换成功')
					})
				}).catch(() => {});
			},
			// 左侧item点击事件
			chatClick(u, index) {
				// 消息索引
				let MsIndex = this.messageList.findIndex((val, index, arr) => {
					return val.chatName === u.username
				})
				if (MsIndex > -1) {
					// 是否有未读消息
					if (this.messageList[MsIndex].msNum > 0) {
						this.$set(this.messageList[MsIndex], 'msNum', 0)
						// 已读过后，更新本地消息
						let localIndex = this.localMessage.findIndex((val, index, arr) => {
							return val.name === this.chatLoginName
						})
						this.localMessage[localIndex].list = this.messageList
						localStorage.setItem('messageList', JSON.stringify(this.localMessage))
					}
				}
				// 滚动条居底部
				setTimeout(() => {
					let div = this.$refs.bottomScroll
					div.scrollTop = div.scrollHeight
				}, 100)
				// 聊天对象信息
				this.curChatFriendIndex = index
				this.curChatFriendName = u.username
			},
			// 判断未读消息
			getMessNum(item) {
				let result = this.messageList.filter((val, index, arr) => {
					return val.chatName === item.username
				})
				return result.length === 0 ? 0 : result[0].msNum
			},
			// 添加/接受 好友
			getChatAddFriend(item, type) {
				chatAddFriend({
					sendName: type === 'add' ? this.chatLoginName : item.username,
					reciveName: type === 'recive' ? this.chatLoginName : item.username,
					type: type
				}).then((res) => {
					if (res.code !== 0) {
						this.layer.msg(res.message)
					} else {
						this.getFrendList()
						if (type === 'recive') {
							this.sendMes({
								type: 'message',
								sendName: this.chatLoginName,// 发送方昵称
								reciveName: item.username,// 接收方昵称
								message: '我们已经是好友了，赶紧来聊天吧'// 消息
							})
						} else {
							this.layer.msg('已给对方发送添加好友的通知！')
						}
					}
				})
			},
			// 退出
			loginout() {
				sessionStorage.removeItem('chatLoginName')
				sessionStorage.removeItem('websocketLink')
				sessionStorage.removeItem('chatLoginAvatar')
				this.close()
				this.$router.push({name: 'chatLogin'})
			},
			// 修改皮肤
			changeChatTheme(e) {
				let theme = e.target.id
				this.chatTheme = theme ? theme : this.chatTheme
			},
			// 熊猫动画次数
			animalsAdd() {
				this.animals++
			},
			// 搜索
			searchUserName() {
				if (!!this.searchName.replace(/\s/g, "")) {
					this.searchPanelDialog = true
				} else {
					this.layer.msg('请输入搜索关键词')
				}
			},
			// 导出消息
			downMSG(type) {
				if (type) {
					// 找到当前导出的好友消息索引
					let friMsg = this.messageList.filter((val, index, arr) => {
						return val.chatName === type
					})
					if (friMsg.length > 0) {
						let txt = ''
						friMsg[0].chatArr.forEach((val) => {
							txt += `${val.name}${val.time}:${val.mess}\r\n`
						});
						this.download(`${type}.txt`, txt)
					} else {
						this.layer.msg('当前好友并无聊天消息哦，赶快开始聊天吧')
					}
				} else {
					if (this.messageList && this.messageList.length > 0) {
						let txt = ''
						this.messageList.forEach((val, index) => {
							if (val.chatArr.length > 0) {
								txt += `第${index + 1}章 ${val.chatName}的聊天记录\r\n`
								val.chatArr.forEach((val2) => {
									txt += `${val2.name}${val.time}:${val2.mess}\r\n`
								})
							}
						})
						this.download(`全部消息.txt`, txt)
					} else {
						this.layer.msg('当前并无聊天消息哦，赶快开始聊天吧')
					}
				}
			},
			// 消息时间截止
			getDataCapare(list, item, index) {
				let str = null
				let time1 = new Date(item.time)
				let timeMonth = time1.getMonth() + 1
				let timeDay = time1.getDay()
				let timeHours = time1.getHours()
				let timeMinutes = time1.getMinutes()
				let hours = timeHours<10?'0':''
				let minutes = timeMinutes<10?'0':''
				let time2 = new Date(list.chatArr[index - 1].time)
				if (time1 - time2 > 5 * 60 * 1000) {
					let m = timeHours <= 12 ? '上午' : timeHours <= 20 ? '下午' : '晚上'
					str = `${m} ${hours}${timeHours}:${minutes}${timeMinutes}`
				}
				if (time1 - time2 > 24 * 60 * 60 * 1000) {
					str = `昨天 ${hours}${timeHours}:${minutes}${timeMinutes}`
				}
				if (time1 - time2 > 2 * 24 * 60 * 60 * 1000) {
					let m = timeHours <= 12 ? '上午' : timeHours <= 20 ? '下午' : '晚上'
					str = `${timeMonth}月${timeDay}日 ${m}${hours}${timeHours}:${minutes}${timeMinutes}`
				}
				return str
			}
		},
		created() {
			let r_name = sessionStorage.getItem('chatLoginName')
			this.chatLoginAvatar = sessionStorage.getItem('chatLoginAvatar') || ''
			let websockLink = sessionStorage.getItem('websocketLink')
			if (r_name && websockLink === '1') {
				// 保存登录名
				sessionStorage.setItem('chatLoginName', r_name)
				this.chatLoginName = r_name
				// 当前账户的消息索引
				this.localIndex = this.localMessage.findIndex((val, index, arr) => {
					return val.name === this.chatLoginName
				})
				// 拿取该账户的本地消息
				this.messageList = this.localIndex > -1 ? this.localMessage[this.localIndex].list : []
				// 开启长连接
				this.initWebSocket()
			} else {
				sessionStorage.removeItem('chatLoginName')
				this.$router.push({name: 'chatLogin'})
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
<style lang="less">
	.vl-notify {
		z-index: 9999;
	}

	.chat-com-theme(@main,@active,@hover,@tcolor,@tcshaw) {
		.chat-header, .fram-side, .fram-side-head, .fram-rgiht .fram-head, .fram-rgiht-open span {
			background: @main;
			color: #fff !important;
		}
		.f-l-isready {
			color: @tcolor !important;
		}
		.activePanel {
			&.active {
				background: @active;
			}
		}
		.f-l-item {
			&.active {
				background: @active;
			}

			&:hover {
				background: @hover;
			}
		}
		.message-you {
			span {
				color: #fff;
				background: @main;
				border-radius: 4px;
				box-shadow: 0 0 15px @tcshaw;
			}
		}
		.chat-btn-link {
			.el-button {
				color: #fff;
				background: @active;
				border-color: @active;

				&:hover {
					background: @hover;
					border-color: @hover;
				}
			}
		}
		.chat-checkbox {
			.el-checkbox__label {
				color: #333;
			}

			.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
				background-color: @main;
				border-color: @main;
			}

			.el-checkbox__inner:hover {
				border-color: #DCDFE6;
			}
		}
	}

	.chat-bg-color-0 {
		.chat-com-theme(@chatTheme0, @chatTheme0Active, @chatTheme0Hover, #fff, #bbb)
	}

	.chat-bg-color-1 {
		.chat-com-theme(@chatTheme1, @chatTheme1Active, @chatTheme1Hover, #dcdcdc, #ccc)
	}

	.chat-bg-color-2 {
		.chat-com-theme(@chatTheme2, @chatTheme2Active, @chatTheme2Hover, #dcdcdc, #ccc)
	}

	.chat-bg-color-3 {
		.chat-com-theme(@chatTheme3, @chatTheme3Active, @chatTheme3Hover, #dcdcdc, #ccc)
	}

	.chat-bg-color-4 {
		.chat-com-theme(@chatTheme4, @chatTheme4Active, @chatTheme4Hover, #dcdcdc, #ccc)
	}

	.chat-bg-color-5 {
		.chat-com-theme(@chatTheme5, @chatTheme5Active, @chatTheme5Hover, #dcdcdc, #ccc)
	}

	.chat-bg-color-6 {
		.chat-com-theme(@chatTheme6, @chatTheme6Active, @chatTheme6Hover, #fff, #ccc)
	}

	.chat-btn-agree, .chat-btn-reject {
		padding: 0 5px;
		font-size: 12px;
		line-height: 20px;
	}

	.chat-btn-addf {
		margin-left: 5px;
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 12px;
		line-height: 1.3;
	}

	.chat-ms-num {
		width: 20px;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		text-align: center;
	}

	.chat-theme {
		span {
			display: inline-block;
			cursor: pointer;
			width: 15px;
			height: 15px;
		}

		span:nth-child(1) {
			background: @chatTheme0;
		}

		span:nth-child(2) {
			background: @chatTheme1;
		}

		span:nth-child(3) {
			background: @chatTheme2;
		}

		span:nth-child(4) {
			background: @chatTheme3;
		}

		span:nth-child(5) {
			background: @chatTheme4;
		}

		span:nth-child(6) {
			background: @chatTheme5;
		}

		span:nth-child(7) {
			background: @chatTheme6;
		}
	}
</style>
