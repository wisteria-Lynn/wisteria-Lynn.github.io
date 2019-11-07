<template>
	<div class="novelDetail">
		<v-head-back-2 url="/novel"></v-head-back-2>
		<div class="all-wrap">
			<v-panel-one>
				<div class="forwad-img tc">小说</div>
				<div class="detail-right">
					<h4>{{readData.title}}</h4>
					<p style="color:#999;">{{readData.author}}</p>
					<p><span>{{readData.type}}</span><span>{{readData.free}}</span><span>{{readData.wordNum}}万字</span></p>
					<el-rate
						v-model="readData.rate"
						disabled
						show-score
						text-color="#ff9900">
					</el-rate>
				</div>
				<div style="clear: both"></div>
				<div class="read-des" v-html="readData.des"></div>
				<div>
					<span class="readBtn tc cursor-p" @click="read">阅读</span>
					<span class="readBtn tc cursor-p disabled" >缓存</span>
				</div>
				<div style="margin-top: 5px;font-size: 12px;">加载慢，请耐心等待</div>
			</v-panel-one>
			<v-panel-one>
				<el-row class="detail-menu">
					<el-col :span="12">
						<i class="iconfont icon1"></i>
						<span style="margin-left:5px;">目录</span>
					</el-col>
					<el-col :span="12" class="tr">
						<span>{{readData.class}}至{{readData.section}}章</span>
					</el-col>
				</el-row>
			</v-panel-one>
			<v-remark :remark="remark" style="margin-bottom:70px;"></v-remark>
		</div>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		name: "novelDetail",
		props: ['novel'],
		components:{
			'v-remark':(resolve)=>{require(['../../components/panel/remark'],resolve)},
		},
		data() {
			return {
				readData:{
					id:'1003',
					title:'解语歌',
					author:'流莹离',
					type:'古代言情',
					free:'免费',
					class:'连载',
					wordNum:'90',
					section:'55',
					rate:3.5,
					des:'简介'
				},
				remark:{
					title:'精彩书评',
					list:[{
						name:this.$store.state.USER.username||'流莹离',
						avatar:this.GLOBAL.avatar,
						remark:'hello 您好！'
					}]
				},
			}
		},
		created(){
			this.readData = this.novel[this.$route.query.index]
		},
		methods: {
			read(){
				// this.$loading({
				// 	lock: true,
				// 	text: 'Loading',
				// 	spinner: 'el-icon-loading',
				// 	background: 'rgba(0, 0, 0, 0.7)'
				// });
				this.$router.push({
					path: '/novel/novelRead',
					query: {
						id: this.readData.id,
						num: '0',
						title: this.readData.title
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.forwad-img {
		float:left;
		width: 90px;
		height: 110px;
		line-height: 120px;
		color: #fff;
		background: #749dd0;
	}
	.detail-right{
		float:left;
		margin-left: 20px;
		h4{
			margin-bottom:8px;
		}
		p{
			margin-bottom:8px;
			font-size:12px;
			span{
				margin-right:10px;
			}
		}
	}
	.detail-menu{
		line-height: 30px;
		i{
			font-size:18px;
		}
		.tr{
			span{
				color:#999;
				font-size:14px;
			}
		}
	}
	.read-des{
		font-size:14px;
		margin-top:20px;
	}
	.readBtn{
		line-height: 35px;
		color: #fff;
		background: #f49110;
		display: inline-block;
		width:120px;
		border-radius: 4px;
		margin-top: 30px;
	}
	.disabled{
		color:#fff;
		background:#ccc;
		cursor: no-drop;
	}
	@media (max-width: 768px) {
		.readBtn{
			width: 49% !important;
		}
	}
</style>
