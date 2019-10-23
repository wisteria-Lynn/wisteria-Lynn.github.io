<template>
    <div class="x-cropper">
		{{cropperStore}}
		<el-upload action=""
				   list-type="picture-card"
				   :auto-upload="false"
				   :on-preview="preview"
				   :on-change='changeUpload'>
			<i class="el-icon-upload"></i>
		</el-upload>
		<img v-if="cropperStore.cropperImg !== ''" :src="cropperStore.cropperImg">
	</div>
</template>

<script>
    export default {
        name: "cropper",
		data() {
			return {
				dialogVisible: false,
				imgUrl:'',
				picsList: [],  //页面显示的数组
			}
		},
		computed: {
			cropperStore() {
				return this.$store.state.CROPPER
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
					this.imgUrl = window.URL.createObjectURL(file.raw)
					// this.option.img = file.url
					// console.log(this.imgUrl)
				})
			},
			preview(){
				this.$store.dispatch('cropperAction', {
					viewerShow:true,
					cropperShow:false,
					imgUrl:[this.imgUrl],
					cropperImg:''
				})
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
