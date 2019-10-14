<template>
	<div class="HRQuestion">
		<div class="u-panel">
			<div class="u-panel-card hrq-card"
				 v-for="(item,index) in quesList" :key="index">
				<h4>{{index+1}}.{{item.title}}</h4>
				<span v-for="(item2,index2) in item.txt" :key="index2">{{item2}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "HRQuestion",
		data() {
			return {
				showBtn: true,
				quesList: []
			}
		},
		created(){
			this.quesList = require('../../../static/js/interviewQuestion/HRQuestion-js').qustion
		}
	}
</script>

<style scoped lang="less">
	.hrq-card{
		padding:10px 20px;
		span{
			display: inline-block;
			margin-top:15px;
		}
	}
</style>
