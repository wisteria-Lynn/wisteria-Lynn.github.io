// import Vue from 'vue'
// import Vuex from 'vuex'

// 用户模块
import USER from './modules/user/user'
// 图片旋转裁剪模块
import CROPPER from './modules/cropper/cropper'
import MESSAGE from './modules/chatMessage/chatMessage'

// Vue.use(Vuex)

// export default new Vuex.Store({
// 	modules: {
// 		USER: USER
// 	}
// })
const STORE = {
	modules: {
		USER: USER,
		CROPPER:CROPPER,
		MESSAGE:MESSAGE
	}
}
export default STORE
