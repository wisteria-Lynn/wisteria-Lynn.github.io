// import Vue from 'vue'
// import Vuex from 'vuex'
// 用户模块
import USER from './modules/user/user'
import CHATUSER from './modules/chatMessage/chatuser'
import THEME from './modules/theme'

// Vue.use(Vuex)

// export default new Vuex.Store({
// 	modules: {
// 		USER: USER
// 	}
// })
const STORE = {
	modules: {
		USER: USER,
		CHATUSER:CHATUSER,
		THEME:THEME
	}
}
export default STORE
