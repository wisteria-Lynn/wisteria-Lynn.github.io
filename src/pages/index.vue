<!--首页-->
<template>
	<div id="index" class="index bg-color--hui min-h100">
		<v-swiper class="index-swiper"></v-swiper>
		<div class="all-wrap">
			<el-row>
				<el-col :span="8" class="w100">
					<div class="avatar tc avatar-right bg-color">
						<p style="margin-top:0;" class="tr p10">
							<span class="cp" @click="switchTheme">切换主题</span></p>
						<img :src="GLOBAL.avatar" alt="">
						<p>
							<template v-if="$store.state.USER.isLogin">
								<span>{{$store.state.USER.username}}</span>&nbsp;|
								<span @click="loginOut" class="cursor-p">退出</span>
							</template>
							<template v-else>
								<span><router-link to="/login">请登录</router-link></span>
							</template>
						</p>
					</div>
					<div class="yl-flex-center mt10 left" style="flex-wrap: wrap;background:#fff;">
						<div v-for="(item,index) in cardList" :key="index">
							<div @click="clickToPage(item.url)"  class="my-card tc cp f14">
								<i class="iconfont" :class="[item.icon]"></i>
								<span>{{item.title}}</span>
							</div>
						</div>
					</div>
					<div class="mt10 tc p10" style="background:#fff;">
						<el-input type="text" style="float:left;display:inline-block;width:calc(100% - 80px);" placeholder="搜索demo"></el-input>
						<el-button type="primary" style="float:right;">搜索</el-button>
						<p class="fix"></p>
					</div>
				</el-col>
				<el-col :span="16" class="w100 f14">
					<v-panel-one v-for="(item,index) in demoList" :key="index">
						<router-link :to="item.url">
							<el-row class="my-demo">
								<el-col :span="12">
									<i class="iconfont icondangedemoban f14"></i>
									<span>{{item.title}}</span></el-col>
								<el-col :span="12" class="tr">
									<span>{{item.des}}</span>
									<i class="el-icon-arrow-right f14"></i>
								</el-col>
							</el-row>
						</router-link>
					</v-panel-one>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { demoList } from "../common/demoList"

	export default {
		name:'index',
		components:{
			'v-swiper':(resolve)=>{require(['../components/swiper/swiper'],resolve)},//滑动组件
		},
		data(){
			return {
				cardList:[
					{
						title:'我的聊天',
						icon:'iconresume-line',
						url: '/wechat/chat'
					},
					{
						title:'我的小说',
						icon:'iconiconset0116',
						url: '/novel'
					}, {
						title:'我的博客',
						icon:'iconbokexinwen',
						url: 'https://wisteria-lynn.github.io/public/index.html'
					},{
						title:'我的图表',
						icon:'iconyanshibofang',
						url: '/'
					},{
						title:'我的简历',
						icon:'iconresume-line',
						url: '/curriculumVitae'
					},{
						title:'我的演示',
						icon:'iconresume-line',
						url: '/demo'
					},{
						title:'我的写作',
						icon:'iconresume-line',
						url: '/'
					},{
						title:'我的写作',
						icon:'iconresume-line',
						url: '/'
					}
				],
				demoList:[]
			}
		},
		methods:{
			loginOut() {
				this.$store.dispatch('loginOut')
				this.$router.push({'path': '/'})
			},
			clickToPage(url){
				if(url.indexOf('http') > -1){
					window.location.href = url
				} else {
					if(url === '/wechat/chat'){
						let routeUrl = this.$router.resolve({path:url})
						window.open(routeUrl.href, '_blank');
					} else {
						this.$router.push({path:url})
					}
				}
			},
			switchTheme(){
				let theme = localStorage.getItem('theme')
				if(theme === 'yl-theme-blue'){
					this.$store.dispatch('themeAction','yl-theme-orange')
				} else {
					this.$store.dispatch('themeAction','yl-theme-blue')
				}
			}
		},
		mounted(){
			this.demoList = demoList.slice(0,7)
			// 监听滚动条 节流
			// this.throttled = throttle(() => {
			// 	this.isScroll = Scroll.scrollTop()
			// }, 200)
			// window.addEventListener('scroll', this.throttled, true)
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			// window.removeEventListener('scroll', this.throttled, true)
		}
	}
</script>
<style lang="less" scoped>
	.index{
		.left{
			.my-card{
				margin:16px;
				&:after {
					content: "";
					flex: auto;
				}
				i{
					font-size:42px;
				}
				span{
					font-size:14px;
					display: block;
					margin-top:5px;
				}
			}
		}
		.avatar{
			color:#fff;
			img{
				width:40%;
				margin-top:30px;
				border-radius: 50%;
			}
			p{
				margin-top:20px;
				a{
					color:#fff;
				}
			}
		}
		.avatar-top{
			display: none;
			height:200px;
			img{
				width:100px;
			}
		}
		.avatar-right{
			margin-top:20px;
			height:300px;
		}
		@media (max-width: 768px) {
			.left{
				width:100% !important;
				.my-card{
					i{
						font-size:32px !important;
					}
				}
			}
			.avatar-right{
				margin-top:0;
				height:200px;
				img{
					width:20%;
				}
			}
			.avatar-top{
				display:block !important;
			}
			.index-swiper{
				display:none;
			}
		}
	}
</style>
