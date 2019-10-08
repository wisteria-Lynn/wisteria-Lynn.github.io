<template>
	<div class="city">
		<!--城市级联-->
		<div>
			<el-select filterable v-model="valueLEV[0]" placeholder="请选择" v-if="active > 0" @change="getLEV(1)">
				<el-option
					v-for="item in optionsLEV[0]"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-select filterable v-model="valueLEV[1]" placeholder="请选择" v-if="active > 1" @change="getLEV(2)">
				<el-option
					v-for="item in optionsLEV[1]"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-select filterable v-model="valueLEV[2]" placeholder="请选择" v-if="active > 2">
				<el-option
					v-for="item in optionsLEV[2]"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
		</div>
		<!-- 菜单级联 -->
		<el-row class="menu-wrap">
			<el-col :span="8" class="menu-title">一级菜单</el-col>
			<el-col :span="8" class="menu-title">二级菜单</el-col>
			<el-col :span="8" class="menu-title">三级菜单</el-col>
			<el-col :span="8">
				<div v-for="(item,index) in menulist[0]" :key="index" @click="getMenu(2,item.id)">
					{{item.name}}
				</div>
			</el-col>
			<el-col :span="8">
				<div v-for="(item,index) in menulist[1]" :key="index" @click="getMenu(3,item.id)">
					{{item.name}}
				</div>
			</el-col>
			<el-col :span="8">
				<div v-for="(item,index) in menulist[2]" :key="index">
					{{item.name}}
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {city} from '../../../api/user'

	export default {
		name: "city",
		data() {
			return {
				active: 1,
				optionsLEV: [],
				valueLEV: [],
				menulist: [[],[],[]],
				menu: [

					{id: 1, name: 'a', level: 1, parent: 0},

					{id: 2, name: 'b', level: 1, parent: 0},

					{id: 3, name: 'c', level: 1, parent: 0},

					{id: 4, name: 'd', level: 2, parent: 1},

					{id: 5, name: 'e', level: 2, parent: 1},

					{id: 6, name: 'f', level: 2, parent: 1},

					{id: 7, name: 'x', level: 2, parent: 2},

					{id: 8, name: 'y', level: 2, parent: 2},

					{id: 9, name: 'z', level: 2, parent: 2},

					{id: 10, name: 'p', level: 3, parent: 4},

					{id: 11, name: 'q', level: 3, parent: 4},

					{id: 12, name: 'r', level: 3, parent: 4}

				]
			}
		},
		methods: {
			// 获取城市
			getCity(id, callBack) {
				city({id: id}).then((res) => {
					if (res.code === 0) callBack(res)
				})
			},
			// 获取下一级城市列表
			getLEV(type) {
				this.valueLEV[type] = ''
				this.optionsLEV[type] = []
				this.getCity(this.valueLEV[type - 1], (res) => {
					this.$set(this.optionsLEV, type, res.data)
					this.active = res.data.length === 0 ? type : type + 1
				})
			},
			// 处理菜单 算法
			getMenu(lev,id){
				this.menulist[lev-1].length = 0
				// console.time()
				// for(let i =0; i<this.menu.length;i++){
				// 	if(this.menu[i].level === lev && this.menu[i].parent === id){
				// 		this.menulist[lev-1].push(this.menu[i])
				// 	}
				// }
				// console.timeEnd()
				console.time()
				this.$set(this.menulist, lev-1, this.menu.filter((val)=>{
					return val.level === lev && val.parent === id
				}))
				console.timeEnd()
			}
		},
		created() {
			// 获取第一级城市
			this.getCity('', (res) => {
				this.$set(this.optionsLEV, 0, res.data)
			})
			// 处理菜单
			this.getMenu(1,0)
		}
	}
</script>

<style scoped lang="less">
	.city {
		/*菜单*/

		.menu-wrap {
			margin-top: 20px;

			.menu-title {
				border: 1px solid #ccc;
			}
		}
	}
</style>
