<template>
	<div class="x-demoIndex bg-color--hui">
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
	import { demoList } from "../../common/demoList"

	export default {
        name: "demoIndex",
		data(){
        	return {
        		demoList:[]
			}
		},
		created(){
        	this.demoList = demoList
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
