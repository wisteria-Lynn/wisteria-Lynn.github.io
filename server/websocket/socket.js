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
getUserIndex = (username) => {
	return user.findIndex((val, index, arr) => {
		return val.username === username
	})
}

// 查询用户的好友
const chatGetFriendList = (type) => {
	DB.connectChat('SELECT * FROM chatuser', (result) => {
		if (result.length !== 0) {
			user.forEach((account) => {
				let friendList = []
				if (!!account.conn) {
					let RES = result.filter((val) => {
						return val.chatname === account.username
					})
					// 拉取用户好友列表
					friendList = JSON.parse(RES[0].friendList).map((val) => {
						let userIndex = getUserIndex(val.username);
						return Object.assign(val, {ready: userIndex > -1 ? user[userIndex].ready : false})
					})

					// 是否推送
					if (type === 'login' || !account.friendList || (account.friendList !== JSON.stringify(friendList))) {
						let userIndex = getUserIndex(account.username)
						user[userIndex].friendList = JSON.stringify(friendList)
						account.conn.sendText(JSON.stringify({
							type: 'friendList',
							message: friendList
						}))
					}
				}
			})
		}
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
				let userIndex = getUserIndex(message.username)
				if (userIndex < 0) {
					user.push({
						ready: true,
						conn: conn,
						username: message.username
					})
					resultUser.push({
						ready: true,
						username: message.username
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
						username: message.username,
						way: '登录',
						time: new Date()
					}
				}))
			}
			// 发送接收
			if (message.type === 'message') {
				let sendIndex = getUserIndex(message.sendName)
				let reciveIndex = getUserIndex(message.reciveName)

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
			// 关闭
			if (message.type === 'close') {
				let userIndex = getUserIndex(message.username)
				if (userIndex > -1) {
					user[userIndex].conn = null
					user[userIndex].ready = false
					resultUser[userIndex].ready = false
				}
				broadcast(wsServer, JSON.stringify({
					type: 'system',
					message: {
						username: message.username,
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
