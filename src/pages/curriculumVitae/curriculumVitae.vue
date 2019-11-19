<template>
    <div class="curriculumVitae">
		<!--<v-head-back-2 url="/"></v-head-back-2>-->
		<div class="u-panel">
			<div class="u-panel-card cv-card aurtavet-card tc">
				<img class="at-img" :src="info.img">
				<h3>{{info.name}}</h3>
			</div>
			<div class="u-panel-card cv-card">
				<h4>基本信息</h4>
				<el-row class="cv-content">
					<el-col>电话：{{info.phone}}</el-col>
					<el-col>工作年限：{{info.workyear}}年</el-col>
					<el-col>邮箱：{{info.email}}</el-col>
					<el-col>年龄：{{info.age}}岁</el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>教育背景</h4>
				<el-row class="cv-content">
					<el-col>{{info.EducationBackground.time}}</el-col>
					<el-col>{{info.EducationBackground.school}} | {{info.EducationBackground.education}} | {{info.EducationBackground.Skill}}</el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>求职意向</h4>
				<el-row class="cv-content">
					<el-col>{{info.JobIntension}}</el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>专业技能</h4>
				<el-row class="cv-content">
					<el-col v-html="enterTxt(info.personalSkill)"></el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>工作经历</h4>
				<el-row class="cv-content">
					<el-col v-for="(item,index) in info.WorkExperience" :key="index">
						<h5>{{item.time}}</h5>
						<span>{{item.work}}</span>
					</el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>项目经验</h4>
			</div>
			<div class="u-panel-card cv-card" v-for="(item,index) in info.ProjectExperiences" :key="index">
				<el-row class="cv-content">
					<el-col>
						<h4 v-html="item.title"></h4>
						<span>{{item.desc}}</span>
						<div class="proExper" v-html="enterTxt(item.work)"></div>
					</el-col>
				</el-row>
			</div>
			<div class="u-panel-card cv-card">
				<h4>自我评价</h4>
				<el-row class="cv-content myIntro">
					<span v-for="(item,index) in info.personalIntro" :key="index">{{item}}</span>
				</el-row>
			</div>
			<div class="u-panel-card cv-card tc">
				<el-row class="cv-content">
					<h3>谢谢！</h3>
				</el-row>
			</div>
			<div class="u-panel-card cv-card tc">
				<a class="btn btn-success download" download="阳仁-web前端-15197220396.pdf" href="https://wisteria-lynn.github.io/dist/static/file/阳仁-web前端-15197220396.pdf">下载简历</a>
				<span style="font-size:12px;">微信浏览器不支持下载</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { throttle, Scroll,dom } from '@/util/handleDOM'
    export default {
        name: "curriculumVitae",
		data(){
        	return {
				cvCard:[],
				info:{
					img:require('../../assets/img/curriculumVitae/work.jpg'),
					name:'阳仁',
					age:'24',
					workyear:'2',
					phone:'15197220396',
					email:'wisteria_lin@sina.com',
					EducationBackground:{
						time:'2013.09-2017.06​',
						education:'本科',
						school:'湖南科技大学',
						Skill:'物联网工程',
					},
					JobIntension:'web前端 | 薪资面议 | 月内到岗',
					personalSkill:'（1）精通页面布局，熟悉HTML5技术/CSS3样式，可熟练使用less进行开发。\n' +
						'（2）掌握JavaScript语言，熟悉 ES6语法。\n' +
						'（3）掌握Vue技术栈、可快速使用Vue全家桶开发项目。\n' +
						'（4）掌握ElementUI等UI框架，熟悉photoshop，具备一定的图片处理能力。\n' +
						'（5）掌握webpack自动化构建工具，熟悉模块化，熟练使用git开发工具。\n' +
						'（6）对node.js有一定的了解。\n' +
						'（7）熟悉微信公众号开发，对小程序有一定的了解。',
					WorkExperience:[
						{
							time:'2017.07-至今',
							work:'富士康工业互联网股份有限公司 | 平台解决方案事业处 | 前端开发'
						}
					],
					ProjectExperiences:[
						{
							title:'项目一：Fiicloud业务支撑系统(<a href="http://www.fii-icloud.com">http://www.fii-icloud.com</a>)（PC端）',
							desc:'一个主推工业应用的商城，方便制造企业使用工业应用/工业微服务的平台，提供运营商入驻、产品上下架管理、计费及结算系统、营业与账务系统。使用vue2+webpack1+elementUI+ajax等技术搭建。',
							work:'1.充分理解产品需求及流程，确定页面设计与开发方案，参与需求及测试评审。与UI设计/后端开发紧密配合，完成设计需求。\n' +
								'2.合并内外网代码，整理代码，将代码结构规范化，功能模块化，页面组件化。\n' +
								'3.维护现有网站，完善/重构前期功能页面，修复前期遗留BUG。\n' +
								'4.开发积分充值/余额充值/积分明细/优惠券/密码支付等新功能。\n' +
								'5.开发积分/余额/优惠券支付通道。'
						},{
							title:'项目二：影像智能平台系统/影像数据内容管理系统（PC端）',
							desc:'一个主要管理各大厂区摄像头的系统，用户可分权限查看本厂区监控录像。前端系统采用JQuery+node.js框架，后台管理系统重构后，采用Vue2+webpack3+elementUI+axios搭建。',
							work:'1.开发条码扫描新模块，通过ajax调取接口，分页展示所有条码，展示当前条码的产品图片/位置/标记信息，并将遗漏错漏的条码高亮显示。\n' +
								'2.开发后台管理的国际化功能。\n' +
								'3.后台摄像头管理的转流录制的websocket对接。 \n' +
								'4.维护网站功能，修复前期BUG。'
						},{
							title:'项目三：FII问卷调查系统（移动端）',
							desc:'一个基于微信扫码使用的问卷答题系统，用于分析企业的需求及痛点。使用vue2+webpack3+axios+cube-ui等技术搭建。',
							work:'1.项目搭建，页面基础布局，手机号登陆/对接微信登陆（借助微信公众号）。\n' +
								'2.根据用户答题结果，运用echart技术生成图表，使用html2Canvas技术生成图片，a标签链接下载保存图片。\n' +
								'3.随机生成6个推荐应用，并记录该用户点击次数。\n' +
								'4.使用渐进式+懒加载技术，展示应用页面的图片。'
						}
					],
					personalIntro:[
						"自学能力强","能接受并主动学习新的知识",'具备独立分析和解决问题的能力',
						'有较强的逻辑分析','具有良好的团队合作精神和沟通能力','有强烈的责任心'
					]
				},
			}
		},
		methods: {
			previewImg(){
				for(let i = 0 ; i < this.cvCard.length ; i++){
					if(this.cvCard[i].offsetTop - Scroll.scrollTop() - 82 - (i+1)*40< this.viewHeight){
						if(!dom.hasClass(this.cvCard[i],'anmial')){
							dom.addClass(this.cvCard[i],'anmial')
						}
					}
				}
			}
		},
		mounted(){
			this.$prompt('请输入口令', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(({ value }) => {
				if(value === this.GLOBAL.dataApi2){
					this.cvCard = document.querySelectorAll('.cv-card')
					this.viewHeight = document.documentElement.clientHeight
					// 监听滚动条 节流
					this.throttled = throttle(() => {
						this.previewImg()
					}, 200)

					this.previewImg()
					window.addEventListener('scroll', this.throttled, true)
				} else {
					this.layer.msg('口令错误！')
					this.$router.push({
						path: '/'
					})
				}
			}).catch(() => {
				this.$router.push({
					path: '/'
				})
			});
		},
		//离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.throttled, true)
		}
    }
</script>

<style scoped lang="less">
	.cv-card{
		opacity: 0;
		padding:20px;
		&.aurtavet-card{
			background: rgb(225,207,200);
			.at-img{
				display: inline-block;
				width:100px;
			}
		}
		.cv-content{
			margin-top:10px;
			font-size:16px;
			color:#444;
			&.myIntro{
				span{
					display: inline-block;
					border: 1px solid #d8c6aa;
					color: #b98672;
					border-radius: 25px;
					margin: 5px;
					padding: 3px 15px;
				}
			}
			h5,h4{
				margin-bottom:10px;
			}
			.el-col{
				line-height: 30px;
			}
			.proExper{
				margin-top:10px;
			}
		}
		a.download{
			display: block;
			line-height: 50px;
		}
	}
	.anmial{
		animation: move 1.5s forwards;
	}
	@-webkit-keyframes move {
		from{
			padding-top:300px;
			opacity: 0;
		}
		to{
			padding-top:20px;
			opacity:1
		}
	}
</style>
