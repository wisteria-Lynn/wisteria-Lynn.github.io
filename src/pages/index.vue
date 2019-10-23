<!--首页-->
<template>
	<div id="index" class="index">
		<el-row class="avatar tc avatar-top">
			<img :src="GLOBAL.avatar">
			<p>
				<template v-if="$store.state.USER.isLogin">
					<span>{{$store.state.USER.username}}</span>|
					<span @click="loginOut" class="cursor-p">退出</span>
				</template>
				<template v-else>
					<span><router-link to="/login">请登录</router-link></span>
				</template>
			</p>
		</el-row>
		<v-swiper class="index-swiper"></v-swiper>
		<div class="all-wrap">
			<el-row>
				<el-col :span="16" class="left">
					<v-panel-one>
						<el-row>
							<el-col :span="6" v-for="(item,index) in cardList" :key="index">
								<div @click="clickToPage(item.url)"  class="my-card tc cursor-p">
									<i class="iconfont" :class="[item.icon]"></i>
									<span>{{item.title}}</span>
								</div>
							</el-col>
						</el-row>
					</v-panel-one>
					<v-panel-one>
						<router-link to="/demo">
							<el-row class="my-demo">
								<el-col :span="12">
									<i class="iconfont icondangedemoban"></i>
									<span>我的demo</span></el-col>
								<el-col :span="12" class="tr">
									<i class="el-icon-arrow-right"></i>
								</el-col>
							</el-row>
						</router-link>
					</v-panel-one>
				</el-col>
				<el-col :span="8" class="avatar tc avatar-right">
					<img :src="GLOBAL.avatar">
					<p>
						<template v-if="$store.state.USER.isLogin">
							<span>{{$store.state.USER.username}}</span>|
							<span @click="loginOut" class="cursor-p">退出</span>
						</template>
						<template v-else>
							<span><router-link to="/login">请登录</router-link></span>
						</template>
					</p>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	// import { throttle, Scroll } from '@/util/handleDOM'
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
						url: '/wechat/friendList'
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
					}
				],
				demo:{
					title:true
				},
				demoList:[
					{
						title:'我的简历',
						url: '/interviewQuestion'
					},{
						title:'我的简历',
						url: '/interviewQuestion'
					}
				]
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
					this.$router.push({path:url})
				}
			}
		},
		mounted(){
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
				margin-bottom:20px;
				i{
					font-size:42px;
				}
				span{
					display: block;
					margin-top:5px;
				}
			}
		}
		.avatar{
			background:#f49110;
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
		.my-demo{
			i{
				font-size:20px;
			}
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
				display: none;
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
