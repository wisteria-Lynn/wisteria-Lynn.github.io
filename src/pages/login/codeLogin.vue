<template>
    <div class="yl-codeLogin yl-flex-center">
		<div class="tc">
			<p>渔火·流莹离</p>
			<el-button type="primary" @click="codeLogin">允许登录</el-button>
		</div>
	</div>
</template>

<script>
	import {UidLogin} from "../../api/user"

	export default {
        name: "codeLogin",
		methods:{
			codeLogin(){
				let uid = this.$route.query.uid
				if(uid){
					UidLogin({
						uid:uid
					}).then((res)=>{
						if(res.code === 0){
							this.layer.msg('允许登录')
							// this.$router.push('/')
						} else {
							this.layer.msg(res.message)
						}
					})
				} else {
					this.layer.msg('发生错误！')
				}
			}
		}
    }
</script>

<style lang="less">
	.yl-theme-blue .yl-codeLogin{
		width:100%;
		height:100%;
		div{
			width:100%;
			margin:auto;
		}
		p{
			color:@themeBlue;
			font-size:24px;
			margin-bottom:20px;
		}
	}
	@media (max-width: 768px) {
		.yl-codeLogin {
			.el-button{
				padding:12px 40%;
			}
		}
	}
</style>
