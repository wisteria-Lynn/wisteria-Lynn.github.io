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
            <h4>自我总结</h4>
            <el-row class="cv-content">
              <el-col v-html="enterTxt(info.personalSummary)"></el-col>
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
					age:'25',
					workyear:'3',
					phone:'15197220396',
					email:'wisteria_lin@sina.com',
					EducationBackground:{
						time:'2013.09-2017.06​',
						education:'本科',
						school:'湖南科技大学',
						Skill:'物联网工程',
					},
					JobIntension:'web前端 | 薪资面议 | 月内到岗',
					personalSkill:'（1）熟练掌握HTML+CSS+JavaScript三大前端语言，熟悉常用的前端语⾔框架，如Vue.js，JQuery，ES6，node.js等。\n' +
						'（2）熟悉使用响应式布局和弹性布局，能快速完成页面开发，实现各种动效\n' +
						'（3）熟练掌握Photoshop，具备图片处理能力，可将UI设计转化为符合W3C规范的静态页面。\n' +
						'（4）熟悉使用git工具进行协同开发，团队配合意识良好，熟悉webpack构建工具。\n' +
						'（5）对node.js有一定的了解。\n',
					WorkExperience:[
						{
							time:'2017.07-至今',
							work:'富士康工业互联网股份有限公司 | 前端开发'
						}
					],
					ProjectExperiences:[
						{
							title:'项目一：Fiicloud业务支撑系统(<a href="http://www.fii-icloud.com">http://www.fii-icloud.com</a>)（PC端）',
							desc:'是一个方便制造企业使用工业应用的商城平台，项目主要功能有服务商申请，产品上架，应用购买，订单支付，个人信息相关模块，国际化等。\n',
							work:'1.主要负责项目前期重构以及新需求开发，整合内外网代码，编写开发规范文档，将代码模块化，组件化，新增共用模板，提高代码可读性及复用性。\n' +
								'2.使用flex布局实现静态页面的对齐居中，修复各种排版混乱，根据UI设计美化页面。\n' +
								'3.对上传的图片进行裁剪，合理压缩等操作，提升上传速度，减少后台存储压力。\n' +
								'4.优化国际化功能，改用vue-i18n插件实现，剔除冗余代码，降低代码复杂度。\n' +
                                '5.实现积分+优惠券+余额+线下付款多种混合支付方式。\n' +
								'6.分页展示订单列表，判断订单状态，实现不同订单状态下的支付，收货，物流，查看等操作\n',
						},{
							title:'项目二：影像智能平台系统/影像数据内容管理系统（PC端）',
							desc:'是一个管理各大厂区摄像头的系统。\n',
							work:'1.使用layerPage插件分页展示扫描到的条码数据，并将错误条码高亮显示。\n' +
								'2.使用websocket⻓链接，实时更新厂区摄像头录制数据。\n'
						},{
							title:'项目三：FII问卷调查系统（移动端）',
							desc:'一个基于微信扫码使用的问卷答题系统，用于分析企业的需求及痛点。',
							work:'1.基于Vue框架搭建项目，使用移动端cubeUI对页面进行基础布局。\n' +
								'2.实现使用手机号登陆，借助微信服务号实现用户微信登陆并获取用户头像昵称等信息。\n' +
								'3.根据用户答题结果，运用echart技术生成分析图表。\n' +
								'4.使用渐进式+懒加载技术，展示页面图片，提高响应速度，减少无效的资源加载。\n'
						}
					],
                    personalSummary:'三年前端Vue框架经验，了解项目开发流程，能快速对接产品需求，编写各种静态页面，实现多种动效。熟练使用chrome开发调试工具，对浏览器兼容、网站性能优化有一定的了解，具备良好的编程规范，重视用户体验与代码可维护性，对小程序开发有浓厚的兴趣。',
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
