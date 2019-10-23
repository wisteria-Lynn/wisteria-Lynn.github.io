const MESSAGE = {
	state: {
		system:[],// 系统消息
		userList:[],// 用户在线链表
		chatArr: [],// 当前面板的聊天记录
		FriendList: JSON.parse(sessionStorage.getItem('FriendList'))||[],// 好友列表
		userMessageList:[],// 当前用户的消息记录
		localMessage:JSON.parse(sessionStorage.getItem('localMessage'))||[],// 本地的所有用户的消息记录
		localMessageIndex:''//当前用户在消息记录中的索引
	},
	mutations: {
		system(state, mes) {
			state.system.push(mes)
		},
		userList(state, mes) {
			state.userList = mes
			state.FriendList.forEach((val,index,arr)=>{
				mes.forEach((val2,index2,arr2)=>{
					if(val.username === val2.username){
						state.FriendList[index].readay = val2.readay
					}
				})
			})
		},
		chatArr(state, mes) {
			let time = setTimeout(() => {
				let div = document.getElementById('bottomScroll')
				div.scrollTop = div.scrollHeight
			}, 100)
			time = null
			let chatArrIndex = state.userMessageList.findIndex((val,index,arr)=>{
				return val.chatName === mes
			})
			state.chatArr = chatArrIndex > -1 ? state.userMessageList[chatArrIndex].chatArr : []
		},
		FriendList(state, mes) {
			state.FriendList = mes
			mes.forEach((val,index,arr)=>{
				state.userList.forEach((val2,index2,arr2)=>{
					if(val.username === val2.username){
						state.FriendList[index].readay = val2.readay
					}
				})
			})
		},
		localMessage(state, mes) {
			state.localMessage = mes
			state.userMessageList = state.localMessageIndex > -1 ? mes[state.localMessageIndex].list : []
			console.log(state.userMessageList)
			state.FriendList.forEach((val,index,arr)=>{
				console.log(val)
				state.userMessageList.forEach((val2,index2,arr2)=>{
					console.log(val2)
					if(val.username === val2.chatName){
						state.FriendList[index].msNum = val2.msNum
					}
				})
			})
		},
		localMessageIndex(state, mes) {
			state.localMessageIndex = mes
		}
	},
	actions: {
		system({commit},params){
			commit('system',params)
		},
		userList({commit},params){
			commit('userList',params)
		},
		chatArr({commit},params){
			commit('chatArr',params)
		},
		FriendList({commit},params){
			sessionStorage.setItem('FriendList', JSON.stringify(params))
			commit('FriendList',params)
		},
		localMessage({commit},params){
			sessionStorage.setItem('localMessage', JSON.stringify(params))
			commit('localMessage',params)
		},
		localMessageIndex({commit},params){
			commit('localMessageIndex',params)
		}
	},
	getters: {}
}

export default MESSAGE
