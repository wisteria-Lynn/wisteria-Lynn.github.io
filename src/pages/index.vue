<!--首页-->
<template>
	<div id="index" class="index">
		<headerOne></headerOne>
		<el-row>
			这里是主页
			滚动条：{{isScroll}}
		</el-row>
	</div>
</template>
<style lang="less">
	.index{

	}
</style>
<script>
	import { throttle, Scroll } from '@/util/handleDOM'
	export default {
		name:'index',
		data(){
			return {
				isScroll:'',
				throttled:''
			}
		},
		mounted(){
			// 监听滚动条 节流
			this.throttled = throttle(() => {
				this.isScroll = Scroll.scrollTop()
			}, 200)
			window.addEventListener('scroll', this.throttled, true)
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.throttled, true)
		}
	}
</script>
