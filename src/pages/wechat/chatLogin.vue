<template>
	<div class="chatLogin">
		<v-head-back-2 url="/"></v-head-back-2>
		<el-row class="frame-login" v-if="activeName === 'login'">
			<el-input
				placeholder="请输入登录名"
				v-model="loginName">
			</el-input>
			<el-button @click="LoginChat">登录</el-button>
			<el-button @click="activeName = 'register'">注册</el-button>
		</el-row>
		<el-row class="frame-register tc" v-if="activeName === 'register'">
			<el-input
				placeholder="请输入注册姓名"
				v-model="registName">
			</el-input>
			<el-button @click="registerChat">注册</el-button>
			<span style="font-size:14px;text-decoration: underline" @click="activeName = 'login'">有账号？去登录</span>
		</el-row>
	</div>
</template>

<script>
	import { chatLogin, chatRegist} from '../../api/user'
	import { codeText } from '../../api/api'
	import Bus from '../../common/bus'
	export default {
        name: "chatLogin",
		data() {
			return {
				activeName: 'login',
				loginName:'',
				registName:''
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
						// 发送登录消息
						// let message = {
						// 	type: 'login',
						// 	username: this.loginName
						// }
						// this.WS.ws.send(JSON.stringify(message))
						sessionStorage.setItem('chatLoginName',this.loginName)
						sessionStorage.setItem('websocketLink','1')
						this.$router.push({path:'/wechat/chat'})
					}
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
				})
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
	}
	.frame-login,.frame-register {
		position: absolute;
		width:100%;
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
