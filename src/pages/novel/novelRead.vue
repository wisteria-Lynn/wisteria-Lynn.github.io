<template>
	<div class="novelIndex novelDetail">
		<v-readPanel :readData="readData" @back="back"></v-readPanel>
	</div>
</template>

<script>
	// function port(id){
	// 	return import('../../novel/novel-'+id).then(novel=>{
	// 		console.log(novel)
	// 	})
	// }
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
			this.readData = require('../../novel/novel-'+this.$route.query.id).novel
			this.$loading({
				lock: false,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			// const loading = this.$loading({
			// 	lock: true,
			// 	text: 'Loading',
			// 	spinner: 'el-icon-loading',
			// 	background: 'rgba(0, 0, 0, 0.7)'
			// });
			// // this.readData = this.GLOBAL.novel
			// let id = this.$route.query.id;
			// port(id)
			// import('../../novel/novel-'+id).then((res)=>{
			// 	console.log(res)
			// })
			// let result = ((resolve)=> require.ensure(['../../novel/novel-1001.js'], (res) => {
			// 	loading.close()
			// 	resolve(require('../../novel/novel-1001.js'));
			// },id))()
			// console.log(result)
		}
	}
</script>
