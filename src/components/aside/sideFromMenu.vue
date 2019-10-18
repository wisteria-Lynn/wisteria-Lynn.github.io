<template>
	<div class="sideFromMenu">
		<div class="slideTip" :class="showBtn2 ? 'slide-show' : 'slide-hidden'" @click="getSliceMenu">
			<i class="iconfont icon1"></i>
		</div>
		<template v-if="isSlideMenu">
			<div class="headSlideMenu from-left" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']"
				 @click="hideSlideNav">
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
		props: ['showBtn'],
		created() {
			console.log(this.showBtn)
		},
		data() {
			return {
				showBtn2: this.showBtn,
				isSlideMenu: false,
				isSlideMenuBlock: false,
			}
		},
		methods: {
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
	.slide-show {
		display: block !important;
	}

	@media (max-width: 768px) {
		.slide-hidden {
			display: block !important;
		}
	}
</style>
<style lang="less">
	/*左侧滑动*/
	.slideTip {
		display: none;
		position: fixed;
		top: 50%;
		left: 2%;
		width: 40px;
		height: 40px;
		background: rgba(96, 122, 175, .5);
		color: #fff;
		border-radius: 25px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		z-index: 900;

		i {
			font-size: 22px;
		}
	}

	.headSlideMenu {
		position: fixed;

		&.from-top {
			top: -100%;
			left: 0;

			&.menu-show {
				-webkit-animation: menuNavShow .5s forwards;
				animation: menuNavShow .5s forwards;
			}

			&.menu-hidden {
				-webkit-animation: menuNavHidden .5s forwards;
				animation: menuNavHidden .5s forwards;
			}

			.headSlideMenuChild {
				width: 100%;
				margin-top: 62px;
				min-height: 200px;
			}
		}

		&.from-left {
			top: 0;
			left: -100%;

			&.menu-show {
				-webkit-animation: menuNavShowLeft .5s forwards;
				animation: menuNavShowLeft .5s forwards;
			}

			&.menu-hidden {
				-webkit-animation: menuNavHiddenLeft .5s forwards;
				animation: menuNavHiddenLeft .5s forwards;
			}

			.headSlideMenuChild {
				width: 60%;
				height: 100%;
			}
		}

		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		z-index: 1000;

		.headSlideMenuChild {
			padding-top: 10px;
			background: #fff;
			overflow: auto;

			span, a {
				display: block;
				color: #333;
				padding-left: 20px;
				line-height: 40px;

				&:hover {
					color: #246dff;
					background: #ccc;
				}

				&.is-active {
					color: #246dff;
					background: #ccc;
				}
			}
		}
	}

	@keyframes menuNavShow {
		from {
			top: -100%;
		}
		to {
			top: 0;
		}
	}

	@keyframes menuNavHidden {
		from {
			top: 0;
		}
		to {
			top: -100%;
		}
	}

	@keyframes menuNavShowLeft {
		from {
			left: -100%;
		}
		to {
			left: 0;
		}
	}

	@keyframes menuNavHiddenLeft {
		from {
			left: 0;
		}
		to {
			left: -100%;
		}
	}
</style>
