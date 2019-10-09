<!--项目首页-->
<template>
	<div class="projectIndex">
		<headerOne></headerOne>
		<div class="slideTip" @click="getSliceMenu">
			<i class="iconfont icon1"></i>
		</div>
		<template v-if="isSlideMenu">
			<div class="headSlideMenu" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']" @click="hideSlideNav">
				<div class="headSlideMenuChild">
					<template v-for="item in sideData[0].itemArray">
						<router-link :to="{path:item.url}" :class="[{'is-active':item.url === $route.path}]">{{item.title}}</router-link>
					</template>
				</div>
			</div>
		</template>
		<el-row>
			<el-col class="aside":span="7">
				<v-side :sideData="sideData" type="url"></v-side>
			</el-col>
			<el-col class="container" :span="17">
				<div class="container-wrap">
					<el-row style="margin-bottom:20px;font-size:.875rem;font-weight: 700;">{{this.title}}</el-row>
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<style lang="less">
	.projectIndex{
		.aside,.container{
			margin-top:2rem;
		}
		.container{
			padding:0 10px 10px 10px;
			.container-wrap{
				/*margin-left:2rem;*/
				padding:1rem;
				background:@mainBG;
				box-shadow: 0 2px 4px 0 @topShawC;
			}
		}
		.slideTip{
			display: none;
			position: fixed;
			top: 50%;
			left: 2%;
			width: 40px;
			height: 40px;
			background: rgba(96, 122, 175,.5);
			color: #fff;
			border-radius: 25px;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
			z-index:900;
			i{
				font-size:22px;
			}
		}
	}

</style>
<style scoped lang="less">
	.projectIndex{
		.headSlideMenu {
			position: fixed;
			top:0;
			width: 100%;
			height: 100%;
			left:-100%;
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

			.headSlideMenuChild {
				width:60%;
				height:100%;
				margin-top:62px;
				padding-top: 10px;
				background: #fff;
				a{
					display: block;
					color:#333;
					padding-left:20px;
					line-height: 40px;
					&:hover{
						color:#246dff;
						background:#ccc;
					}
					&.is-active{
						color:#246dff;
						background:#ccc;
					}
				}
			}
		}
	}
	@media (max-width: 768px) {
		.aside {
			display: none;
		}
		.container{
			width:100%;
		}
		.slideTip {
			display: block !important;
		}
	}
	@keyframes menuNavShow {
		from {
			left: -100%;
		}
		to {
			left: 0;
		}
	}

	@keyframes menuNavHidden {
		from {
			left: 0;
		}
		to {
			left: -100%;
		}
	}
</style>
<script>
	export default {
		name:'projectIndex',
		data(){
			return {
				title:document.title,
				sideData: [{
					title: '我的页面',
					itemArray: [
						{
							timestamp: '2018-04-12 20:46',
							title: '城市级联',
							url: '/project/city'
						},
						{
							timestamp: '2018-04-12 20:46',
							title: '聊天室',
							url: '/project/chatLogin'
						},
						{
							timestamp: '2018-04-12 20:46',
							title: '天气预报',
							url: '/project/weather'
						},
						{
							timestamp: '2018-04-12 20:46',
							title: 'canvas绘图',
							url: '/project/canvasDemo'
						},
						{
							timestamp: '2018-04-12 20:46',
							title: 'css动画特效',
							url: '/project/cssAnimaDemo'
						},
						{
							timestamp: '2018-04-12 20:46',
							title: '图片懒/预加载',
							url: '/project/imgLazyLoad'
						},
						{
							timestamp: '2018-04-01 20:46',
							title: '监听网页操作',
							url: '/project/addLister'
						},
						{
							timestamp: '2019-10-01 20:46',
							title: '主页动画加载',
							url: '/project/indexAnima'
						}
					]
				}],
				isSlideMenu:false,
				isSlideMenuBlock: false,
			}
		},
		methods:{
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
		},
		watch:{
			'$route':function(){
				this.title = document.title
			}
		}
	}
</script>
