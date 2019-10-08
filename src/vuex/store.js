// import Vue from 'vue'
// import Vuex from 'vuex'

// 用户模块
import USER from './modules/user/user'
// Vue.use(Vuex)

// export default new Vuex.Store({
// 	modules: {
// 		USER: USER
// 	}
// })
const STORE = {
	modules: {
		USER: USER
	}
}
export default STORE
