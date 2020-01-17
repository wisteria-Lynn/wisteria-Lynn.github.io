let user = JSON.parse(sessionStorage.getItem('chatUserInfo'))
const CHATUSER = {
	state: {
		openID:user ? user.openID : '',
		chatname: user ? user.chatname : '',
		avatar: user ? user.avatar : '',
		sort: user ? user.sort : '',
	},
	mutations: {
		changeChat(state, prop) {
			state.openID = prop.openID
			state.chatname = prop.chatname
			state.avatar = prop.avatar
			state.sort = prop.sort
		},
		updateAvatar(state, prop){
			state.avatar = prop.avatar
			sessionStorage.setItem('chatUserInfo',JSON.stringify({
				openID:state.openID,
				chatname:state.chatname,
				avatar: state.avatar ,
				sort: state.sort
			}))
		}
	},
	actions: {
		saveChatUserInfo({commit},params){
			commit('changeChat',params)
		},
		updateAvatar({commit},params){
			commit('updateAvatar',params)
		}
	},
	getters: {}
}

export default CHATUSER
