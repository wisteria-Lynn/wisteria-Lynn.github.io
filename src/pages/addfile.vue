<template>
	<div class="addNovel">
		<v-head-back-2 url="/novel"></v-head-back-2>
		<div class="all-wrap">
			<div class="tc" style="margin:40px 0;">
				<el-upload
					class="upload-demo"
					ref="goodImgUpload"
					action=""
					:file-list="goodImages"
					:auto-upload="false"
					:http-request="goodImgUploadFile"
					:before-upload="beforeImgUpload"
					:on-change='changeUpload'>
					<el-button size="small" type="primary">点击上传</el-button>
					<!--<div slot="trigger"><i class="el-icon-plus"></i></div>-->
					<!--<div slot="tip" class="el-upload__tip"></div>-->
				</el-upload>
			</div>
			<div>
				<label>选择添加类型</label>
				<br>
				<el-select
					v-model="addType"
					filterable
					allow-create
					default-first-option
					placeholder="选择添加类型">
					<el-option
						v-for="item in addTypeOpt"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<label>本地地址</label>
				<el-input v-model="localPath" placeholder="请输入内容"></el-input>
			</div>
			<div>
				<label>创建项目js地址</label>
				<br>
				<el-select
					v-model="createPath"
					filterable
					allow-create
					default-first-option
					placeholder="创建项目js地址">
					<el-option
						v-for="item in createPathOpt"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="selectValue"
					filterable
					allow-create
					default-first-option
					placeholder="创建项目js后缀数字">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<label>作者</label>
				<el-input v-model="book.author"
						  readonly
						  placeholder="请输入内容"></el-input>
			</div>
			<div>
				<label>字数(万字)</label>
				<el-input v-model="book.wordNum"
						  type="number"
						  placeholder="字数"></el-input>
			</div>
			<div>
				<label>评分（1-5）</label>
				<el-select
					v-model="book.rate"
					filterable
					allow-create
					default-first-option
					placeholder="评分">
					<el-option
						v-for="item in 5"
						:key="item"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
			</div>
			<div>
				<label>是否免费</label>
				<el-input  v-model="book.free"
						  readonly
						  placeholder="请输入内容"></el-input>
			</div>
			<div>
				<label>文章类型</label>
				<el-select
					v-model="book.type"
					filterable
					allow-create
					default-first-option
					placeholder="文章类型">
					<el-option
						v-for="item in typeList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<label>文章状态</label>
				<el-select
					v-model="book.class"
					filterable
					allow-create
					default-first-option
					placeholder="文章类型">
					<el-option
						v-for="item in classList"
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
						  v-model="book.des"
						  placeholder="请输入内容"></el-input>
			</div>
			<el-button @click="submit" class="btn btn-success">&nbsp;添加&nbsp;</el-button>
		</div>
	</div>
</template>

<script>
	// import {checkImg} from "../../util/valide"
	import {getReadFile} from "../api/user"
	let path = 'D:\\Lynn\\myproject\\wisteria-Lynn.github.io\\src\\novel\\novel-'
	export default {
		name: "addNovel",
		data() {
			return {
				goodImages:[],
				filename:'',
				createPathOpt:[
					{
						value:path,
						label:path
					}
				],
				createPath:path,
				selectValue:'',
				localPath:'C:\\Users\\F1333103\\Desktop\\新建文件夹\\',
				book:{
					author:'流莹离',
					type:'古代言情',
					free:'免费',
					class:'已完结',
					wordNum:'90',
					rate:3,
					des:''
				},
				typeList:[
					{
						value:'古代言情',
						label:'古代言情'
					},
					{
						value:'现代言情',
						label:'现代言情'
					}
				],
				classList:[
					{
						value:'连载中',
						label:'连载中'
					},
					{
						value:'已完结',
						label:'已完结'
					}
				],
				options:[],
				novelList:[],
				addType:'0',
				addTypeOpt:[
					{
						value:'0',
						label:'小说'
					}
				]
			}
		},
		created(){
			this.novelList = require('../novel/novel-list').novelList
			for(let i = 0;i<this.novelList.length;i++){
				this.options.push({
					label:String(this.novelList[i].id)+this.novelList[i].title,
					value:this.novelList[i].id
				})
			}
		},
		methods: {
			// 重写产品主图上传
			goodImgUploadFile(file) {
				this.filename = file.file.name
				if(this.addType === '0'){
					getReadFile({
						path:this.localPath + this.filename,
						createPath:JSON.stringify(this.createPath),
						book:{
							id: this.selectValue,
							title: this.filename.split('.')[0],
							author: this.book.author,
							type: this.book.type,
							free: this.book.free,
							class: this.book.class,
							wordNum: this.book.wordNum,
							rate: this.book.rate,
							des: this.book.des
						}
					}).then((res)=>{
						// this.getNovelList()
						this.novelList = require('../novel/novel-list').novelList
						console.log(res)
					})
				}
				// this.formDate.append('goodImages', file.file)
			},
			changeUpload(file){
				console.log(file)
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
				if(!this.addType){
					this.layer.msg('选择类型')
					return false
				}
				if(!this.selectValue){
					this.layer.msg('选择文章标签')
					return false
				}
				this.$refs.goodImgUpload.submit()
			}
		}
	}

</script>

<style scoped>

</style>
