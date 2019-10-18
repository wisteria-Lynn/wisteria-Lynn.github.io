<template>
	<div class="novelIndex">
		<template v-if="$route.path.split('/').length <= 2">
			<v-head-back-2 url="/"></v-head-back-2>
			<div class="all-wrap">
				<v-remark :remark="remark"></v-remark>
				<v-panel-one>
					<i class="iconfont iconqq"></i>
					<span>小说QQ群：658343145</span>
				</v-panel-one>
				<v-panel-one>
					<el-row>
						<el-col class="novel-list tc" :span="8" v-for="(item,index) in novelList" :key="index">
							<div class="novel-wrap cursor-p" @click="toReadIt(index)">
								<div class="forwad-img">封面</div>
								<span>{{item.title}}</span>
							</div>
						</el-col>
						<el-col class="novel-list tc" :span="8" v-if="GLOBAL.dataApi">
							<div class="novel-wrap cursor-p" @click="addFile">
								<div class="forwad-img">添加</div>
								<span>添加</span>
							</div>
						</el-col>
					</el-row>
				</v-panel-one>
				<v-panel-one>
					<h4>谨谢读者<span style="font-size:12px;">(排名不分先后)</span></h4>
					<span class="reader-wrap" v-for="item in readerList">{{item}}</span>
				</v-panel-one>
			</div>
		</template>
		<router-view :key="$route.fullPath" :novel="novelList"></router-view>
	</div>
</template>

<script>
	export default {
		name: "novelIndex",
		components: {
			'v-remark': (resolve) => {
				require(['../../components/panel/remark'], resolve)
			},
		},
		data() {
			return {
				remark: {
					title: '作者有话说',
					list: [{
						name: this.$store.state.USER.username,
						avatar: this.GLOBAL.avatar,
						remark: '感谢大家的一路支持！'
					}]
				},
				novelList: [],
				readerList:['晶诺','❤','依然','陌生又熟悉','余温','虫子姐姐','果然','淡淡相依','成美','海上明月','紫玉生烟',
				'苏打水','依栀茉萱','再见如陌','玉树伽罗','遗忘+沉默','女汉屌丝不爱哭','胡曼','夏末的晨曦','赵居居','芦苇']
			}
		},
		methods: {
			getNovelList() {
				this.novelList = require('../../novel/novel-list').novelList
			},
			toReadIt(index) {
				this.$router.push({
					path: '/novel/novelDetail',
					query: {
						index: index
					}
				})
			},
			addFile(){
				this.$router.push({
					path: '/addfile'
				})
			}
		},
		created() {
			this.getNovelList()
		}
	}
</script>

<style scoped lang="less">
	.novel-list {
		.novel-wrap {
			max-width: 90px;
			margin: 0 auto 30px auto;

			span {
				display: block;
				margin-top: 10px;
				overflow: hidden; /*超出部分隐藏*/
				text-overflow: ellipsis; /* 超出部分显示省略号 */
				white-space: nowrap; /*规定段落中的文本不进行换行 */
			}

			.forwad-img {
				height: 110px;
				line-height: 120px;
				color: #fff;
				background: #8797bd;
			}
		}
	}

	.reader-wrap {
		display: inline-block;
		margin: 10px 10px 0 0;
		/*border:1px solid #ccc;*/
		border-radius: 4px;
		padding: 2px 5px;
		background: #99cbff;
		color: #fff;
		font-size: 14px;
	}
</style>
