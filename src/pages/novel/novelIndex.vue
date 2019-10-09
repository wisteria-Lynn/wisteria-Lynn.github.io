<template>
    <div class="novelIndex">
		<headerOne></headerOne>
		<div class="panel" v-if="$route.path.split('/').length <= 2">
			<div class="novelWrap" v-for="item in novelList">
				<img :src="item.img" @click="toReadIt(item.id)">
				<span>{{item.title}}</span>
				<div>{{item.des}}</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
    export default {
        name: "novelIndex",
		data(){
        	return{
				novelList:[
					{
						title:'解祤忧',
						img:require('../../assets/img/novel/novel-1.png'),
						id:0,
						des:'他一生'
					}
				]
			}
		},
		methods:{
			toReadIt(id){
				this.$router.push({
					path:'/novel/novelDetail',
					query:{
						id:id
					}
				})
			}
		}
    }
</script>

<style scoped lang="less">
	.novelIndex{
		.novelWrap{
			margin:20px;
			img{
				height:100px;
				cursor: pointer;
			}
			span{
				display: block;
			}
		}
	}
</style>
<style lang="less">
	.panel{
		min-height:300px;
		width:95%;
		margin:20px 5%;
		background:#fff;
	}
	@media (max-width: 768px) {
		.panel {
			width:100%;
			margin:20px 0;
		}
	}
</style>
