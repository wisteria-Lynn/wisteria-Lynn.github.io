<!--裁剪组件-->
<template>
	<el-dialog id="cropper_dialog" custom-class="form-dialog" title="裁剪图片"
			   :showClose="false"
			   :closeOnClickModal="false"
			   :closeOnPressEscape="false"
			   :visible.sync="cropperOptions.dialogVisible">
		<div class="dialog-body">
			<div class="cropper" style="text-align:center">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="option.info"
					:full="option.full"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:original="option.original"
					:autoCrop="option.autoCrop"
					:fixed="option.fixed"
					:fixedNumber="option.fixedNumber"
					:centerBox="option.centerBox"
					:infoTrue="option.infoTrue"
					:fixedBox="option.fixedBox"
				></vueCropper>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="reset" :disabled="!isReset">恢复原图</el-button>
			<el-button @click="startCut" v-show="!isClipping">开始裁剪</el-button>
			<el-button @click="cut" v-show="isClipping">确认裁剪</el-button>
			<el-button @click="submit" :disabled="isClipping||!isComfire">确定</el-button>
			<el-button @click="out">退出</el-button>
		</div>
	</el-dialog>
</template>

<script>
	/**
	 * 注意
	 * 1.type为头像'avatar'时，进入组件就是裁剪状态，1：1裁剪为正方形
	 * 2.cropperOptions中的img属性，为file或blob类型
	 * 3.所截取的图是blob类型，最后转为file类型确认提交
	 * 4.cropperOptions中的dialogVisible属性控制弹窗显示
	 */
	import {VueCropper} from 'vue-cropper'

	export default {
		name: "cropperMode",
		components: {
			VueCropper
		},
		props: {
			type: {
				type: String,
				default: ''
			},
			cropperOptions: {
				type: Object,
				required: true,
				default: function () {
					return {}
				}
			}
		},
		// props:['type','cropperOptions'],
		data() {
			return {
				// 原图
				originalGraph: '',
				// 裁剪之后的文件
				cropperFile: '',
				// 是否需要恢复原图
				isReset: false,
				// 是否需要确定按钮
				isComfire: false,
				// 是否正在裁剪
				isClipping: false,
				// 裁剪组件的基础配置option
				option: {
					img: '', // 裁剪图片的地址
					info: true, // 裁剪框的大小信息
					outputSize: 0.8, // 裁剪生成图片的质量
					outputType: 'jpg', // 裁剪生成图片的格式
					canScale: false, // 图片是否允许滚轮缩放
					// autoCrop: true, // 是否默认生成截图框
					autoCropWidth: 10, // 默认生成截图框宽度
					autoCropHeight: 10, // 默认生成截图框高度
					// fixedBox: true, // 固定截图框大小 不允许改变
					// fixed: true, // 是否开启截图框宽高固定比例
					// fixedNumber: [1,1], // 截图框的宽高比例
					// full: false, // 是否输出原图比例的截图
					canMoveBox: true, // 截图框能否拖动
					original: true, // 上传图片按照原始比例渲染
					centerBox: true, // 截图框是否被限制在图片里面
					infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
				},
			}
		},
		mounted() {
			if (!this.cropperOptions.img) {
				this.$message.error('请传入图片！')
				return
			}
			// 设定原图 - 传入的类型，需要转换成url格式
			let type = Object.prototype.toString.call(this.cropperOptions.img)
			console.log(type)
			if (type === '[object File]' || type === '[object Blob]') {
				this.originalGraph = window.URL.createObjectURL(this.cropperOptions.img)
			} else if (type === '[object String]') {
				if (this.cropperOptions.img.split(',')[0].indexOf('base') > -1) {
					this.originalGraph = window.URL.createObjectURL(this.dataURLtoBlob(this.cropperOptions.img))
				} else {
					this.out()
					this.$message.error('请传入file|blob|base64图片！')
					return
				}
			} else {
				this.out()
				this.$message.error('请传入file|blob|base64图片！')
				return
			}
			// 初始化选项
			let initdata = {
				info: true, // 裁剪框的大小信息
				outputSize: 0.8, // 裁剪生成图片的质量
				outputType: 'jpg', // 裁剪生成图片的格式
				canScale: false, // 图片是否允许滚轮缩放
				autoCropWidth: 10, // 默认生成截图框宽度
				autoCropHeight: 10, // 默认生成截图框高度
				fixedBox: false, // 固定截图框大小 不允许改变
				full: false, // 是否输出原图比例的截图
				canMoveBox: true, // 截图框能否拖动
				original: true, // 上传图片按照原始比例渲染
				centerBox: true, // 截图框是否被限制在图片里面
				infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
			}
			let dataOption = {}
			if (this.type === 'avatar') {
				dataOption = {
					autoCrop: true, // 是否默认生成截图框
					fixed: true, // 是否开启截图框宽高固定比例
					fixedNumber: [1, 1], // 截图框的宽高比例
				}
				this.isClipping = true
				this.isReset = false
				this.isComfire = false
			} else {
				dataOption = {
					autoCrop: false, // 是否默认生成截图框
					fixed: false, // 是否开启截图框宽高固定比例
				}
			}
			this.option = Object.assign(initdata, dataOption, this.cropperOptions)
			this.option.img = this.originalGraph
			console.log(this.option)
		},
		methods: {
			// 开始裁剪
			startCut() {
				this.isClipping = true
				this.option.autoCrop = true
			},
			// 确定截图
			cut() {
				this.isReset = true
				this.isComfire = true
				this.$refs.cropper.getCropBlob((data) => {
					this.option.autoCrop = false
					this.isClipping = false
					// 截取的图片是Blob格式，需要转换成file
					this.cropperFile = new window.File([data], this.cropperOptions.img.name, {type: data.type})
					this.option.img = window.URL.createObjectURL(data)
				})
			},
			// 提交确认的截图至父组件
			submit() {
				if (this.cropperFile === '') {
					this.$message.error('请裁剪之后再确认！')
					return
				}
				this.$emit('submit', this.cropperFile)
			},
			// 退出
			out() {
				this.$emit('out')
			},
			// 重置
			reset() {
				this.isReset = false
				this.isComfire = false
				this.isClipping = false
				this.option.autoCrop = false
				this.option.img = this.originalGraph
			},
			dataURLtoBlob(dataurl) {
				var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {type: mime});
			}
		}
	}
</script>
<style lang="less">
	#cropper_dialog .form-dialog {
		/*width:90% !important;*/

		.dialog-body {
			position: absolute !important;
			width: 100% !important;
			height: 100% !important;
			margin: 0 !important;
		}

		.dialog-footer {
			padding: 10px 20px 20px !important;
		}

	}

	#cropper_dialog .el-dialog {
		width: 90% !important;
		height: 90% !important;
		margin: auto !important;
		top: 50%;
		transform: translate(0, -50%);
	}

	#cropper_dialog .el-dialog__body {
		position: absolute;
		width: 90% !important;
		height: 80% !important;
		top: 55%;
		left: 50%;
		padding: 0 !important;
		margin: auto !important;
		transform: translate(-50%, -50%);
	}
</style>
<style scoped lang="less">

	/*.vue-cropper {*/
	/*!*background-image: none !important;*!*/
	/*}*/
	// 截图
	.cropper {
		height: 100%;
		/*height: 400px;*/
	}
</style>
