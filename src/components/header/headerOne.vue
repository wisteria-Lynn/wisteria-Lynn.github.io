<!--顶部导航-->
<template>
	<div class="headerOne">
		<template v-if="isSlideMenu">
			<div class="headSlideMenu from-top" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']" @click="hideSlideNav">
				<div class="headSlideMenuChild">
					<template v-for="item in navList">
						<a v-if="item.url.indexOf('http') > -1" :href="item.url">{{item.name}}</a>
						<router-link v-else :to="{path:item.url}">{{item.name}}</router-link>
					</template>
				</div>
			</div>
		</template>
		<div class="header">
			<el-row>
				<el-col :md="16" :xs="8"  class="h-left t-left">
					<div class="headMenuWrap">
						<template v-for="item in navList">
							<a v-if="item.url.indexOf('http') > -1" :href="item.url">{{item.name}}</a>
							<router-link v-else :to="{path:item.url}">{{item.name}}</router-link>
						</template>
					</div>
					<div class="headMenuIcon">
						<span @click="getSliceMenu" class="iconfont iconcategory"></span>
					</div>
				</el-col>
				<el-col :md="8" :xs="16" class="h-right t-right">
					<span @click="curriculumVitae">简历</span>
					<i v-if="GLOBAL.dataApi" @click="addfile" class="iconfont icon1" style="margin:0 20px;"></i>
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
						url: 'https://wisteria-lynn.github.io/public/index.html'
					},
					{
						name: '小说',
						url: '/novel'
					},
					{
						name: '面试题',
						url: '/interviewQuestion'
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
			},
			addfile() {
				this.$router.push({
					path: '/addfile'
				})
			},
			curriculumVitae(){
				this.$router.push({
					path: '/curriculumVitae'
				})
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
