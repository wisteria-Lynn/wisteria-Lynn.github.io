<template>
    <div class="sideFromMenu">
		<div class="slideTip" :class="showBtn2 ? 'slide-show' : 'slide-hidden'" @click="getSliceMenu">
			<i class="iconfont icon1"></i>
		</div>
		<template v-if="isSlideMenu">
			<div class="headSlideMenu from-left" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']" @click="hideSlideNav">
				<div class="headSlideMenuChild">
					<slot></slot>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
    export default {
        name: "sideFromMenu",
		props:['showBtn'],
		created(){
        	console.log(this.showBtn)
		},
		data() {
			return {
				showBtn2:this.showBtn,
				isSlideMenu: false,
				isSlideMenuBlock: false,
			}
		},
		methods:{
			getSliceMenu() {
				this.isSlideMenu = true
				this.isSlideMenuBlock = !this.isSlideMenuBlock
			},
			hideSlideNav(e) {
				let sp2 = document.getElementsByClassName('headSlideMenuChild')[0]
				if (sp2) {
					// 点击其他地方 导航隐藏
					if (!sp2.contains(e.target)) {
						this.isSlideMenuBlock = false
					}
				}
			}
		}
    }
</script>

<style scoped>
	.slide-show{
		display: block !important;
	}
	@media (max-width: 768px) {
		.slide-hidden{
			display: block !important;
		}
	}
</style>
