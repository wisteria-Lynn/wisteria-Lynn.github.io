<template>
	<div class="addNovel">
		<header-one></header-one>
		<div class="t-center" style="margin:40px 0;">
			<el-upload
				class="upload-demo"
				ref="goodImgUpload"
				action=""
				:file-list="goodImages"
				:auto-upload="false"
				:http-request="goodImgUploadFile"
				:before-upload="beforeImgUpload">
				<el-button size="small" type="primary">点击上传</el-button>
				<!--<div slot="trigger"><i class="el-icon-plus"></i></div>-->
				<!--<div slot="tip" class="el-upload__tip"></div>-->
			</el-upload>
		</div>
		<div>
			<label>文章本地地址</label>
			<el-input v-model="localPath" placeholder="请输入内容"></el-input>
		</div>
		<div>
			<label>创建项目js地址</label>
			<el-input v-model="createPath" readonly placeholder="请输入内容"></el-input>
			<el-select
				v-model="selectValue"
				filterable
				allow-create
				default-first-option
				placeholder="请选择文章标签">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</div>
		<div>
			<label>简介</label>
			<el-input type="textarea"
					  :rows="2"
					  v-model="descr"
					  placeholder="请输入内容"></el-input>
		</div>
		<el-button @click="submit" class="btn btn-success">&nbsp;添加&nbsp;</el-button>
	</div>
</template>

<script>
	// import {checkImg} from "../../util/valide"
	import {getReadFile} from "../api/user"
	export default {
		name: "addNovel",
		data() {
			return {
				goodImages:[],
				filename:'',
				createPath:'D:\\Lynn\\myproject\\wisteria-Lynn.github.io\\static\\js\\novel\\novel-',
				selectValue:'1001',
				localPath:'C:\\Users\\F1333103\\Desktop\\新建文件夹\\',
				descr:'',
				options:[],
				novelList:[]
			}
		},
		created(){
			this.getNovelList()
		},
		methods: {
			// 重写产品主图上传
			goodImgUploadFile(file) {
				this.filename = file.file.name
				if(!this.localPath){
					this.layer.msg('填写完整信息')
					return false
				}
				getReadFile({
					path:this.localPath + this.filename,
					selectValue:this.selectValue,
					name:this.filename.split('.')[0],
					descr:this.descr
				}).then((res)=>{
					this.getNovelList()
					console.log(res)
				})
				// this.formDate.append('goodImages', file.file)
			},
			// 上传图片凭证之前的钩子
			async beforeImgUpload(file) {
				// 允许的图片类型
				// let type = ['image/jpeg', 'image/jpg', 'image/png']
				// 检查图片 图片文件/图片需求大小/图片需求类型/回调函数
				// await checkImg(file, 2, type, (message) => {
				// 	this.$message.error(message);
				// })
			},
			// uploadFile() {
			// 	// this.formDate = new FormData()
			// 	// 提交图片
			// 	this.$refs.goodImgUpload.submit()
			// },
			submit(){
				this.$refs.goodImgUpload.submit()
			},
			getNovelList(){
				this.novelList = require('../../static/js/novel/novel-list').novelList
				for(let i = 0;i<this.novelList.length;i++){
					this.options.push({
						label:String(this.novelList[i].id),
						value:this.novelList[i].id
					})
				}
			}
		}
	}

</script>

<style scoped>

</style>
