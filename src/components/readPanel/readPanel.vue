<template>
    <div class="readPanel">
		<v-sideFromMenu :showBtn="showBtn">
			<span>{{title}}</span>
			<template v-for="(item,index) in readData">
				<span @click="getNovelSpce(index)" :class="[{'is-active':index=== num}]">第{{index+1}}章&nbsp;&nbsp;{{item.title}}</span>
			</template>
		</v-sideFromMenu>
		<div class="u-panel">
			<div class="u-panel-card novel-bg">
				<div class="novel-arc">
					<h3 class="novelTitle t-center">第{{num+1}}章&nbsp;&nbsp;{{arcTitle}}</h3>
					<div class="novelTxt" v-html="html">
					</div>
				</div>
			</div>
		</div>
		<div class="novelBtn">
			<el-button class="btn btn-success" @click="getNext('up')">上一章</el-button>
			<el-button class="btn btn-success" @click="back()">书架</el-button>
			<el-button class="btn btn-success" @click="getNext('down')">下一章</el-button>
		</div>
	</div>
</template>

<script>
    export default {
        name: "readPanel",
		props:['readData'],
		components:{
        	'v-sideFromMenu':(resolve)=>{require(['../aside/sideFromMenu'],resolve)}
		},
		data() {
			return {
				title: '',
				arcTitle: '',
				html: '',
				num: 0,
				isSlideMenu: false,
				isSlideMenuBlock: false,
				showBtn:true
			}
		},
		methods: {
			getNovelSpce(index) {
				this.$router.push({
					path: this.$route.path,
					query: {
						id: this.$route.query.id,
						num: index,
						title: this.title
					}
				})
			},
			getNext(str) {
				if (str === 'up' && this.num === 0) {
					this.layer.msg('已经是第1章啦！')
					return false
				}
				if (str === 'down' && this.num === this.readData.length - 1) {
					this.layer.msg('已经是最后一章啦！')
					return false
				}
				let index = str === 'up' ? this.num - 1 : this.num + 1
				this.getNovelSpce(index)
			},
			back() {
				this.$emit('back')
			}
		},
		created(){
			this.num = Number(this.$route.query.num)
			this.title = this.$route.query.title
			let txt = this.readData[this.num].txt
			this.arcTitle = this.readData[this.num].title
			this.html = ''
			for (let i = 0; i < txt.length; i++) {
				this.html += `<p style="margin-bottom:20px;">${txt[i]}</p>`
			}
		}
    }
</script>

<style scoped lang="less">
	.readPanel{
		.novel-bg{
			background:#f6f6ee;
		}
		.novel-arc{
			padding:25px;
			.novelTitle{
				margin:20px 0 30px 0;
			}
			.novelTxt{
				width:80%;
				margin:auto;
				font-size:18px;
				text-indent:1.5em;
			}
		}
		.novelBtn{
			position: fixed;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background: #ccc;
			bottom: 0;
		}
	}
	@media (max-width: 768px) {
		.novelTxt{
			width:100% !important;
		}
	}
</style>
