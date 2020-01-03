<template>
	<div class='yl-login'>
		<v-header></v-header>
		<el-row class="yl-login-contain">
			<el-col :md='{span: 22,offset: 1}' :lg={span:18,offset:3}>
				<div class="yl-login-main">
					<!--{/* 左侧图片 */}-->
					<div class='yl-login-left'>
						<img src="../../assets/img/login/leftimg.png" alt='login'/>
					</div>
					<!--{/* 右侧登录框 */}-->
					<div class='yl-login-wrap'>
						<!--{/* 登录tab标签 */}-->
						<el-row class='yl-login-tab-head'>
							<el-col :span="8" @click.native="changeTab(1)" :class="[tabName === 1 ? 'active' : '']">
								账号登录
							</el-col>
							<el-col :span="8" @click.native="changeTab(2)" :class="[tabName === 2 ? 'active' : '']">
								QQ登录
							</el-col>
							<el-col :span="8" @click.native="changeTab(3)" :class="[tabName === 3 ? 'active' : '']">
								微信登录
							</el-col>
						</el-row>
						<!--{/* 账号登录 */}-->
						<div :class="['yl-login-tab','yl-login-form', tabName === 1 ? 'show' : 'hide']">
							<div :class="[!codeType ? 'show' : 'hide']">
								<!--{/*账号登录*/}-->
								<div :class="[!mobileType ? 'show' : 'hide']">
									<el-form class='login-form demo-ruleForm'
											 :model="AccountForm"
											 label-position="left"
											 status-icon
											 :rules="AccountFormRules"
											 ref="AccountForm">
										<el-form-item prop="username">
											<el-input
												placeholder="手机/邮箱/用户名"
												prefix-icon="el-icon-user"
												v-model="AccountForm.username">
											</el-input>
										</el-form-item>
										<el-form-item prop="password">
											<el-input
												type="password"
												placeholder="密码"
												prefix-icon="el-icon-lock"
												v-model="AccountForm.password">
											</el-input>
										</el-form-item>
										<div class="login-form-forgot tr">
											<el-tooltip content="功能暂未开启，敬请期待">
												<router-link class='hover' to='/regist'>忘记密码</router-link>
											</el-tooltip>
										</div>
										<el-form-item>
											<el-button type="primary" class="login-form-button"
													   @click="handleSubmit('AccountForm')">
												登录
											</el-button>
										</el-form-item>
									</el-form>
								</div>
								<!--{/*手机号码登录*/}-->
								<div :class="[mobileType ? 'show' : 'hide']">
									<el-form class='login-form demo-ruleForm'
											 :model="MobileForm"
											 label-position="left"
											 status-icon
											 :rules="MobileFormRules"
											 ref="MobileForm">
										<el-form-item prop="phone">
											<el-input
												placeholder="手机号"
												prefix-icon="el-icon-user"
												v-model="MobileForm.phone">
											</el-input>
										</el-form-item>
										<el-form-item prop="code">
											<el-input
												style="width:calc(100% - 11rem);"
												placeholder="动态密码"
												v-model="MobileForm.code">
											</el-input>
											<el-button @click="sendCode" style="float:right;padding:12px 10px;"
													   :class="[times < 59 ? 'btn-disabled' : '']" class='send-btn color'>
												{{sendText}}
											</el-button>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="handleSubmit('MobileForm')"
													   class="login-form-button">
												登录
											</el-button>
										</el-form-item>
									</el-form>
								</div>
								<div :class="['yl-login-code','tc', !codeType ? 'show' : 'hide']">
									<div class='marBom-20'>
                                                <span class='hover' @click="changeMobileType">
                                                           {{mobileType ? '账号密码登录' : '手机验证码登录'}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
										<el-tooltip content="功能暂未开启，敬请期待">
											<router-link class='hover' to='/regist'>免费注册</router-link>
										</el-tooltip>
									</div>
									<UserProxy></UserProxy>
									<div class='other-login'>
										<el-tooltip content="功能暂未开启，敬请期待">
											<i class='iconfont icon-zhifubao' title='支付宝登录'></i>
										</el-tooltip>
										<el-tooltip content="功能暂未开启，敬请期待">
											<i class='iconfont icon-tubiao214' title='新浪登录'></i>
										</el-tooltip>
										<el-tooltip content="功能暂未开启，敬请期待">
											<i class='iconfont icon-baidu1' title='百度登录'></i>
										</el-tooltip>
									</div>
								</div>
							</div>
							<!--{/* 二维码登录 */}-->
							<div :class="['yl-login-code','tc', codeType ? 'show' : 'hide']">
								<span style="font-size: 1.6rem;">扫码登录</span>
								<div class="yl-login-code-model tc">
									<canvas id="codeLogin"></canvas>
									<!--<img src="../../assets/img/login/code.jpg" alt=''/>-->
									<div @click="refreshCode(false)" :class="[timeEnd ? 'bg-model' : 'hide']"
										 :style="{'width':codeWidth+'px','height':codeWidth+'px'}">
										<i class='iconfont icon-gantanhao'></i>
										<p>二维码已过期</p>
										<p>请点击刷新</p>
									</div>
								</div>
								<p>打开<span class='untill-hover'>手机网页端渔火写作</span></p>
								<p>扫一扫登录</p>
								<div class='yl-login-code-icon yl-flex-space-around'>
									<div><i class='iconfont icon-jianpan'></i><span>免输入</span></div>
									<div><i class='iconfont icon-anquan'></i><span>更安全</span></div>
									<div><i class='iconfont icon-shandian-shi'></i><span>更快捷</span></div>
								</div>
							</div>
							<div class='codeSwitch'>
								<img @click="changeCodeType" :class="[codeType ? 'show' : 'hide']"
									 src="../../assets/img/login/computed.png" alt=''/>
								<img @click="changeCodeType" :class="[!codeType ? 'show' : 'hide']"
									 src="../../assets/img/login/code2.png" alt=''/>
							</div>
						</div>
						<!--{/* qq 登录 */}-->
						<div :class="['yl-login-tab','tc', tabName === 2 ? 'show' : 'hide']">
							<div class="yl-login-code-model">
								<img class="marBom-20" src="../../assets/img/login/qq.png" alt="qq"/>
							</div>
							<p class="marBom-10" style="font-size:1.5rem;color:#aaa;">您将跳转至指定页面进行登录操作</p>
							<el-button type="primary" class="login-form-button marBom-10">
								前去QQ登录
							</el-button>
							<UserProxy></UserProxy>
						</div>
						<!--{/* 微信登录 */}-->
						<div :class="['yl-login-tab','tc', tabName === 3 ? 'show' : 'hide']">
							<div class='yl-login-code-model tc'>
								<img class="marBom-20" style="border:1px solid #ddd;width:19rem;height:19rem;"
									 src="../../assets/img/login/code.jpg" alt="code"/>
							</div>
							<p>请使用微信扫描二维码登录</p>
							<p class='marBom-10'>“渔火写作”</p>
							<UserProxy></UserProxy>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {login, createUid, queryUid} from "../../api/user"
	import {Base64} from "common/base64"
	import QRCode from 'qrcode'
	export default {
		name: "login",
		components: {
			'UserProxy': {
				template: ` <div class='marBom-10'>登录即代表同意
                              <a class='untill-hover' href="">《用户服务协议》</a>和
                              <a class='untill-hover' href="">《隐私政策》</a>
                            </div>`
			},
			QRCode:QRCode
		},
		data() {
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
				tabName: 1,
				mobileType: false,
				codeType: false,
				timeEnd: false,
				AccountForm: {
					username: '',
					password: ''
				},
				AccountFormRules: {
					username: [
						{validator: validateUserName, trigger: 'blur'}
					],
					password: [
						{validator: validatePassWord, trigger: 'blur'}
					]
				},
				MobileForm: {
					phone: '',
					code: ''
				},
				MobileFormRules: {
					phone: [
						{validator: validateUserName, trigger: 'blur'}
					],
					code: [
						{validator: validatePassWord, trigger: 'blur'}
					]
				},
				sendText: '发送动态密码',
				timeID: null,
				times: 59,
				codeWidth: '',
				queryCodetimeID: null,
				isCreatedUid: false,
			}
		},
		methods: {
			createdCode() {
				createUid({
					size: 16
				}).then((res) => {
					if (res.code === 0) {
						this.useqrcode('codeLogin', `https://wisteria-lynn.github.io/dist/codeLogin?uid=${res.data}`, (e, width) => {
							if (e) {
								this.layer.msg('二维码创建失败！')
							} else {
								this.codeWidth = width
								this.timeEnd = false
								this.isCreatedUid = true
								setTimeout(() => {
									this.isCreatedUid = false
									this.refreshCode(true)
								}, 2 * 60 * 1000)
								this.queryCodetimeID = null
								this.queryCodetimeID = (() => {
									let time = 3000
									return setInterval(() => {
										// console.log('定时查询', time, time / 3000, res.data)
										if (time > 2 * 60 * 1000) {
											clearInterval(this.queryCodetimeID)
										} else {
											time += 3000
											queryUid({
												uid: res.data
											}).then((res2) => {
												if (res2.code === 0) {
													clearInterval(this.queryCodetimeID)
													this.loginSuccess({
														username: 'yang',
														phone: '15197220396'
													})
												}
											})
										}
									}, 3000)
								})()
							}
						})
					}
				})
			},
			// 刷新二维码登录
			refreshCode(key) {
				if (!key) {
					if (!this.isCreatedUid) {
						console.log('创建二维码')
						this.createdCode()
					}
				} else {
					this.timeEnd = key
				}
			},
			//二维码登录
			changeCodeType() {
				if (!this.codeType) {
					this.refreshCode(false)
				}
				this.codeType = !this.codeType
			},
			// 手机验证码登录
			changeMobileType() {
				this.mobileType = !this.mobileType
			},
			// tab切换
			changeTab(key) {
				if (key === 1 && this.codeType) {
					this.refreshCode(false)
				}
				this.tabName = key
			},
			handleSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let data = {}
						if (formName === 'AccountForm') {
							data = {
								'username': this.AccountForm.username,
								'password': Base64.encode(this.AccountForm.password),
								type: 'Account'
							}
						} else {
							data = {
								'phone': this.MobileForm.phone,
								'code': this.MobileForm.code,
								type: 'Mobile'
							}
						}
						login(data).then((res) => {
							if (res.code === 0) {
								this.loginSuccess(res)
							} else {
								// 登录失败
								this.layer.msg(res.message)
							}
						})
					}
				})
			},
			loginSuccess(res) {
				// 登录成功
				let userInfo = {
					username: res.username,
					phone: res.phone
				}
				// 本地存储信息
				this.$store.dispatch('loginAction', userInfo)
				this.$store.dispatch('isLogin', true)
				this.$router.push({'path': this.$route.query.redirect ? this.$route.query.redirect : '/'})
			},
			sendCode() {
				console.log(this.timeID)
				if (this.timeID) {
					this.layer.msg(`请${this.times}s后重新发送！`)
				} else {
					this.timeID = (() => {
						return setInterval(() => {
							if (this.times <= 0) {
								this.sendText = `发送动态密码`
								clearInterval(this.timeID)
							} else {
								this.sendText = `重新发送(${this.times}s)`
								this.times--;
							}
						}, 1000)
					})()
				}
			},
			useqrcode(el, msg, callBack) {
				let canvas = document.getElementById(el)
				QRCode.toCanvas(canvas, msg, function (error) {
					callBack(error, canvas.getAttribute('width'))
				})
			}
		}
	}
</script>

<style lang="less">
	// 登录页
	.yl-theme-blue .yl-login {
		background: #Fff;
		height: 100%;
		.yl-login-contain {
			padding-top: 20rem;
		}

		.yl-login-main {
			position: relative;
			padding-top: 6rem;

			.yl-login-left {
				img {
					width: 30%;
				}
			}

			.yl-login-wrap {
				position: absolute;
				right: 0;
				top: 0;
				padding: 0 3.5rem 2rem 3.5rem;
				border: 1px solid #ddd;
				width: 32rem;
				/*height: 36.5rem;*/

				.yl-login-tab-head {
					text-align: center;

					div {
						//display: inline-block;
						padding: 1.5rem 0;
						//width: 32.7%;
						border-bottom: 1px solid #ccc;
						font-size: 1.4rem;
						cursor: pointer;

						&.active {
							color: @themeBlue;
							border-bottom: 2px solid @themeBlue;
						}
					}
				}

				.yl-login-tab {
					margin-top: 2.5rem;

					.yl-login-code-model {
						position: relative;
						margin: auto;
						//margin:1rem auto 1rem auto;
						//width:15rem;
						//height:15rem;
						img, canvas {
							width: 15rem;
							height: 15rem;
						}

						.bg-model {
							position: absolute;
							top: 0;
							/*width:15rem;*/
							/*height:15rem;*/
							left: 50%;
							transform: translateX(-50%);
							background: rgba(255, 255, 255, 0.7);
							cursor: default;

							i:nth-child(1) {
								font-size: 2.8rem;
								color: red;
								display: block;
								margin-top: 4rem;
							}
						}
					}

					a {
						color: #333;
					}

					.login-form {
						.ant-input {
							height: 3.5rem;
							border-radius: .2rem;
						}

						.has-error .ant-form-explain {
							display: none;
						}
					}

					.login-form-forgot {
						margin-bottom: 10px;
					}

					.login-form-button {
						width: 100%;
					}

					.other-login {
						i {
							cursor: default;
							font-size: 3rem;
							color: #ccc;
							display: inline-block;
							margin: .7rem 1.5rem;
						}
					}

					.codeSwitch {
						position: absolute;
						bottom: 0;
						right: 0;

						img {
							width: 7rem;
							height: 7rem;
						}
					}

					.send-btn{
						&:hover{
							color:#fff;
						}
					}
					.yl-login-code-icon {
						margin-top: 2rem;

						div {
							display: flex;
							justify-items: center;
							align-items: center;
							color: @projectBG;

							span {
								margin-left: .5rem;
								font-size: 1.6rem;
							}

							i {
								cursor: default;
								font-size: 2rem;
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		.yl-login {
			.yl-login-contain {
				padding-top: 0 !important;
			}

			.yl-login-wrap {
				position: static !important;
				width: calc(100% - 1rem) !important;
				padding: .5rem !important;
				border: none !important;
			}

			.yl-login-left {
				display: none;
			}

			.yl-login-main {
				padding: 2rem !important;
			}

			.codeSwitch {
				display: none;
			}
		}
	}
</style>
