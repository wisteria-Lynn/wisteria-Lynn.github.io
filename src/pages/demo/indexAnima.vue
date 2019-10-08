<template>
	<div class="indexAnima">
		<div v-for="(item,index) in 14" :key="index" class="dataWrap">
			<img :src="getImg(item)">
		</div>
		<div style="height:300px;"></div>
	</div>
</template>

<script>
	import { throttle, Scroll,dom } from '@/util/handleDOM'
	export default {
		name: "indexAnima",
		data(){
			return{
				imgs:[],
				dataWrap:[]
			}
		},
		methods: {
			getImg(i) {
				return require('../../assets/img/imgLazyLoad/lazy-' + i + '.jpg')
			},
			previewImg(){
				for(let i = 0 ; i < this.imgs.length ; i++){
					console.log(this.imgs[i].offsetTop,Scroll.scrollTop(),this.viewHeight)
					console.log(i+ ' ' + this.imgs[i].offsetTop - Scroll.scrollTop()< this.viewHeight - 20)
					if(this.imgs[i].offsetTop - Scroll.scrollTop()< this.viewHeight + 30){
						if(!dom.hasClass(this.imgs[i],'anmial')){
							dom.addClass(this.imgs[i],'anmial')
						}
					}
				}
			}
		},
		mounted(){
			this.dataWrap = document.querySelectorAll('.dataWrap')
			this.imgs = document.querySelectorAll('img')
			this.viewHeight = document.documentElement.clientHeight
			// 监听滚动条 节流
			this.throttled = throttle(() => {
				this.previewImg()
			}, 200)

			this.previewImg()
			window.addEventListener('scroll', this.throttled, true)
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.throttled, true)
		}
	}
</script>

<style scoped lang="less">
	.indexAnima {
		/*height: 800px;*/
		overflow: auto;
		.anmial{
			animation: move 1.5s forwards;
		}
		/*.dataWrap{*/
			/*margin-top:100px;*/
		/*}*/
		img {
			display: block;
			max-width: 100%;
			max-height:400px;
			padding-top:300px;
			opacity: 0;
			margin:10px auto;
		}
	}
	@-webkit-keyframes move {
		from{
			padding-top:300px;
			opacity: 0;
		}
		to{
			padding-top:0;
			opacity:1
		}
	}
</style>
