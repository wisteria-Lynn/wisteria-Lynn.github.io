<template>
	<div>
		<div class="message">{{message}}</div>
		<div>画布1:</div>
		<div class="canvas1-wrap">
			<canvas id="canvas1" ref="canvas1" width="600" height="300"></canvas>
		</div>
		<div>画布2:</div>
		<div class="canvas2-wrap">
			<canvas id="canvas2" ref="canvas2" width="600" height="300"></canvas>
		</div>
	</div>
</template>

<script>
	export default {
		name: "canvasDemo",
		data() {
			return {
				message: ''
			}
		},
		methods: {
			drawImg(canvas1,cxt) {
				let img = new Image()
				let x = 200
				let y = 100
				let w = 40
				let r = 10
				img.onload = () => {
					// 绘制图片
					cxt.drawImage(img, 20, 20, 500, 200)
					// 方块
					// cxt.fillStyle = '#fff'
					// cxt.fillRect(200,100,100,100)
					// // 右边圆
					// cxt.beginPath()
					// cxt.arc(315,150,20,0,2*Math.PI)
					// cxt.fillStyle = '#fff'
					// cxt.fill()
					// // 上边圆
					// cxt.beginPath()
					// cxt.arc(250,85,20,0,2*Math.PI)
					// cxt.fillStyle = '#fff'
					// cxt.fill()
					// // 左边圆
					// cxt.beginPath()
					// cxt.arc(185,150,20,0.5*Math.PI,1.5*Math.PI,true)
					// cxt.globalCompositeOperation = "xor"
					// cxt.fillStyle = '#fff'
					// cxt.stroke()
				}
				img.src = require('../../../assets/img/login/canvas_back.jpg')
				cxt.beginPath()
				cxt.moveTo(x, y)
				cxt.lineTo(x + w / 2, y)
				cxt.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI) //
				cxt.lineTo(x + w / 2, y)
				cxt.lineTo(x + w, y)
				cxt.lineTo(x + w, y + w / 2)
				cxt.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI) //
				cxt.lineTo(x + w, y + w / 2)
				cxt.lineTo(x + w, y + w)
				cxt.lineTo(x, y + w)
				cxt.lineTo(x, y)
				cxt.fill()
				cxt.beginPath()
				cxt.arc(x, y + w / 2, r, 1.5 * Math.PI, 0.5 * Math.PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
				cxt.globalCompositeOperation = "xor"
				cxt.fillStyle = '#fff'
				cxt.fill()
			},
			drawImg2(canvas2,cxt) {
				let img = new Image()
				let x = 200
				let y = 100
				let w = 40
				let r = 10
				img.onload = () => {
					// 绘制图片
					cxt.drawImage(img, 20, 20, 500, 200)
					// 绘制裁剪抠图
					let blockWidth = w + r * 2
					let _y = y - r * 2 + 2 // 滑块实际的y坐标
					let ImageData = cxt.getImageData(x, _y, blockWidth, blockWidth)
					canvas2.width = blockWidth
					cxt.putImageData(ImageData, 0, _y)
					// 方块
					// cxt.fillStyle = '#fff'
					// cxt.fillRect(200,100,100,100)
					// // 右边圆
					// cxt.beginPath()
					// cxt.arc(315,150,20,0,2*Math.PI)
					// cxt.fillStyle = '#fff'
					// cxt.fill()
					// // 上边圆
					// cxt.beginPath()
					// cxt.arc(250,85,20,0,2*Math.PI)
					// cxt.fillStyle = '#fff'
					// cxt.fill()
					// // 左边圆
					// cxt.beginPath()
					// cxt.arc(185,150,20,0.5*Math.PI,1.5*Math.PI,true)
					// cxt.globalCompositeOperation = "xor"
					// cxt.fillStyle = '#fff'
					// cxt.stroke()
				}
				img.src = require('../../../assets/img/login/canvas_back.jpg')
				cxt.beginPath()
				cxt.moveTo(x, y)
				cxt.lineTo(x + w / 2, y)
				cxt.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI) //
				cxt.lineTo(x + w / 2, y)
				cxt.lineTo(x + w, y)
				cxt.lineTo(x + w, y + w / 2)
				cxt.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI) //
				cxt.lineTo(x + w, y + w / 2)
				cxt.lineTo(x + w, y + w)
				cxt.lineTo(x, y + w)
				cxt.lineTo(x, y)
				cxt.clip()
				cxt.beginPath()
				cxt.arc(x, y + w / 2, r, 1.5 * Math.PI, 0.5 * Math.PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
				cxt.globalCompositeOperation = "xor"
				cxt.fillStyle = '#fff'
				cxt.fill()
			},
			drawArc() {

			}
		},
		mounted() {
			let canvas1 = document.getElementById('canvas1')
			let canvas2 = document.getElementById('canvas2')
			if (canvas1.getContext) {
				this.message = '您的浏览器支持canvas'
			} else {
				this.message = '您的浏览器不支持canvas'
			}
			let cxt1 = canvas1.getContext('2d')
			let cxt2 = canvas2.getContext('2d')
			// 绘制图片
			this.drawImg(canvas1,cxt1)
			// 绘制图片
			this.drawImg2(canvas2,cxt2)
			this.drawArc(cxt1)
		}
	}
</script>

<style scoped lang="less">
	.canvas1-wrap, .canvas2-wrap {
		/*border:1px solid #aaa;*/

		canvas {
			border: 1px solid #ccc;
		}
	}
</style>
