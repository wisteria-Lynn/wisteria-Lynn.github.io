<template>
    <div class="sideFromMenu">
		<div class="slideTip" :class="[{'slide-show':showBtn}]" @click="getSliceMenu">
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
		data() {
			return {
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
	@media (max-width: 768px) {
		.slide-show{
			display: block !important;
		}
	}

</style>
