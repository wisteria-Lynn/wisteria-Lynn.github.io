<template>
	<div>
		<form>
			<inputPw :inputPw="inputPw"></inputPw>
			<button @click="submit">保存</button>
		</form>
	</div>
</template>

<script>
    export default {
    	components:{
    		'inputPw':(resolve)=>require(['../../../components/inputPw.vue'],resolve)
		},
        name: "demo",
		data(){
        	return{
				inputPw:''
			}
		},
		methods:{
			submit(){

			}
		}
    }
</script>

<style scoped>

</style>
