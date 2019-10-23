<template>
	<div class="x-demoIndex">
		<template v-if="$route.path.split('/').length <= 2">
			<v-head-back :url="'/'"></v-head-back>
			<div class="all-wrap">
				<template v-for="item in demoList">
					<v-panel-one>
						<router-link :to="item.url" class="demo-card">
							<img src="../../assets/img/demo/demo.jpg">
							<i class="el-icon-arrow-right"></i>
							<div>
								<h4>{{item.title}}</h4>
								<span>{{item.des}}</span>
							</div>
						</router-link>
					</v-panel-one>
				</template>
			</div>
		</template>
		<router-view></router-view>
	</div>
</template>

<script>
    export default {
        name: "demoIndex",
		data(){
        	return {
        		demoList:[
					{
						des: '2018-04-12 20:46',
						title: '城市级联',
						url: '/project/city'
					},
					{
						des: '2018-04-12 20:46',
						title: '天气预报',
						url: '/project/weather'
					},
					{
						des: '2018-04-12 20:46',
						title: 'canvas绘图',
						url: '/project/canvasDemo'
					},
					{
						des: '2018-04-12 20:46',
						title: 'css动画特效',
						url: '/project/cssAnimaDemo'
					},
					{
						des: '2018-04-12 20:46',
						title: '图片懒/预加载',
						url: '/project/imgLazyLoad'
					},
					{
						des: '2018-04-01 20:46',
						title: '监听网页操作',
						url: '/project/addLister'
					},
					{
						des: '2019-10-01 20:46',
						title: '主页动画加载',
						url: '/project/indexAnima'
					},
					{
						des: '2019-10-01 20:46',
						title: '图片裁剪',
						url: '/project/cropper'
					}
				]
			}
		}
    }
</script>

<style scoped lang="less">
	.demo-card{
		img{
			float:left;
			width:50px;
			height:50px;
			margin-right: 10px;
		}
		i{
			float:right;
			font-size:18px;
		}
		div{
			span{
				font-size:14px;
				display: inline-block;
				margin-top: 5px;
			}
		}
	}
</style>
