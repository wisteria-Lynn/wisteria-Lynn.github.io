<template>
    <div class="headBack">
		<div class="head-top" :class="[backbg?'color-1':'color-2',headtop?'top-bg-show':'top-bg-hidden']">
			<router-link :to="url"><i class="el-icon-arrow-left"></i></router-link>
			<span v-show="backbg">{{$route.meta.title || ''}}</span>
		</div>
		<div class="back-bg" :class="[backbg?'url-no':'bg-url']">
			<div class="head-txt tc" v-show="!backbg">
				<i class="iconfont icondangedemoban"></i>
				<span>{{$route.meta.title || ''}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { throttle, Scroll } from '@/util/handleDOM'
    export default {
        name: "headBack",
		props:['url'],
		data(){
        	return {
        		backbg:false,
				headtop:false
			}
		},
		mounted(){
			// 监听滚动条 节流
			this.throttled = throttle(() => {
				this.backbg = Scroll.scrollTop() > 80
				this.headtop = Scroll.scrollTop() > 100
			}, 200)
			window.addEventListener('scroll', this.throttled, true)
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.throttled, true)
		}
    }
</script>
<style lang="less">
	.headBack{
		.url-no{
			animation: bgmovehidden 1s forwards ease-in-out;
		}
		.bg-url{
			animation: bgmoveshow 1s forwards ease-in-out;
		}
		.head-top{
			&.top-bg-show{
				animation: bgshow 1s forwards ease-in-out;
			}
			&.top-bg-hidden{
				animation: bghidden .5s forwards ease-in-out;
			}
		}
	}
	@keyframes bgmoveshow {
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
	@keyframes bgmovehidden {
		from{
			opacity: 1;
		}
		to{
			opacity: 0;
		}
	}
	@keyframes bghidden {
		 from{
			 background: #Fff;
		 }
		 to{
			 background: none;
		 }
	 }
	@keyframes bgshow {
		from{
			background: none;
		}
		to{
			background: #Fff;
		}
	}
</style>
<style scoped lang="less">
	.headBack{
		font-size:20px;
		background:#fff;
		.back-bg{
			height: 300px;
			background:url('../../assets/img/demo/demobg.jpg') 100%;
		}
		.head-top{
			position: fixed;
			width: 100%;
			padding: 0 20px;
			line-height: 60px;
			z-index: 2;
			&.color-1{
				i{
					color:#333;
				}
			}
			&.color-2{
				i{
					color:#fff;
				}
			}
			i{
				font-weight: 600;
				margin-right:10px;
			}
		}
		.head-txt{
			padding-top:60px;
			color:#Fff;
			i{
				color:#fff;
				font-size:100px;
			}
			span{
				font-size:24px;
				display: block;
			}
		}
		@media (max-width: 768px) {
			.back-bg{
				height: 200px !important;
			}
			.head-txt {
				padding-top: 30px !important;
			}
		}
	}
</style>
