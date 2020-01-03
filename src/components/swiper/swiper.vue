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
