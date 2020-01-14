<template>
    <div class="x-swiper">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide first-slide bg-color">流</div>
				<div class="swiper-slide second-slide bg-color">莹</div>
				<div class="swiper-slide three-slide bg-color">离</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.css'
    export default {
        name: "swiper",
		data(){
        	return {
        		option:{//swiper
					autoplay: {
						delay: 3000, //3秒切换一次
						disableOnInteraction: false //用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
					},
					speed: 1000, // 滑动速度
					slidesPerView: 5, // 显示个数
					spaceBetween: 0, // 间隔
					loop: true, // 循环滑动
					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents: true,//修改swiper的父元素时，自动初始化swiper
					navigation: { // 前进后退按钮
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					on: {
						click: (e) => {
							// let pathName = e.target.parentElement.id
						}
					}
				},
			}
		},
		mounted(){
			new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
			})
		}
    }
</script>

<style scoped lang="less">
	.swiper-slide{
		line-height: 300px;
		text-align: center;
		font-size: 50px;
		&.first-slide{
			/*background:#4390EE;*/
			color:#fff;
		}
		&.second-slide{
			/*background:#CA4040;*/
			color:#fff;
		}
		&.three-slide{
			/*background:#FF8604;*/
			color:#fff;
		}
	}
</style>
