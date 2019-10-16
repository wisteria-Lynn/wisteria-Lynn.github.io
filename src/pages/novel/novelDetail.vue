<template>
	<div class="novelIndex novelDetail">
		<v-readPanel :readData="readData" @back="back"></v-readPanel>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		name: "novelDetail",
		components:{
			'v-readPanel':(resolve)=>{require(['../../components/readPanel/readPanel'],resolve)},//阅读组件,
		},
		data() {
			return {
				readData:[]
			}
		},
		methods: {
			back() {
				this.$router.push({path: '/novel'})
			}
		},
		created() {
			this.readData = this.GLOBAL.novel
		}
	}
</script>
