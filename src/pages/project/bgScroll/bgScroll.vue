<template>
    <div class="bgScroll">
		<template v-for="(item,index) in imgList">
			<img :src="item.url" :class="'img'+(index+1)">
		</template>
	</div>
</template>

<script>
	import {Scroll} from "../../../util/handleDOM"

	export default {
        name: "bgScroll",
		data(){
        	return {
        		imgList:[{
        			url:require('../../../assets/img/imgLazyLoad/lazy-1.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-2.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-3.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-4.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-5.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-6.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-7.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-8.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-9.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-10.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-11.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-12.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-13.jpg')
				},{
					url:require('../../../assets/img/imgLazyLoad/lazy-14.jpg')
				},],
				topList:[]
			}
		}
    }
</script>

<style scoped lang="less">
	.bgScroll{
		position:absolute;
		width:100%;
		height:100%;
		background:#fff;
		overflow: hidden;
		img{
			position: absolute;
			width:100%;
			height:100%;
			animation: linear 500s infinite;
			&.img1{
				top:0;
				animation-name: move1;
			}
			&.img2{
				top:100%;
				animation-name: move2;
			}
			&.img3{
				top:200%;
				animation-name: move3;
			}
			&.img4{
				top:300%;
				animation-name: move4;
			}
			&.img5{
				top:400%;
				animation-name: move5;
			}
			&.img6{
				top:500%;
				animation-name: move6;
			}
			&.img7{
				top:600%;
				animation-name: move7;
			}
			&.img8{
				top:700%;
				animation-name: move8;
			}
			&.img9{
				top:800%;
				animation-name: move9;
			}
			&.img10{
				top:900%;
				animation-name: move10;
			}
			&.img11{
				top:1000%;
				animation-name: move11;
			}
			&.img12{
				top:1100%;
				animation-name: move12;
			}
			&.img13{
				top:1200%;
				animation-name: move3;
			}
			&.img14{
				top:1300%;
				animation-name: move14;
			}
		}
	}
	@keyframes move1{
		0% {
			top:0;
		}
		100%{
			top:-1300%;
		}
	}
	@keyframes move2{
		 0% {
			 top:100%;
		 }
		 100%{
			 top:-1200%;
		 }
	 }
	@keyframes move3{
		0% {
			top:200%;
		}
		100%{
			top:-1100%;
		}
	}
	@keyframes move4{
		0% {
			top:300%;
		}
		100%{
			top:-1000%;
		}
	}
	@keyframes move5{
		0% {
			top:400%;
		}
		100%{
			top:-900%;
		}
	}
	@keyframes move6{
		0% {
			top:500%;
		}
		100%{
			top:-800%;
		}
	}
	@keyframes move7{
		0% {
			top:600%;
		}
		100%{
			top:-700%;
		}
	}
	@keyframes move8{
		0% {
			top:700%;
		}
		100%{
			top:-600%;
		}
	}
	@keyframes move9{
		0% {
			top:800%;
		}
		100%{
			top:-500%;
		}
	}
	@keyframes move10{
		0% {
			top:900%;
		}
		100%{
			top:-400%;
		}
	}
	@keyframes move11{
		0% {
			top:1000%;
		}
		100%{
			top:-300%;
		}
	}
	@keyframes move12{
		0% {
			top:1100%;
		}
		100%{
			top:-200%;
		}
	}
	@keyframes move13{
		0% {
			top:1200%;
		}
		100%{
			top:-100%;
		}
	}
	@keyframes move14{
		0% {
			top:1300%;
		}
		100%{
			top:0;
		}
	}

</style>
