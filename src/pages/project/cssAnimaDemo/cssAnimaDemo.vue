<template>
    <div class="cssAnimaDemo">
		<div class="a-panel">
			<div class="a-panel-title">css弹跳动画</div>
			<div class="a-panel-show demo-1">
				<div class="box-1"></div>
			</div>
		</div>
		<div class="a-panel">
			<div class="a-panel-title">css打字动画</div>
			<div class="a-panel-show demo-2">
				<h1>Typing animation by lanrenzhijia.com</h1>
			</div>
		</div>
		<div class="a-panel">
			<div class="a-panel-title">css3d翻转动画</div>
			<div class="a-panel-show demo-3">
				<div class="card-wrap">
					<div class="card-before">
						第1面
					</div>
					<div class="card-after">
						第2面
					</div>
				</div>
			</div>
		</div>
		<div class="a-panel">
			<div class="a-panel-title">纯css3幻灯片效果</div>
			<div class="a-panel-show demo-4">
				<div class="card-wrap">
					<ul>
						<template v-for="(item,index) in imgList">
							<input type="radio" name="radio-btn" :id="`img-${index}`" :checked="index === 0"></input>
							<li>
								<img alt="" :src="item">
								<div class="nav">
									<label v-if="index === 0" :for="`img-${imgList.length-1}`" class="prev">&lt;</label>
									<label v-else :for="`img-${index-1}`" class="prev">&lt;</label>
									<label v-if="index === imgList.length - 1"  :for="'img-0'" class="next">&gt;</label>
									<label v-else :for="`img-${index+1}`" class="next">&gt;</label>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "cssAnimaDemo",
		data(){
        	return {
        		imgList:[require('../../../assets/img/imgLazyLoad/lazy-1.jpg'),
					require('../../../assets/img/imgLazyLoad/lazy-2.jpg'),
					require('../../../assets/img/imgLazyLoad/lazy-3.jpg'),
					require('../../../assets/img/imgLazyLoad/lazy-4.jpg'),
					require('../../../assets/img/imgLazyLoad/lazy-5.jpg')]
			}
		}
    }
</script>

<style lang="less">
	.cssAnimaDemo{
		.a-panel{
			.a-panel-title{
				padding:10px 10px;
				font-weight: 700;
			}
			.a-panel-show{
				padding:10px 10px;
				border:1px solid #ccc;
				&.demo-1{
					height:120px;
					.box-1{
						position:relative;
					}
					.box-1:after{
						content: '';
						z-index:1;
						position:absolute;
						width:50px;
						height:50px;
						top:30px;
						left:50px;
						background:#c00;
						border-radius:2px ;
						transform: rotate(45deg);
						animation: box-1 .5s infinite;
					}
					.box-1:before{
						content:'';
						z-index:2;
						position: absolute;
						width:50px;
						height:5px;
						background:#eee;
						border-radius: 100%;
						top:105px;
						left:50px;
					}
					@keyframes box-1 {
						0%{
							top:20px;
							transform: rotate(90deg);
						}
						20%{
							border-radius:2px ;
						}
						50%{
							top:50px;
							transform: rotate(45deg);
							border-bottom-right-radius: 25px;
						}
						80%{
							border-radius: 2px;
						}
						100%{
							top:20px;
							transform: rotate(0deg);
						}
					}
				}
				&.demo-2{
					@keyframes typing { from { width: 0; } }
					@keyframes blink-caret { 50% { border-color: transparent; } }
					h1 {
						font: bold 200% Consolas, Monaco, monospace;
						border-right: .1em solid;
						width: 16.5em; /* fallback */
						width: 37ch; /* # of chars */
						margin: 2em 1em;
						white-space: nowrap;
						overflow: hidden;
						animation: typing 5s steps(37, end) infinite, /* # of steps = # of chars */
						blink-caret .5s step-end infinite alternate;
					}
				}
				&.demo-3{
					.card-wrap{
						perspective:1200px;
						position: relative;
						box-sizing: border-box;
						width:200px;
						height:100px;
						&:hover .card-before{
							transform: rotateY(180deg);
						}
						&:hover .card-after{
							transform: rotateY(0deg);
						}
						.card-before,.card-after{
							width:100%;
							height:100%;
							border:1px solid #ccc;
							position:absolute;
							left:0;
							top:0;
							backface-visibility: hidden;
							transition: 1s;
						}
						.card-before{
							background: #67C23A;
						}
						.card-after{
							background: #F56C6C;
							transform: rotateY(-180deg);
						}
					}
				}
				&.demo-4{
					.card-wrap{
						width:600px;
						height:400px;
						input{
							display: none;
						}
						ul{
							position:relative;
							width:600px;
							height:400px;
							overflow: hidden;
							li{
								list-style: none;
								position:absolute;
								height:100%;
								left:100%;
								z-index:10;
								.nav{
									position:absolute;
									width:100%;
									height:100%;
									top:0;
									.prev,.next{
										display: inline-block;
										position: absolute;
										font-size:40px;
										color:#fff;
										width:20%;
										height:100%;
										line-height: 400px;
										cursor: pointer;
										opacity: 0;
										z-index:200;
										text-align: center;
										&:hover{
											opacity: 1;
											background:rgba(255,255,255,.5);
											transition: all .5s ease-in;
										}
									}
									.prev{
										left:0;
										padding-left:10px;
									}
									.next{
										right:0;
										padding-right:10px;
									}
								}
								img{
									/*width:100%;*/
									height:100%;
								}
							}
						}
						[id^='img']:checked + li{
							left:0;
							transition:left .5s ease-out;
						}
					}
				}
			}
		}
	}
</style>
