<template>
	<div class="cropperMode" v-if="cropperStore.cropperShow">
		<div class="cropper-wrap">
			<div class="cropper-content">
				<div class="cropper" style="text-align:center">
					<vueCropper
						ref="cropper"
						:img="option.img"
						:outputSize="option.size"
						:outputType="option.outputType"
						:info="true"
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
		</div>
		<div class="cropper-foot">
			<span @click="reset">恢复原图</span>
			<span @click="cut">裁剪</span>
			<span @click="submit">确定</span>
			<span @click="out">退出</span>
		</div>
	</div>
</template>

<script>
	import {VueCropper} from 'vue-cropper'

	export default {
		name: "cropperMode",
		components: {
			VueCropper
		},
		computed: {
			cropperStore() {
				return this.$store.state.CROPPER
			},
			img(){
				return this.$store.state.CROPPER.imgUrl[0]
			}
		},
		watch:{
			img(newV,oldV){
				this.option.img = newV
			}
		},
		data() {
			return {
				// 裁剪组件的基础配置option
				option: {
					img: '', // 裁剪图片的地址
					info: true, // 裁剪框的大小信息
					outputSize: 0.8, // 裁剪生成图片的质量
					outputType: 'jpeg', // 裁剪生成图片的格式
					canScale: false, // 图片是否允许滚轮缩放
					autoCrop: true, // 是否默认生成截图框
					// autoCropWidth: 300, // 默认生成截图框宽度
					// autoCropHeight: 200, // 默认生成截图框高度
					fixedBox: false, // 固定截图框大小 不允许改变
					fixed: false, // 是否开启截图框宽高固定比例
					fixedNumber: [7, 5], // 截图框的宽高比例
					full: false, // 是否输出原图比例的截图
					canMoveBox: true, // 截图框能否拖动
					original: true, // 上传图片按照原始比例渲染
					centerBox: true, // 截图框是否被限制在图片里面
					infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
				},
			}
		},
		methods:{
			cut(){
				this.$refs.cropper.getCropBlob((data) => {
					this.option.img = window.URL.createObjectURL(data)
				})
			},
			submit(){
				this.$store.dispatch('cropperAction', {
					viewerShow:false,
					cropperShow:false,
					imgUrl:[],
					cropperImg:this.option.img
				})
			},
			out(){
				this.$store.dispatch('cropperAction', {
					viewerShow:false,
					cropperShow:false,
					imgUrl:[],
					cropperImg:''
				})
			},
			reset(){
				this.option.img = this.img
			}
		}
	}
</script>
<style scoped lang="less">
	.vue-cropper {
		background-image: none;
	}

	.cropper-wrap {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1200;
		background: rgba(0, 0, 0, 0.6)
	}

	// 截图
	.cropper-content {
		width: 100%;
		height: 100%;

		.cropper {
			width: auto;
			height: 100%;
		}
	}
	.cropper-foot{
		position: fixed;
		display: inline-block;
		top: 20px;
		right: 20px;
		color: #Fff;
		height: 24px;
		z-index: 1400;
		/**/
		span{
			display:inline-block;
			background: #1e1e1e;
			padding: 5px 10px;
			border-radius: 4px;
			cursor: pointer;
		}
	}
</style>
