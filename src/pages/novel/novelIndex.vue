<template>
    <div class="novelIndex">
		<headerOne></headerOne>
		<div class="panel" v-if="$route.path.split('/').length <= 2">
			<div class="panel-card">
				<div class="panel-card-item novel-add t-right">
					<i @click="addNovel" class="iconfont icon1"></i>
				</div>
				<div class="panel-card-item novel-list" v-for="item in novelList">
					<img v-if="item.img" :src="item.img" @click="toReadIt(item.id,item.title)">
					<span class="novel-list-img" v-else @click="toReadIt(item.id,item.title)"></span>
					<div>
						<h4>{{item.title}}</h4>
						<span v-html="item.des"></span>
					</div>
				</div>
			</div>
		</div>
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
	export default {
        name: "novelIndex",
		data(){
        	return{
				novelList:[]
			}
		},
		methods:{
        	getNovelList(){
				this.novelList = require('../../../static/js/novel/novel-list').novelList
			},
			toReadIt(id,title){
				this.$router.push({
					path:'/novel/novelDetail',
					query:{
						id:id,
						num:'0',
						novelTitle:title
					}
				})
			},
			addNovel(){
				this.$router.push({
					path:'/novel/addNovel'
				})
			}
		},
		created(){
        	this.getNovelList()
		}
    }
</script>

<style scoped lang="less">
	@import "../../assets/less/novel";
</style>
