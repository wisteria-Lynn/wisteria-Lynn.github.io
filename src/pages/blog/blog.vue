<!--项目首页-->
<template>
	<div class="blog">
		<headerOne></headerOne>
		<el-row>
			<el-col class="aside" :sm="24" :md="7" :lg="5">
				<v-side :sideData="sideData" type="click" @clickItem="clickSideItem" @addBolg="addBlog"></v-side>
			</el-col>
			<el-col class="container" :sm="24" :md="17" :lg="19">
				<div class="container-wrap">
					<div v-if="!isEdit">
						<el-row style="margin-bottom:20px;font-size:.875rem;font-weight: 700;">我的博客</el-row>
						<div class="blog-wrap">
							<div class="blog-title">{{artile.title}}</div>
							<div class="blog-time">{{artile.timestamp|dateFilter}}</div>
							<div class="blog-content">
								{{artile.content}}
							</div>
						</div>
					</div>
					<div v-else>
						<el-row style="margin-bottom:20px;font-size:.875rem;font-weight: 700;">新增博客</el-row>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import { getBlogList, getBlogRemarkList} from '../../api/user'
	import { codeText } from '../../api/api'

	export default {
		name: 'blog',
		data() {
			return {
				// 文章
				artile:{
					// 文章 - 标题
					title:'',
					// 文章 - 内容
					content:'',
					// 文章 - 评论
					remark:[],
					// 文章 - 时间
					timestamp:'',
				},
				// 左侧 数据
				sideData: [{
					title: '我的文章',
					itemArray: []
				}],
				// 是否在编辑
				isEdit:false,
			}
		},
		methods:{
			// 左侧卡片点击事件
			clickSideItem(item){
				// 改变编辑状态
				this.isEdit = false
				// 改变文章
				this.artile = {
					title : item.title,
					content : item.content,
					timestamp: item.timestamp
				}
				// 根据文章id获取该文章评论
				this.getBlogRemarkList(item.id)
			},
			// 获取博客文章列表
			getBlogList(){
				getBlogList().then((res)=>{
					if (res.code === 0) {
						this.sideData[0].itemArray = res.data
					}else{
						this.layer.msg(codeText(res.code,res.message))
					}
				})
			},
			// 获取博客评论
			getBlogRemarkList(titleid){
				getBlogRemarkList({
					blogtitleid:titleid
				}).then((res)=>{
					if (res.code === 0) {
						this.artile.remark = res.data
					}else{
						this.layer.msg(codeText(res.code,res.message))
					}
				})
			},
			// 新增博客
			addBlog(){
				this.isEdit = true
			}
		},
		created(){
			this.getBlogList()
		}
	}
</script>
<style lang="less">
	.blog {
		.aside, .container {
			margin-top: 2rem;
		}

		.container {
			padding: 0 10px 10px 10px;

			.container-wrap {
				/*margin-left:2rem;*/
				padding: 1rem;
				background: @mainBG;
				box-shadow: 0 2px 4px 0 @topShawC;
			}
		}
	}
</style>
