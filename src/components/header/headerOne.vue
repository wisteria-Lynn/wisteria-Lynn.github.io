<!--顶部导航-->
<template>
	<div class="headerOne">
		<div class="header">
			<el-row type="flex" justify="center">
				<el-col :span="15" class="h-left t-left">
					<template v-for="item in navList">
						<router-link :to="{path:item.url}">{{item.name}}</router-link>
					</template>
				</el-col>
				<el-col :span="7" class="h-right t-right">
					<template v-if="$store.state.USER.isLogin">
						<span>{{$store.state.USER.username}}</span>
						<span @click="loginOut">退出</span>
					</template>
					<template v-else>
						<span><router-link to="/login">登录</router-link></span>
					</template>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<style>

</style>
<script>

	export default {
		name: "headerOne",
		data() {
			return {
				navList:[
					{
						name:'首页',
						url:'/'
					},
					{
						name:'小项目',
						url:'/project'
					},
					{
						name:'博客',
						url:'/blog'
					}
				]
			}
		},
		methods:{
			loginOut(){
				this.$store.dispatch('loginOut')
				if(this.$route.fullPath !== '/'){
					this.$router.push({'path':'/login',query: {redirect: this.$route.fullPath}})
				} else {
					this.$router.push({'path':'/login'})
				}
			}
		}
	}
</script>
<style type="less">
	.headerOne {
		.header {
			height: 60px;
			line-height: 60px;
			background: @topBG;
			color: @topTxtC;
			box-shadow: 0 2px 4px 0 @topShawC;
			.h-left{
				a{
					margin:0 5px;
				}
			}
			a {
				color: @topTxtC;
			}
			span{
				cursor: pointer;
				&:hover{
					text-decoration: underline;
				}
			}
		}
	}
</style>
