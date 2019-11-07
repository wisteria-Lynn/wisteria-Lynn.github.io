<template>
    <div class="x-cropper">
		<el-upload action=""
				   list-type="picture-card"
				   :auto-upload="false"
				   :on-preview="preview"
				   :on-change='changeUpload'>
			<i class="el-icon-upload"></i>
		</el-upload>
		<img :src="avatarImageUrl">
		<v-cropper v-if="cropperShow"
				   :cropperOptions="cropperOptions"
				   @out="outCropper"
				   @submit="getCropperImage"
				   type="avatar"></v-cropper>
		<div v-viewer="viewerOptions" class="viewerShow">
			<img class="head-picImg" :src="imgurl">
		</div>
	</div>
</template>

<script>
	import cropper from '../../../components/cropper/cropperMode'
    export default {
        name: "cropper",
		components: {
			'v-cropper': cropper
		},
		data() {
			return {
				// 裁剪组件是否显示
				cropperShow: false,
				// 裁剪组件的选项
				cropperOptions: {
					dialogVisible:false,
					img: ""
				},
				// 裁剪过后返回的文件
				cropperFile:'',
				viewerOptions:{
					toolbar: true,
					url: 'data-source'
				},
				dialogVisible: false,
				avatarImageUrl:'',
				imgurl:'',
				picsList: [],  //页面显示的数组
			}
		},
		methods:{
			// 上传按钮   限制图片大小
			changeUpload(file, fileList) {
				// const isLt5M = file.size / 1024 / 1024 < 5
				// if (!isLt5M) {
				// 	this.$message.error('上传文件大小不能超过 5MB!')
				// 	return false
				// }
				// this.fileinfo = file
				// console.log(file)
				// console.log(typeof file)
				// 上传成功后将图片地址赋值给裁剪框显示图片
				this.$nextTick(() => {
					this.cropperOptions = {
						dialogVisible:true,
						img:file.raw
					}
					this.cropperShow = true
					// this.avatarImageUrl = window.URL.createObjectURL(file.raw)
					// this.option.img = file.url
					// console.log(this.imgUrl)
				})
			},
			preview(){
				const viewer = this.$el.querySelector('.images').$viewer
				viewer.show()
			},
			// 退出裁剪
			outCropper(){
				this.cropperShow = false
				this.cropperOptions = {
					dialogVisible:false,
					img:''
				}
			},
			// 确认裁剪
			getCropperImage(e) {
				console.log('裁剪确定按钮')
				this.cropperFile = e
				this.avatarImageUrl = window.URL.createObjectURL(e)
				this.cropperShow = false
				this.cropperOptions = {
					dialogVisible:false,
					img:''
				}
			},
			// 点击裁剪，这一步是可以拿到处理后的地址
			// finish() {
			// 	this.$refs.cropper.getCropBlob((data) => {
			// 		var fileName = 'goods' + this.fileinfo.uid
			// 		// this.loading = true
			// 		console.log(data)
			// 		console.log(window.URL.createObjectURL(data))
			// 		this.imgurl = window.URL.createObjectURL(data)
			// 		this.dialogVisible = false
			// 		//上传阿里云服务器
			// 		// client().put(fileName, data).then(result => {
			// 		// 	this.dialogVisible = false
			// 		// 	this.picsList.push(result.url)
			// 		// }).catch(err => {
			// 		// 	console.log(err)
			// 		// 	this.loading = false
			// 		// })
			// 	})
			// }
		}
    }
</script>

<style scoped lang="less">
	// 截图
	.cropper-content {
		.cropper {
			width: auto;
			height: 300px;
		}
	}
</style>
