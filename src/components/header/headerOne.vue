<!--顶部导航-->
<template>
	<div class="headerOne">
		<template v-if="isSlideMenu">
			<div class="headSlideMenu" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']" @click="hideSlideNav">
				<div class="headSlideMenuChild">
					<template v-for="item in navList">
						<router-link :to="{path:item.url}">{{item.name}}</router-link>
					</template>
				</div>
			</div>
		</template>
		<div class="header">
			<el-row>
				<el-col :span="16" class="h-left t-left">
					<div class="headMenuWrap">
						<template v-for="item in navList">
							<router-link :to="{path:item.url}">{{item.name}}</router-link>
						</template>
					</div>
					<div class="headMenuIcon">
						<span @click="getSliceMenu" class="iconfont iconcategory"></span>
					</div>
				</el-col>
				<el-col :span="8" class="h-right t-right">
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
				navList: [
					{
						name: '首页',
						url: '/'
					},
					{
						name: '小项目',
						url: '/project'
					},
					{
						name: '博客',
						url: '/blog'
					},
					{
						name: '小说',
						url: '/novel'
					}
				],
				isSlideMenu:false,
				isSlideMenuBlock: false,
			}
		},
		methods: {
			loginOut() {
				this.$store.dispatch('loginOut')
				if (this.$route.fullPath !== '/') {
					this.$router.push({'path': '/login', query: {redirect: this.$route.fullPath}})
				} else {
					this.$router.push({'path': '/login'})
				}
			},
			getSliceMenu() {
				this.isSlideMenu = true
				this.isSlideMenuBlock = !this.isSlideMenuBlock
			},
			hideSlideNav(e){
				let sp2 = document.getElementsByClassName('headSlideMenuChild')[0]
				if (sp2) {
					// 点击其他地方 导航隐藏
					if (!sp2.contains(e.target)) {
						this.isSlideMenuBlock = false
					}
				}
			}
		}
	}
</script>
<style type="less" scoped>
	.headerOne {
		a {
			color: @topTxtC;

			&:hover {
				color: #246dff;
			}
		}

		.header {
			/*height: 60px;*/
			line-height: 60px;
			background: @topBG;
			color: @topTxtC;
			box-shadow: 0 2px 4px 0 @topShawC;

			.headMenuIcon {
				display: none;

				span {
					font-size: 22px;

					&:hover {
						color: #246dff;
					}
				}
			}

			.h-left {
				padding-left: 30px;

				a {
					margin: 0 5px;
				}
			}

			.h-right {
				padding-right: 30px;
			}

			span {
				cursor: pointer;
				/*&:hover{*/
				/*text-decoration: underline;*/
				/*}*/
			}
		}

		.headSlideMenu {
			position: fixed;
			top:-100%;
			width: 100%;
			height: 100%;
			left:0;
			background: rgba(0, 0, 0, 0.1);
			z-index: 1000;
			&.menu-show {
				-webkit-animation: menuNavShow .5s forwards;
				animation: menuNavShow .5s forwards;
			}

			&.menu-hidden {
				-webkit-animation: menuNavHidden .5s forwards;
				animation: menuNavHidden .5s forwards;
			}

			a {
				margin-right: 10px;
			}

			.headSlideMenuChild {
				margin-top:62px;
				padding-top: 10px;
				padding-left: 30px;
				min-height: 100px;
				background: #fff;
			}
		}
	}
	@keyframes menuNavShow {
		from {
			top: -100%;
		}
		to {
			top: 0;
		}
	}

	@keyframes menuNavHidden {
		from {
			top: 0;
		}
		to {
			top: -100%;
		}
	}
</style>
<style scoped lang="less">
	@media (max-width: 768px) {
		.headMenuWrap {
			display: none;
		}

		.headMenuIcon {
			display: block !important;
		}
	}
</style>
