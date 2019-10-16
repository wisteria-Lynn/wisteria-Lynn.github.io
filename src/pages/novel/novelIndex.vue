<template>
	<div class="novelIndex">
		<template v-if="$route.path.split('/').length <= 2">
			<headerOne></headerOne>
			<div class="u-panel">
				<div class="u-panel-card novel-list" v-for="item in novelList">
					<h4>{{item.title}}</h4>
					<span class="desrc" v-html="item.des"></span>
					<div class="t-right">
						<span class="tip">加载慢，耐心等待</span>
						<el-button class="btn btn-success" v-loading.fullscreen.lock="fullscreenLoading" @click="toReadIt(item.id,item.title)">阅读</el-button>
					</div>
				</div>
			</div>
		</template>
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
	export default {
		name: "novelIndex",
		data() {
			return {
				novelList: [],
				fullscreenLoading:false
			}
		},
		methods: {
			getNovelList() {
				this.novelList = require('../../novel/novel-list').novelList
			},
			toReadIt(id, title) {
				let _this = this
				this.fullscreenLoading = true
				require(['../../novel/novel-'+id],(res)=>{
					_this.GLOBAL.novel = res.novel
					this.fullscreenLoading = false
					this.$router.push({
						path: '/novel/novelDetail',
						query: {
							id: id,
							num: '0',
							title: title
						}
					})
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
		padding: 30px;

		span.desrc{
			display: inline-block;
			margin-top: 20px;
			font-size: 14px;
		}

		span.tip{
			font-size:10px;
			color:#ccc;
		}
		button {
			margin-top: 20px;
		}
	}
</style>
