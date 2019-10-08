<template>
    <div class="imgLazyLoad">
		<div v-for="(item,index) in 14" :key="index">
			<img src="../../../assets/img/imgLazyLoad/loading.gif" :data-src="getImg(item)">
		</div>
	</div>
</template>

<script>
	import { throttle, Scroll } from '@/util/handleDOM'
    export default {
        name: "imgLazyLoad",
		data(){
        	return{
				throttled:'',
				viewHeight:0,
			}
		},
		methods:{
        	getImg(i){
        		return require('../../../assets/img/imgLazyLoad/lazy-'+i+'.jpg')
			},
			previewImg(){
				let imgs = document.querySelectorAll('img[data-src]')
				for(let i = 0 ; i < imgs.length ; i++){
					if(imgs[i]){
						if(imgs[i].offsetTop - Scroll.scrollTop() < this.viewHeight){
							console.log('1')
							imgs[i].src = imgs[i].getAttribute('data-src')
							imgs[i].removeAttribute('data-src')
						}
					}
				}
			}
		},
		mounted(){
			// 监听滚动条 节流
			this.throttled = throttle(() => {
				this.previewImg()
			}, 200)
			this.viewHeight = document.documentElement.clientHeight
			// this.previewImg()
			window.addEventListener('scroll', this.throttled, true)
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.throttled, true)
		}
    }
</script>

<style scoped lang="less">
	.imgLazyLoad{
		img{
			display:block;
			width:100%;
			margin:10px auto;
			&[data-src]{
				width:20%;
			}
		}
	}
</style>
