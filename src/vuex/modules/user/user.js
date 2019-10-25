// 用户登录 退出 管理
import axios from 'axios'
let userinfo = JSON.parse(localStorage.getItem('userInfo'))
const USER = {
	state: {
		username: userinfo ? userinfo.username :'', // 用户名
		password: userinfo ? userinfo.password :'', // 密码
		userMyToken: userinfo ? userinfo.token :'', // 用户token
		repassword: userinfo ? userinfo.repassword : false, // 用户记住密码
		isLogin: localStorage.getItem('isLogin') // 是否登录状态
	},
	mutations: {
		changeLogin(state, userInfo) {
			state.userMyToken = userInfo.token
			state.username = userInfo.username
			state.password = userInfo.password
			state.repassword = userInfo.repassword
		},
		loginStatus(state,status){
			state.isLogin = status
		}
	},
	actions: {
		loginAction({commit},params){
			commit('changeLogin',params)
			localStorage.setItem('userInfo', JSON.stringify(params))

		},
		isLogin({commit},status) {
			commit('loginStatus',status)
			localStorage.setItem('isLogin', status)
		},
		loginOut({commit}) {
			commit('loginStatus',false)
			localStorage.removeItem('isLogin')
			localStorage.removeItem('userInfo')
			// 移除之前在axios头部设置的token,现在将无法执行需要token的事务
			delete axios.defaults.headers.common['token']
		}
	},
	getters: {}
}

export default USER
