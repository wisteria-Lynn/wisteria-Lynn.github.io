<!--项目侧边栏-->
<template>
	<div class="indexSide">
		<el-row v-for="(item,index) in sideData" :key="index">
			<div class="item-panel">
				<el-row class="item-title">
					<el-col :span="12">{{item.title}}</el-col>
					<el-col :span="12" class="t-right">
						<i class="el-icon-plus cursor-point" @click="createNewPage"></i>
					</el-col>
				</el-row>
				<el-row class="left-head">
					<el-col :span="6">
						<span class="active">最近</span>
					</el-col>
				</el-row>
				<el-timeline>
					<el-timeline-item
						v-for="(item2, index) in item.itemArray"
						:key="index"
						:timestamp="item2.timestamp|dateFilter"
						placement="top">
						<el-card class="item-text">
							<template v-if="type==='url'">
								<router-link :to="{path:item2.url}">{{item2.title}}</router-link>
							</template>
							<template v-if="type==='click'">
								<span @click="clickItem(item2)">{{item2.title}}</span>
							</template>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "indexSide",
		props:['sideData','type'],
		// data() {
		// 	return {
		//
		// 	}
		// },
		methods:{
			createNewPage(){
				this.$emit('addBolg')
			},
			clickItem(item2){
				this.$emit('clickItem',item2)
			}
		}
	}
</script>
<style lang="less">
	.indexSide{
		.el-timeline-item__node {
			background-color: #67C23A;
		}
	}
</style>
<style scoped lang="less">
	.indexSide {
		position: relative;
		padding:0 10px 10px 10px;

		.item-title {
			padding: .3rem 0;
			font-weight: 700;
			font-size: .875rem;
		}

		.item-panel {
			width: calc(100% - 2rem);
			padding: 1rem;
			font-size: 1rem;
			background: @sideBG;
			color: @topTxtC;
			box-shadow: 0 2px 4px 0 @topShawC;

			.item-text{
				a,span {
					display: block;
					padding: .2rem 0;
					color: @topTxtC;
					cursor: pointer;
					&:hover {
						text-decoration: underline;
					}
				}
			}

			.left-head{
				margin-bottom:40px;
				span{
					display: inline-block;
					padding:10px 0;
					font-size:14px;
					color:#999;
					cursor: pointer;
					&.active{
						color:#333;
						font-weight: 700;
						border-bottom:2px solid #F56C6C;
					}
				}
			}
		}
	}
</style>
