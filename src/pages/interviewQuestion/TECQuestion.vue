<template>
    <div class="TECQuestion">
		<v-sideFromMenu :showBtn="showBtn">
			<!--<template v-for="(item,index) in quesList">-->
			<!--<span @click="getQuestion(index)" :class="[{'is-active':index=== num}]">第{{index+1}}题&nbsp;&nbsp;{{item.title}}</span>-->
			<!--</template>-->
		</v-sideFromMenu>
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item :name="index" v-for="(item,index) in quesList" :key="index" :title="(index+1) + '.' + item.title">
				<span class="hrq-ans" v-for="(item2,index2) in item.txt" :key="index2" v-html="item2"></span>
			</el-collapse-item>
		</el-collapse>
		<div class="ques-type t-center">
			<el-row>
				<el-col :span="6" :class="[quesType === item.value?'active':'']"
						v-for="(item,index) in quesTypeList" :key="index"
						@click.native="typeChange(item.value)">
					{{item.name}}
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
    export default {
        name: "TECQuestion",
		components:{
			'v-sideFromMenu':(resolve)=>{require(['../../components/aside/sideFromMenu'],resolve)}
		},
		data(){
        	return{
				activeNames: ['1'],
				showBtn:true,
				quesType:'vue',
				quesTypeList:[
					{
						name:'vue',
						value:'vue'
					},
					{
						name:'js',
						value:'js'
					},
					{
						name:'css',
						value:'css'
					},
					{
						name:'其他',
						value:'html'
					}
				],
				quesList:[]
			}
		},
		methods:{
			typeChange(index){
				this.quesType = index
				this.quesList = require('../../../static/js/interviewQuestion/TCEQuestion-'+index+'.js').qustion
			},
			handleChange(val) {
				// console.log(val);
			}
		},
		created(){
			this.typeChange('vue')
		}
    }
</script>
<style lang="less">
	.TECQuestion{
		.el-collapse-item__header,.el-collapse-item__content{
			padding-left:20px;
		}
	}
</style>
<style scoped lang="less">
	.ques-type {
		line-height: 40px;
		color: #333;
		background: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		.active {
			background: #246dff;
			color: #fff;
		}
	}
	.hrq-card{
		padding:10px 20px;
		span{
			display: inline-block;
		}
		span.hrq-ans{
			margin-top:15px;
		}
		.collapse-item{
			span{
				margin-top:10px;
				color:#ccc;
				font-size:12px;
			}
		}
	}
</style>
