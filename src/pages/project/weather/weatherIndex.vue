<template>
    <div class="weatherIndex">
		<!--根据城市选择天气-->
		<div>查询天气</div>
		<div>
			<el-select filterable  v-model="weatherValue" placeholder="请选择">
				<el-option
					v-for="item in weatherOptions"
					:key="item.id"
					:label="item.name"
					:value="item.code">
				</el-option>
			</el-select>
			<el-button @click="getWeather">查询</el-button>
		</div>
		<div v-html="weatherHtml"></div>
	</div>
</template>

<script>
	import { getWeather,getWeatherCity } from '../../../api/user'
    export default {
		inject: ['reload'],
        name: "weatherIndex",
		data(){
        	return {
				weatherValue:'',
				weatherOptions:[],
				weatherHtml:''
			}
		},
		methods:{
			//获取天气-城市
			getWeatherCity(){
				getWeatherCity().then((res)=>{
					this.weatherOptions = res.data
					this.reload()
				})
			},
			// 获取天气
			getWeather(){
				// 内网无法访问
				getWeather({
					code:this.weatherValue
				}).then((res) => {
					this.weatherHtml = res.data
				})
			}
		},
		created(){
			this.getWeatherCity()
			// this.getWeather()
		}
    }
</script>

<style scoped>

</style>
