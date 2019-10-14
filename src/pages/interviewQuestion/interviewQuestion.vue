<template>
    <div class="interviewQuestion">
		<header-one></header-one>
		<div class="u-panel" v-if="$route.path.split('/').length <= 2">
			<div class="u-panel-card ques-card t-center" v-for="(item,index) in quesList" :key="index">
				<router-link :to="item.url">{{item.title}}</router-link>
			</div>
		</div>
		<router-view :key="$route.fullPath"></router-view>
	</div>
</template>

<script>
    export default {
        name: "interviewQuestion",
		data(){
        	return{
        		quesList:[
					{
						title:'HR面试',
						url:'/interviewQuestion/HRQuestion'
					},
					{
						title:'技术面试',
						url:'/interviewQuestion/TECQuestion'
					}
				]
			}
		}
    }
</script>

<style scoped lang="less">
	.ques-card{
		padding:30px 0;
		font-size:32px;
	}
</style>
