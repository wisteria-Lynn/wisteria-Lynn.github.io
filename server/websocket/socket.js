const DB = require('../db')
// 创建websocket聊天
let user = [] //所有用户
let resultUser = [] // 所有用户

// 广播
const broadcast = (server, info) => {
	server.connections.forEach(function (conn) {
		conn.sendText(info)
	})
}

// 获取该在线用户的index
getUserIndex = (openID) => {
	return user.findIndex((val, index, arr) => {
		return val.openID === openID
	})
}
getUserIndexbyName = (chatname) => {
	return user.findIndex((val, index, arr) => {
		return val.chatname === chatname
	})
}
// 查询用户的好友
const chatGetFriendList = (type) => {
	DB.connectChat( (err,connection) => {
		connection.query('SELECT * FROM chatfriend','',(err, friendTab) => {
			console.log(friendTab)
			connection.query('SELECT * FROM chatuser','', (err,userTab) => {
				user.forEach((account,index) => {
					let friendList = []
					if (!!account.conn) {
						// 筛选当前用户的好友
						let friendOpenIDList = friendTab.filter((val) => {
							return val.UID === account.openID || val.FID === account.openID
						})
						friendList = friendOpenIDList.map((val) => {
							let func = (prop,type)=>{
								let info = userTab.filter((item)=>{
									return item.openID === prop
								})
								// 添加是否在线字段
								let userIndex = getUserIndex(info[0].openID)
								return Object.assign(info[0], {ready:userIndex > -1 ? user[userIndex].ready : false,type:type})
							}
							if(val.UID === account.openID){
								return func(val.FID,val.UIDtype)
							}
							if(val.FID === account.openID){
								return func(val.UID,val.FIDtype)
							}
						})
						// 是否推送
						if (type === 'login' || !account.friendList || (account.friendList !== JSON.stringify(friendList))) {
							let userIndex = getUserIndex(account.openID)
							user[userIndex].friendList = JSON.stringify(friendList)
							account.conn.sendText(JSON.stringify({
								type: 'friendList',
								message: friendList
							}))
						}
					}
				})
				connection.release()
			})
		})
	})
}

if (process.env.NODE_ENV === 'development' || true) {
	console.log("开始建立连接...")
	const ws = require("nodejs-websocket") // socket对象
	const wsServer = ws.createServer((conn) => {
		// 连接消息
		conn.on('text', (m) => {
			// 消息
			let message = JSON.parse(m)
			// 登录消息
			if (message.type === 'login') {
				let userIndex = getUserIndex(message.openID)
				if (userIndex < 0) {
					user.push({
						ready: true,
						conn: conn,
						chatname: message.chatname,
						openID:message.openID
					})
					resultUser.push({
						ready: true,
						chatname: message.chatname,
						openID:message.openID
					})
				} else {
					user[userIndex].conn = conn
					user[userIndex].ready = true
					resultUser[userIndex].ready = true
				}
				// 给登录的用户发送好友列表
				chatGetFriendList('login')

				// 广播登录的系统消息
				broadcast(wsServer, JSON.stringify({
					type: 'system',
					message: {
						chatname: message.chatname,
						openID:message.openID,
						way: '登录',
						time: new Date()
					}
				}))
			}
			// 发送接收
			if (message.type === 'message') {
				let sendIndex = getUserIndexbyName(message.sendName)
				let reciveIndex = getUserIndexbyName(message.reciveName)

				// console.log(sendIndex,reciveIndex,user)

				if (user[sendIndex].ready && user[reciveIndex].ready) {
					let msgItem = {
						type: 'message',
						sendName: message.sendName,
						reciveName: message.reciveName,
						time: new Date(),
						message: message.message
					}
					user[sendIndex].conn.sendText(JSON.stringify(msgItem))
					user[reciveIndex].conn.sendText(JSON.stringify(msgItem))
				}
			}
			if (message.type === 'friendList'){
				console.log('friendlist')
				// 给登录的用户发送好友列表
				chatGetFriendList('login')
			}
			// 关闭
			if (message.type === 'close') {
				let userIndex = getUserIndex(message.openID)
				if (userIndex > -1) {
					user[userIndex].conn = null
					user[userIndex].ready = false
					resultUser[userIndex].ready = false
				}
				broadcast(wsServer, JSON.stringify({
					type: 'system',
					message: {
						chatname: message.chatname,
						openID: message.openID,
						way: '离线',
						time: new Date()
					}
				}))

				// 给还未离线的用户发送好友列表
				chatGetFriendList()
			}
			console.log(message)
			// console.log(user)
		})
		// 开启连接
		conn.on('connect', (code) => {
			console.log('开启连接', code)
		})
		// 关闭连接
		conn.on('close', (code) => {
			console.log('关闭连接', code)
		})
		// 连接错误
		conn.on('error', (code) => {
			// 某些情况如果客户端多次触发连接关闭，会导致connection.close()出现异常，这里try/catch一下
			try {
				conn.close()
			} catch (error) {
				console.log('close异常', error)
			}
			console.log('异常关闭', code)
			// console.log(resultUser)
		})
	})
	wsServer.listen(3001)
	console.log("websocket连接完毕,list at port 3001")
} else {
	console.log("请在本地环境运行！")
}
