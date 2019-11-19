<template>
    <div>
		<label>
			1
			<input v-model="text0" type="text"/>
		</label>
		<label>
			1
			<input v-model="text1" type="text" style="display:none;" />
		</label>
		<label>
			2
			<input v-model="text2" onfocus="type='password'" autocomplete="new-password" :type="type"></input>
		</label>
	</div>
</template>

<script>
    export default {
        name: "inputPW",
		data(){
        	return{
        		type:'text',
        		text0:'',
        		text1:'',
				text2:''
			}
		}
    }
</script>

<style scoped>

</style>
