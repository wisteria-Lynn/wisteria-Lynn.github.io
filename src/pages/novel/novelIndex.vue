<template>
    <div class="novelIndex">
		<headerOne></headerOne>
		<div class="panel" v-if="$route.path.split('/').length <= 2">
			<div class="panel-card">
				<div class="panel-card-item novel-list" v-for="item in novelList">
					<img :src="item.img" @click="toReadIt(item.id,item.title)">
					<div>
						<h4>{{item.title}}</h4>
						<span>简介：{{item.des}}</span>
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
				novelList:[
					{
						title:'解语歌·书绝天下，泪断成殇',
						img:require('../../assets/img/novel/novel-1.png'),
						id:1001,
						des:'他一生'
					},
					{
						title:'解语歌·碧玉燎原，风中潇潇',
						img:require('../../assets/img/novel/novel-1.png'),
						id:1002,
						des:'他一生'
					},
					{
						title:'解语歌·宿命缘劫，浮生何归',
						img:require('../../assets/img/novel/novel-1.png'),
						id:1003,
						des:'他一生'
					},
					{
						title:'渔歌唱晚',
						img:require('../../assets/img/novel/novel-1.png'),
						id:1004,
						des:'小渔，阿战'
					}
				]
			}
		},
		methods:{
			toReadIt(id,title){
				this.$router.push({
					path:'/novel/novelDetail',
					query:{
						id:id,
						num:'0',
						novelTitle:title
					}
				})
			}
		}
    }
</script>

<style scoped lang="less">
	@import "../../assets/less/novel";
</style>
