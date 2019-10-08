<template>
	<div class="chat">
		<div class="chat-wrap">
			<div class="chat-frame">
				<el-row class="frame-login" v-if="activeName === 'login'">
					<el-input
						placeholder="请输入内容"
						v-model="loginName">
					</el-input>
					<el-button @click="LoginChat" style="margin-top:10px;">登录</el-button>
					<span @click="activeName = 'register'">注册</span>
				</el-row>
				<el-row class="frame-register" v-if="activeName === 'register'">
					<el-input
						placeholder="请输入内容"
						v-model="registName">
					</el-input>
					<el-button @click="registerChat" style="margin-top:10px;">注册</el-button>
					<span @click="activeName = 'login'">登录</span>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { chatLogin, chatRegist} from '../../../api/user'
	import { codeText } from '../../../api/api'
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
				chatLogin({
					name:this.loginName
				}).then((res) => {
					if(res.code !== 0) {
						this.layer.msg(codeText(res.code))
					} else {
						this.$router.push({name:'chat',params:{name:this.loginName}})
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
						this.activeName = 'login'
						this.layer.msg('注册成功，请登录')
						this.loginName = this.registName
					}
				})
			}
		}
    }
</script>

<style scoped>

</style>
