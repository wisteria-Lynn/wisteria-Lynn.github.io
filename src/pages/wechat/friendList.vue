<template>
    <div class="x-friendList">
		<v-head-back-2 url="/">
			<span>{{chatLoginName}}</span>
			<span @click="chatOut">切换账号</span>
		</v-head-back-2>
		<div style="background:#Fff;padding:10px;">
			<p style="font-size:14px;margin-bottom:10px;">好友列表({{$store.state.MESSAGE.FriendList.length}})</p>
			<!--搜索框-->
			<div class="fram-side-search">
				<el-input
					placeholder="请输入内容"
					suffix-icon="el-icon-search"
					v-model="searchName">
				</el-input>
			</div>
		</div>
		<!--好友列表-->
		<div class="fram-side-list">
			<div class="f-s-scroll scroll-style">
				<div v-for="(item,index) in $store.state.MESSAGE.FriendList" @click="chatClick(item)" :key="index" class="f-l-item">
					<span class="f-l-name">
						<i class="iconfont iconicon29"></i>
						{{item.username}}
					</span>
					<div v-if="item.type === 2" style="float:right;">
						<span class="message-num chat-ms-num" v-if="item.msNum && item.msNum > 0">{{item.msNum}}</span>
					</div>
					<span class="f-l-isready">{{item.readay? '在线':'离线'}}</span>
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
</template>

<script>
	import { chatFriendList,chatAddFriend } from '../../api/user'
    export default {
        name: "friendList",
		data(){
        	return {
        		chatLoginName:'',
				searchName: '', // 搜索关键字
			}
		},
		computed:{
			messageList(){
				return this.$store.state.MESSAGE.userMessageList
			},
			localMessage(){
				return this.$store.state.MESSAGE.localMessage
			},
			localMessageIndex(){
				return this.$store.state.MESSAGE.localMessageIndex
			}
		},
		methods:{
			chatOut(){
				this.WS.ws.send(JSON.stringify({
					type: 'close',
					username: this.chatLoginName
				}))
				sessionStorage.removeItem('chatLoginName')
				this.$router.push('/wechat/chatLogin')
			},
			// 左侧item点击事件
			chatClick(info) {
				if (info.type !== 2) {
					// this.layer.msg('你们还不是好友，不能聊天哦')
					return
				}
				this.$router.push({
					name:'chatPage',
					query:{
						info:JSON.stringify(info)
					}
				})
				// 所点击聊天对象的消息索引
				let MsIndex = this.messageList.findIndex((val, index, arr) => {
					return val.chatName === info.username
				})
				if (MsIndex > -1) {
					// 是否有未读消息
					if (this.messageList[MsIndex].msNum > 0) {
						this.messageList[MsIndex].msNum = 0
						// this.$set(this.messageList[MsIndex],'msNum',0)
						// 已读过后，更新本地消息
						this.localMessage[this.localMessageIndex].list = this.messageList
						this.$store.dispatch('localMessage', this.localMessage)
					}
				}
			},
			// 获取好友列表
			getFrendList(){
				chatFriendList({
					name:this.chatLoginName
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						this.$store.dispatch('FriendList', res.data)
					}
				})
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
		},
		created(){
			this.chatLoginName = this.$route.params.name || sessionStorage.getItem('chatLoginName')
			if (this.chatLoginName && !!window.WebSocket){
				// 获取好友列表
				this.getFrendList()
			} else {
				sessionStorage.removeItem('chatLoginName')
				this.$router.push({name:'chatLogin'})
			}
		}
    }
</script>

<style scoped lang="less">
	.fram-side-list{
		margin-top:10px;
		background:#fff;
	}
	.f-l-item{
		padding:10px;
		border-bottom: 1px solid #eee;
	}
	.f-l-isready{
		font-size:12px;
	}
	.chat-ms-num{
		width: 20px;
		height: 20px;
		text-align: center;
		font-size: 14px;
	}
</style>
