<template>
	<div class="chatLogin chat bg-color--hui" style="min-height:100%;">
		<div class="chat-header tc" style="height:15%;line-height:4.5;color:#fff;font-size:32px;">
			渔火聊天室
		</div>
		<div class="chat-wrap all-wrap">
			<!--聊天居中窗口-->
			<div class="chat-frame bg-color--white">
				<div class="fram-animals">
					<img v-show="animals%3 === 0" class="animal-1" src="../../assets/img/wechat/animals1.png" alt="">
					<img v-show="animals%3 === 1" class="animal-2" src="../../assets/img/wechat/animals2.png" alt="">
					<img v-show="animals%3 === 2" class="animal-3" src="../../assets/img/wechat/animals3.png" alt="">
				</div>
				<el-row class="frame-login" v-if="activeName === 'login'">
					<el-input
						placeholder="请输入登录名"
						@focus="animalsAdd"
						v-model="loginName">
					</el-input>
					<el-button @click="LoginChat">登录</el-button>
					<el-button @click="activeName = 'register'">注册</el-button>
				</el-row>
				<el-row class="frame-register tc" v-if="activeName === 'register'">
					<el-input
						placeholder="请输入注册姓名"
						@focus="animalsAdd"
						v-model="registName">
					</el-input>
					<el-button @click="registerChat">注册</el-button>
					<span style="font-size:14px;text-decoration: underline" @click="activeName = 'login'">有账号？去登录</span>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { chatLogin, chatRegist} from '../../api/user'
	import { codeText } from '../../api/api'
	export default {
        name: "chatLogin",
		data() {
			return {
				activeName: 'login',
				loginName:'',
				registName:'',
				animals:1,
			}
		},
		methods:{
			LoginChat() {
				if(!this.loginName){
					this.layer.msg('请输入登陆名')
					return
				}
				chatLogin({
					name:this.loginName
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						sessionStorage.setItem('chatLoginName',this.loginName)
						sessionStorage.setItem('chatLoginAvatar',res.data.avatar)
						sessionStorage.setItem('websocketLink','1')
						this.$router.push({path:'/wechat/chat'})
					}
				}).catch(e=>{
					this.layer.msg(e)
				})
			},
			registerChat() {
				chatRegist({
					name:this.registName
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						this.layer.msg('注册成功，请登录')
						this.activeName = 'login'
						this.loginName = this.registName
					}
				}).catch(e=>{
					this.layer.msg(e)
				})
			},
			animalsAdd(){
				this.animals++
			}
		},
		created(){
        	if(this.isMobileBrowser()){
				this.layer.msg(`请用电脑登录聊天界面`)
				this.$router.push('/')
			}
		}
    }
</script>

<style scoped lang="less">
	.chatLogin{
		.el-button{
			display: block;
			width:100%;
			margin:10px 0;
		}
		.el-button + .el-button{
			margin-left:0;
		}
		.chat-header{
			background:@chatTheme0;
			color:#fff !important;
		}
	}
	.frame-login,.frame-register {
		position: absolute;
		width:40%;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		span{
			&:hover{
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
</style>
