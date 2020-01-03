
const THEME = {
	state: {
		theme: '', // 主题
	},
	mutations: {
		changeTheme(state, theme) {
			state.theme = theme
		}
	},
	actions: {
		themeAction({commit},params){
			commit('changeTheme',params)
			localStorage.setItem('theme', params)
		}
	},
	getters: {}
}

export default THEME
