<template>
    <div class="novelIndex novelDetail">
		<div class="slideTip" @click="getSliceMenu">
			<i class="iconfont icon1"></i>
		</div>
		<template v-if="isSlideMenu">
			<div class="headSlideMenu" :class="[isSlideMenuBlock?'menu-show':'menu-hidden']" @click="hideSlideNav">
				<div class="headSlideMenuChild">
					<span>{{novelTitle}}</span>
					<template v-for="(item,index) in sideData">
						<!--<router-link :to="{path:item.url}" :class="[{'is-active':item.url === $route.path}]">{{item.title}}</router-link>-->
						<span @click="getNovelSpce(index)" :class="[{'is-active':index=== num}]">第{{index+1}}章&nbsp;&nbsp;{{item.title}}</span>
					</template>
				</div>
			</div>
		</template>
		<div class="panel">
			<div class="panel-card novel-bg">
				<div class="panel-card-item novel-arc">
					<h3 class="novelTitle t-center">第{{num+1}}章&nbsp;&nbsp;{{title}}</h3>
					<div class="novelTxt" v-html="html">
					</div>
				</div>
			</div>
		</div>
		<div class="novelBtn">
			<el-button class="btn btn-success" @click="getNext('up')">上一章</el-button>
			<el-button class="btn btn-success" @click="back()">返回书架</el-button>
			<el-button class="btn btn-success" @click="getNext('down')">下一章</el-button>
		</div>
	</div>
</template>

<script>
	import {getQueryString} from "../../util/methods"
    export default {
		inject: ['reload'],
        name: "novelDetail",
		data(){
        	return{
        		novelTitle:'',
        		title:'',
				html:'',
				num:0,
				sideData:[],
				novelArc:'',
				isSlideMenu:false,
				isSlideMenuBlock: false,
			}
		},
		methods:{
			getSliceMenu() {
				this.isSlideMenu = true
				this.isSlideMenuBlock = !this.isSlideMenuBlock
			},
			hideSlideNav(e){
				let sp2 = document.getElementsByClassName('headSlideMenuChild')[0]
				if (sp2) {
					// 点击其他地方 导航隐藏
					if (!sp2.contains(e.target)) {
						this.isSlideMenuBlock = false
					}
				}
			},
			getNovelSpce(index){
				this.$router.push({
					path:'/novel/novelDetail',
					query:{
						id:this.$route.query.id,
						num:index,
						novelTitle:this.novelTitle
					}
				})
			},
			getNext(str){
				if(str === 'up' && this.num === 0){
					this.layer.msg('已经是第1章啦！')
					return false
				}
				if(str === 'down' && this.num === this.novelArc.novel.length-1){
					this.layer.msg('已经是最后一章啦！')
					return false
				}
				let index = str === 'up' ? this.num - 1 : this.num + 1
				this.getNovelSpce(index)
			},
			back(){
				this.$router.push({path:'/novel'})
			}
		},
		created(){
			switch (Number(getQueryString('id'))) {
				case 1001:
					this.novelArc = require('../../../static/js/novel/novel-1001')
					break;
				case 1002:
					this.novelArc = require('../../../static/js/novel/novel-1002')
					break;
				case 1003:
					this.novelArc = require('../../../static/js/novel/novel-1003')
					break;
				case 1004:
					this.novelArc = require('../../../static/js/novel/novel-1004')
					break;
			}
			this.sideData = this.novelArc.novel
			this.num = Number(this.$route.query.num)
			this.novelTitle = this.$route.query.novelTitle
			let txt= this.novelArc.novel[this.num].txt.split('\n')
			this.title = this.novelArc.novel[this.num].title
			this.html = ''
			for(let i = 0;i<txt.length;i++){
				this.html+=`<p style="margin:20px 0;font-size:16px;">${txt[i]}</p>`
			}
		}
    }
</script>
<style scoped lang="less">
	@import "../../assets/less/novel";
	.slideTip{
		display: none;
		position: fixed;
		top: 50%;
		left: 2%;
		width: 40px;
		height: 40px;
		background: rgba(96, 122, 175,.5);
		color: #fff;
		border-radius: 25px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		z-index:900;
		i{
			font-size:22px;
		}
	}
	.headSlideMenu {
		position: fixed;
		top:0;
		width: 100%;
		height: 100%;
		left:-100%;
		background: rgba(0, 0, 0, 0.1);
		z-index: 1000;
		&.menu-show {
			-webkit-animation: menuNavShow .5s forwards;
			animation: menuNavShow .5s forwards;
		}

		&.menu-hidden {
			-webkit-animation: menuNavHidden .5s forwards;
			animation: menuNavHidden .5s forwards;
		}

		.headSlideMenuChild {
			width:60%;
			height:100%;
			/*margin-top:62px;*/
			padding-top: 10px;
			background: #fff;
			span{
				display: block;
				color:#333;
				padding-left:20px;
				line-height: 40px;
				&:hover{
					color:#246dff;
					background:#ccc;
				}
				&.is-active{
					color:#246dff;
					background:#ccc;
				}
			}
		}
	}
	@media (max-width: 768px) {
		.slideTip {
			display: block !important;
		}
	}
	@keyframes menuNavShow {
		from {
			left: -100%;
		}
		to {
			left: 0;
		}
	}

	@keyframes menuNavHidden {
		from {
			left: 0;
		}
		to {
			left: -100%;
		}
	}
</style>
