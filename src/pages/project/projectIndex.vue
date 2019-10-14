<!--项目首页-->
<template>
	<div class="projectIndex">
		<headerOne></headerOne>
		<v-sideFromMenu showBtn="false">
			<span>小项目</span>
			<template v-for="item in sideData[0].itemArray">
				<router-link :to="{path:item.url}" :class="[{'is-active':item.url === $route.path}]">{{item.title}}</router-link>
			</template>
		</v-sideFromMenu>
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
	}

</style>
<style scoped lang="less">
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
</style>
<script>
	export default {
		name:'projectIndex',
		components:{
			'v-sideFromMenu':(resolve)=>{require(['../../components/aside/sideFromMenu'],resolve)}
		},
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
			}
		},
		watch:{
			'$route':function(){
				this.title = document.title
			}
		}
	}
</script>
