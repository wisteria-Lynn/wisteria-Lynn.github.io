// import Vue from 'vue'
// import Vuex from 'vuex'
// 用户模块
import USER from './modules/user/user'
import MESSAGE from './modules/chatMessage/chatMessage'
import THEME from './modules/theme'

// Vue.use(Vuex)

// export default new Vuex.Store({
// 	modules: {
// 		USER: USER
// 	}
// })
const STORE = {
	getters:{
		getTheme:(state)=>{
			return state.THEME
		}
	},
	modules: {
		USER: USER,
		MESSAGE:MESSAGE,
		THEME:THEME
	}
}
export default STORE
