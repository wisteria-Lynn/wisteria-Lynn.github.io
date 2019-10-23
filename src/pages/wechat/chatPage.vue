<template>
    <div class="x-chatPage">
		<v-head-back-2 url="/wechat/friendList" position="fixed">
			<span>{{chatDetail.username}}</span>
		</v-head-back-2>
		<div class="fram-content">
			<div class="m-p-scroll scroll-style" ref="bottomScroll" id="bottomScroll">
				<div class="message-panel">
					<div class="m-p-wrap" v-for="item in chatArr">
						<div v-if="item.name === chatLoginName" class="tr">
							<div class="m-p-name-1">{{item.name}}</div>
							<span class="m-p-text-1 right">{{item.mess}}</span>
						</div>
						<div v-else class="tl">
							<div class="m-p-name-2">{{item.name}}</div>
							<span class="m-p-text-2">{{item.mess}}</span>
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
					type="text"
					placeholder="请输入内容"
					v-model="message">
				</el-input>
				<el-button @click="send">发送</el-button>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "chatPage",
		data(){
        	return {
				chatLoginName:sessionStorage.getItem('chatLoginName'),
				chatDetail:{ // 聊天对象信息
					username: '',// 对象名字
					type:'', // 和该对象的关系，0已发送加好友信息，1等待好友验证，2已是好友关系
					readay:''// 是否在线
				}, // 对方详情
				message: '', // 发送的消息
			}
		},
		computed:{
        	chatArr(){
        		return this.$store.state.MESSAGE.chatArr
			}
		},
		created(){
			// 聊天对象信息
			this.chatDetail = JSON.parse(this.$route.query.info)
			this.$store.dispatch('chatArr',this.chatDetail.username)
		},
		methods:{
			send() {
				if (!window.WebSocket) {
					this.layer.msg('服务器关闭，请退出重新登录')
					return
				}
				if (this.chatDetail.username === '') {
					this.layer.msg('请选择聊天对象')
					return
				}
				if ( this.message === '') {
					this.layer.msg('消息不能为空')
					return
				}
				let result = this.$store.state.MESSAGE.userList.filter((val, index, arr) => {
					return val.username === this.chatDetail.username
				})
				let readay = result.length === 0 ? false : result[0].readay
				if (!readay) {
					this.layer.msg('该好友不在线，不能聊天哦')
					return
				}
				let message = {
					type: 'message', // 消息类型
					sendName: this.chatLoginName,// 发送方昵称
					reciveName: this.chatDetail.username,// 接收方昵称
					message: this.message // 消息
				}
				this.WS.ws.send(JSON.stringify(message))
				this.message = ''
			}
		}
    }
</script>

<style scoped lang="less">
	.el-input{
		width:80%;
	}
	.el-button{
		width:18%;
		padding:12px 0;
	}
	.fram-content {
		margin-top:60px;
		height:calc(100% - 100px);
		position: absolute;
		/*top: 60px;*/
		/*bottom: 180px;*/
		/*height: calc(100% - 60px - 160px);*/
		width: 100%;
		z-index: 33;

		.m-p-scroll {
			overflow: auto;
			height: calc(100% - 16px);
			margin: 8px 0;
		}

		.m-p-wrap {
			margin: 0 2px;
			padding: 5px;
			.m-p-text-1,.m-p-text-2{
				position:relative;
				display: inline-block;
				border: 1px solid #67C23A;
				padding: 5px;
				margin-top:5px;
				border-radius: 5px;
				background:#67C23A;
			}
			.m-p-text-1,.m-p-text-2{
				&:after,&:before{
					content: '';
					position: absolute;
					border-left:6px solid transparent;
					border-right:6px solid transparent;
					border-top:6px solid transparent;
				}
				&:after {
					top:-11px;
					border-bottom:6px solid #67C23A;
				}
				//&:before {
				//	top:-15px;
				//	border-bottom:8px solid #67C23A;
				//	z-index:99;
				//}
			}
			.m-p-text-1 {
				&:after{
					right:5.1px;
				}
				//&:before{
				//	right:5px;
				//}
			}
			.m-p-text-2 {
				&:after{
					left:5.1px;
				}
				//&:before{
				//	left:5px;
				//}
			}
		}
	}
	.fram-input{
		position:fixed;
		bottom:0;
		width:100%;
		height:40px;
		background:#fff;
	}
</style>
