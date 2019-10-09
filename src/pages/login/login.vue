<!--登录-->
<template>
	<div class="login">
		<div class="loginBack">
			<div class="formWrap">
				<h3 class="t-center">流莹离的个人博客登陆</h3>
				<!--表单-->
				<el-form
					:model="loginForm"
					label-position="left"
					status-icon
					:rules="loginFormRules"
					ref="loginForm"
					label-width="100px"
					class="demo-ruleForm">
					<el-form-item>
						<div class="form-foot t-right">
							<span v-show="!(loginType === 1)" @click="changeLoginType(1)">正常登录</span>
							<span v-show="!(loginType === 2) && !isMobileBrowser()" @click="changeLoginType(2)">拼图登录</span>
							<span v-show="!(loginType === 3) && !isMobileBrowser()" @click="changeLoginType(3)">滑块登录</span>
						</div>
					</el-form-item>
					<el-form-item label="账号" prop="username">
						<el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
					</el-form-item>
					<!--滑块验证-->
					<el-form-item v-if="loginType === 3">
						<!--滑动条-->
						<div class="slide-wrap t-center">
							<div class="slide-bg" ref="slideBg"></div>
							<div class="slide-btn t-center" ref="slideBtn" @mousedown="slideBtnMouseDown">
								<span :class="[{'animation':isSlideBtnAnimat}]"><i
									class="el-icon-d-arrow-right"></i></span></div>
							<span class="slide-text" v-html="slideText" :class="[{'success':isValiteSuccess}]"></span>
						</div>
					</el-form-item>
					<!--滑块拼图验证-->
					<el-form-item v-if="loginType === 2">
						<!--图片-->
						<div class="canvas-wrap">
							<canvas id="canvas" width="250" height="100"></canvas>
							<canvas ref="block" id="block" width="250" height="100"></canvas>
						</div>
						<!--滑动条-->
						<div class="canvas-slide-wrap t-center">
							<div class="canvas-slide-bg" ref="canvasSlideBg"></div>
							<div class="canvas-slide-btn t-center" ref="canvasSlideBtn"
								 @mousedown="canvasSlideBtnMouseDown">
								<span><i class="el-icon-d-arrow-right"></i></span>
							</div>
							<span class="canvas-slide-text" v-html="canvasSlideText"
								  :class="[{'success':isValiteSuccess}]"></span>
						</div>
					</el-form-item>
					<el-form-item label=" " prop="repassword">
						<el-checkbox label="记住密码" name="type" v-model="loginForm.repassword"></el-checkbox>
					</el-form-item>
					<el-form-item v-if="loginType === 1">
						<el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
					</el-form-item>
					<el-form-item>
						<div class="other-type">
							<div class="other-text">其他方式登录</div>
							<span @click="loginQQ" class="iconfont icon-qq"></span>
							<span @click="loginWeiXin" class="iconfont icon-weixin"></span>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import {login} from "../../api/user"
	import {Base64} from "common/base64"
	import {codeText} from '../../api/api'

	export default {
		name: "login",
		data() {
			// var checkAge = (rule, value, callback) => {
			// 	if (!value) {
			// 		return callback(new Error('年龄不能为空'));
			// 	}
			// 	setTimeout(() => {
			// 		if (!Number.isInteger(value)) {
			// 			callback(new Error('请输入数字值'));
			// 		} else {
			// 			if (value < 18) {
			// 				callback(new Error('必须年满18岁'));
			// 			} else {
			// 				callback();
			// 			}
			// 		}
			// 	}, 1000);
			// };
			let validateUserName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'))
				} else {
					callback()
				}
			}
			let validatePassWord = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					callback()
				}
			}
			return {
				loginType: 1, // 1正常登录，2.拼图登录，3.滑块登录
				slideText: '拖动滑块验证',
				canvasSlideText: '拖动上方滑块验证',
				distance: '',
				isValiteSuccess: false,// 是否验证成功
				isSlideBtnAnimat: true,// 滑块验证 - 按钮的动画效果
				//登录表单
				loginForm: {
					username: '',
					password: '',
					repassword: true // 是否记住密码
				},
				// 登录表单规则验证
				loginFormRules: {
					username: [
						{validator: validateUserName, trigger: 'blur'}
					],
					password: [
						{validator: validatePassWord, trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			// 登录提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						login({
							'username': this.loginForm.username,
							'password': this.loginForm.password
						}).then((res => {
							console.log(res)
							if (res.code === 0) {
								// 登录成功
								let userInfo = {
									username: this.loginForm.username,
									password: Base64.encode(this.loginForm.password),
									repassword: this.loginForm.repassword,
									token: res.token
								}
								// 本地存储信息
								this.$store.dispatch('loginAction', userInfo)
								this.$store.dispatch('isLogin', true)
								this.$router.push({'path': this.$route.query.redirect ? this.$route.query.redirect : '/'})
							} else {
								// 登录失败
								this.layer.msg(codeText(res.code,res.message))
								if (this.loginType === 3) {
									// 滑块登录失败 滑块复位
									this.$refs['slideBtn'].style.left = 0 + 'px'
									this.$refs['slideBg'].style.width = 0 + 'px'
									this.$refs['slideBtn'].style.transition = "left 1s ease"
									this.$refs['slideBg'].style.transition = "width 1s ease"
									this.slideText = '拖动滑块验证'
									this.isValiteSuccess = false
									this.isSlideBtnAnimat = true
								}
								if (this.loginType === 2) {
									// 滑块拼图登录失败 拼图复位
									this.$refs['block'].style.left = 0 + 'px'
									this.$refs['canvasSlideBtn'].style.left = 0 + 'px'
									this.$refs['canvasSlideBg'].style.width = 0 + 'px'
									this.$refs['block'].style.transition = "left 1s ease"
									this.$refs['canvasSlideBtn'].style.transition = "left 1s ease"
									this.$refs['canvasSlideBg'].style.transition = "width 1s ease"
									this.canvasSlideText = '拖动上方滑块验证'
									this.isValiteSuccess = false
								}
							}
						})).catch((res)=>{
							this.layer.msg(codeText(res.code,res.message))
						})
					} else {
						this.layer.msg('登陆失败')
						return false
					}
				})
			},
			// 改变登录方式
			changeLoginType(type) {
				this.loginType = type
				if (type === 1) {

				}
				if (type === 2) {
					// 初始化拼图
					this.canvasInt()
				}
				if (type === 3) {

				}

			},
			canvasInt() {
				let canvas = document.getElementById('canvas') // 主画布
				let block = document.getElementById('block') // 裁剪画布
				let main_ctx = canvas.getContext('2d') // 主画布画笔
				let block_ctx = block.getContext('2d')// 裁剪画布画笔
				// 清空画布
				main_ctx.clearRect(0, 0, 250, 100)
				block.width = 250
				block.height = 100
				block_ctx.clearRect(0, 0, 250, 100)
				let img = new Image() // 定义画布图片
				let w = 40 // 拼图宽度and长度
				let r = 10 // 拼图凹凸圆的半径
				//拼图横坐标，随机选择&&保证裁剪的拼接块在画布内
				let x = 40 + Math.random() * (canvas.width - 40 - w - (2 * r))
				//裁剪纵坐标，随机选择&&保证裁剪的拼接块在画布内
				let y = 20 + Math.random() * (canvas.height - w - 20 - (2 * r))
				// 滑块应该移动往右的距离 = 拼图横坐标
				this.distance = parseInt(x)
				// 画布图片加载
				img.onload = () => {
					//绘制画布图片
					main_ctx.drawImage(img, 0, 0, 250, 100)
					block_ctx.drawImage(img, 0, 0, 250, 100)
					// 绘制裁剪抠图
					let blockWidth = w + r * 2
					let _y = y - r * 2 + 2 // 滑块实际的y坐标
					let ImageData = block_ctx.getImageData(x, _y, blockWidth, blockWidth)
					block.width = blockWidth
					block_ctx.putImageData(ImageData, 0, _y)
				}
				// 画布图片url
				img.src = require('../../assets/img/login/canvas_back.jpg')

				//裁剪拼接块
				function cut_i(ctx) {
					ctx.beginPath()
					ctx.moveTo(x, y)
					ctx.lineTo(x + w / 2, y)
					ctx.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI) //
					ctx.lineTo(x + w / 2, y)
					ctx.lineTo(x + w, y)
					ctx.lineTo(x + w, y + w / 2)
					ctx.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI) //
					ctx.lineTo(x + w, y + w / 2)
					ctx.lineTo(x + w, y + w)
					ctx.lineTo(x, y + w)
					ctx.lineTo(x, y)
					ctx.clip()
					ctx.beginPath()
					ctx.arc(x, y + w / 2, r, 1.5 * Math.PI, 0.5 * Math.PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
					ctx.globalCompositeOperation = "xor"
					ctx.fillStyle = '#fff'
					ctx.fill()
				}

				//裁剪主画布
				function fill_i(ctx) {
					ctx.beginPath()
					ctx.moveTo(x, y)
					ctx.lineTo(x + w / 2, y)
					ctx.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI) //
					ctx.lineTo(x + w / 2, y)
					ctx.lineTo(x + w, y)
					ctx.lineTo(x + w, y + w / 2)
					ctx.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI) //
					ctx.lineTo(x + w, y + w / 2)
					ctx.lineTo(x + w, y + w)
					ctx.lineTo(x, y + w)
					ctx.lineTo(x, y)
					ctx.fill()
					ctx.beginPath()
					ctx.arc(x, y + w / 2, r, 1.5 * Math.PI, 0.5 * Math.PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
					ctx.globalCompositeOperation = "xor"
					ctx.fillStyle = '#fff'
					ctx.fill()
				}

				cut_i(block_ctx)
				fill_i(main_ctx)
			},
			// 拼图验证 - 鼠标按下事件
			canvasSlideBtnMouseDown(e) {
				// 清除鼠标默认事件
				e.preventDefault()
				// 鼠标指针向对于浏览器页面(或客户区)的水平坐标 - 滑块静态时水平位置
				let downX = e.clientX
				this.canvasSlideText = ''
				// 注册鼠标移动事件
				document.onmousemove = (e2) => {
					// 当前鼠标移动时的水平位置
					let moveX = e2.clientX
					// 移动距离 当前鼠标移动位置 - 滑块静态时水平位置
					let offsetX = moveX - downX
					offsetX = offsetX > 210 ? 210 : offsetX < 0 ? 0 : offsetX
					// 滑块移动，拼图移动，背景宽度改变
					this.$refs['block'].style.left = offsetX + 'px'
					this.$refs['canvasSlideBtn'].style.left = offsetX + 'px'
					this.$refs['canvasSlideBg'].style.width = offsetX + 'px'
					// 清除滑动按钮和背景的过滤属性
					this.$refs['block'].style.transition = ''
					this.$refs['canvasSlideBtn'].style.transition = ''
					this.$refs['canvasSlideBg'].style.transition = ''
				}
				// 注册鼠标松开事件
				document.onmouseup = (e3) => {
					let stopX = e3.clientX
					// 移动距离 当前鼠标松开时的位置 - 滑块静态时水平位置
					let offsetX = stopX - downX
					if (offsetX < this.distance + 3 && offsetX > this.distance - 3) {
						// 在误差范围内 确定拼图拼接成功
						this.isValiteSuccess = true
						this.canvasSlideText = '验证成功'
						// 清空鼠标注册事件
						document.onmousemove = null
						document.onmouseup = null
						this.$refs['canvasSlideBtn'].onmousedown = null
						// 提交表单
						this.submitForm('loginForm')
						return
					} else {
						//反之，则将滑块复位（设置了1s的属性过渡效果）
						this.$refs['block'].style.left = 0 + 'px'
						this.$refs['canvasSlideBtn'].style.left = 0 + 'px'
						this.$refs['canvasSlideBg'].style.width = 0 + 'px'
						this.$refs['block'].style.transition = "left 1s ease"
						this.$refs['canvasSlideBtn'].style.transition = "left 1s ease"
						this.$refs['canvasSlideBg'].style.transition = "width 1s ease"
						this.canvasSlideText = '拖动上方滑块验证'
						this.isValiteSuccess = false
						document.onmousemove = null
						document.onmouseup = null
					}
					// 清空鼠标注册事件
					document.onmousemove = null
					document.onmouseup = null
				}
			},
			// 滑动验证 - 鼠标按下事件
			slideBtnMouseDown(e) {
				// 清除鼠标默认事件
				e.preventDefault()
				// 鼠标指针向对于浏览器页面(或客户区)的水平坐标 按钮水平位置
				let downX = e.clientX
				// 清空验证文字
				this.slideText = ''
				// 清除按钮动画效果
				this.isSlideBtnAnimat = false
				// 鼠标移动事件
				document.onmousemove = (e2) => {
					// 当前鼠标的水平位置
					let moveX = e2.clientX
					// 移动距离 当前鼠标位置 - 按钮水平位置
					let offsetX = moveX - downX
					// 移动距离大于210 停在终点 小于0 停在起点
					offsetX = offsetX > 210 ? 210 : offsetX < 0 ? 0 : offsetX
					// 清除滑动按钮和背景的过滤属性
					this.$refs['slideBtn'].style.transition = ''
					this.$refs['slideBg'].style.transition = ''
					this.$refs['slideBtn'].style.left = offsetX + 'px'
					this.$refs['slideBg'].style.width = offsetX + 'px'
					this.isValiteSuccess = false
					if (offsetX === 210) {
						this.isValiteSuccess = true
						this.slideText = '验证成功'
						// 清空鼠标注册事件
						document.onmousemove = null
						this.$refs['slideBtn'].onmousedown = null
						this.submitForm('loginForm')
					}
				}
				document.onmouseup = (e3) => {
					//只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
					//如果鼠标松开时，滑到了终点，则验证通过
					if (this.isValiteSuccess) {
						document.onmousemove = null
						document.onmouseup = null
						return
					} else {
						//反之，则将滑块复位（设置了1s的属性过渡效果）
						this.$refs['slideBtn'].style.left = 0 + 'px'
						this.$refs['slideBg'].style.width = 0 + 'px'
						this.$refs['slideBtn'].style.transition = "left 1s ease"
						this.$refs['slideBg'].style.transition = "width 1s ease"
						this.slideText = '拖动滑块验证'
						this.isSlideBtnAnimat = true
						this.isValiteSuccess = false
						document.onmousemove = null
						document.onmouseup = null
					}
					// 清空鼠标注册事件
					document.onmousemove = null
					document.onmouseup = null
				}
			},
			loginWeiXin(){
				let appid = 'wx995d7cf3ccc6209a'
				let appsecret = '070695aa9e00c455a5141d61189f9c5d'
				let scope = 'snsapi_login'
				let REDIRECT_URI = ''
				window.location.href ='https://open.weixin.qq.com/connect/qrconnect?' +
					'appid=' + appid +
					'&redirect_uri='+ REDIRECT_URI +
					'&response_type=code' +
					'&scope='+ scope +
					'&state=STATE#wechat_redirect'
			},
			loginQQ(){

			}
		},
		created() {
			// 获取用户信息
			let userinfo = JSON.parse(localStorage.getItem('userInfo'))
			if (userinfo && userinfo.repassword) {
				this.loginForm.username = userinfo.username
				this.loginForm.password = Base64.decode(userinfo.password)
				this.loginForm.repassword = userinfo.repassword
			}
		}
	}
</script>
<style lang="less" type="text/less">
	.login {
		.el-form-item__label {
			color: #ccc;
		}

		.el-input__inner {
			border-color: rgba(255, 255, 255, .1)
		}

		.el-input__inner:focus {
			border-color: rgba(255, 255, 255, .4)
		}

		.el-form-item.is-success .el-input__inner {
			border-color: rgba(255, 255, 255, .1)
		}

		.el-form-item.is-success .el-input__inner:focus {
			border-color: rgba(255, 255, 255, .4)
		}

		.el-input__suffix {
			display: none;
		}
	}

	.login {
		/*position: relative;*/
		position: absolute;
		width: 100%;
		height: 100%;
		/*background: url('../../assets/img/login/login_back3.jpg') no-repeat center;*/
		/*background-size: 100% 100%;*/

		input {
			color: #fff;
			background: rgba(255, 255, 255, .1);
		}

		button {
			background-color: rgba(40, 57, 101, .9);

			&:hover {
				background-color: rgba(40, 57, 101, .99);
				border-color: #0f7ef1;
			}
		}

		.loginBack {
			position: absolute;
			width: 100%;
			height: 100%;
			/*background: rgba(40, 57, 101, .4);*/
			/*background-size: 100%;*/

			.formWrap {
				position: absolute;
				/*animation: formWrapWidth 3s 1 forwards;*/
				/*animation: formWrapWidth 2s 1 forwards;*/
				top: 50%;
				left: 50%;
				width: 350px;
				transform: translate(-50%, -50%);
				background: #fff;
				padding: 50px 50px 0 50px;
				background:rgba(11, 35, 99, 0.8);
				box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);

				h3{
					margin:15px auto 30px auto;
					color:#ccc;
				}
				.slide-wrap {
					/*position:relative;*/
					width: 250px;
					height: 40px;
					background: #ccc;

					.slide-bg {
						position: absolute;
						height: 40px;
						background: green;
					}

					.slide-btn {
						position: absolute;
						display: inline-block;
						width: 40px;
						left: 0;
						background: #Fff;
						cursor: move;

						span {
							&.animation {
								animation: slideBtn 1.5s infinite;
							}
						}
					}

					.slide-text {
						/*position: absolute;*/
						/*margin-left: 100px;*/

						&.success {
							color: #fff;
						}
					}
				}

				.canvas-slide-wrap {
					margin-top: 1rem;
					width: 250px;
					height: 40px;
					background: #ccc;

					.canvas-slide-bg {
						position: absolute;
						height: 40px;
						background: green;
					}

					.canvas-slide-btn {
						position: absolute;
						display: inline-block;
						width: 40px;
						left: 0;
						background: #Fff;
						cursor: move;
					}

					.canvas-slide-text {
						/*position: absolute;*/
						/*margin-left: 100px;*/

						&.success {
							color: #fff;
						}
					}
				}

				.canvas-wrap {
					position: relative;
					overflow: hidden;
					height: 100px;
					background: #fff;

					#canvas {
						position: absolute;
					}

					#block {
						position: absolute;
					}
				}

				.form-foot {
					color: #ccc;

					span {
						cursor: pointer;
						margin-right: .3rem;

						&:hover {
							text-decoration: underline;
						}
					}
				}

				.other-type {
					.other-text {
						color: #999;
					}
					.icon-qq:hover{
						color:rgb(94,170,222)
					}
					.icon-weixin:hover{
						color:#5cca25
					}
					span{
						color:#aaa;
						font-size:22px;
						cursor: pointer;
					}
				}
			}
		}

		@keyframes formWrapWidth {
			/*0%{*/
			/*left:0;*/
			/*}*/
			/*100%{*/
			/*left:70%;*/
			/*}*/
			0% {
				top: 0;
			}
			25% {
				top: 65%;
			}
			50% {
				top: 35%;
			}
			75% {
				top: 55%;
			}
			85% {
				top: 45%;
			}
			100% {
				top: 50%;
			}
		}
		@keyframes slideBtn {
			0% {
				opacity: .9;
			}
			25% {
				opacity: .7;
			}
			50% {
				opacity: .3;
			}
			75% {
				opacity: .6;
			}
			100% {
				opacity: .8;
			}
		}
	}
</style>
<style scoped lang="less">
	@media (max-width:768px){
		.formWrap{
			width:calc(95% - 100px) !important;
		}
	}
</style>
