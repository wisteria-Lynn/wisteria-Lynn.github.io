const nodeApi = require('../api/FRDB_API')
// 创建websocket聊天
let user = [] //所有用户
let resultUser = [] // 所有用户



// 广播
const broadcast = (server, info) => {
	server.connections.forEach(function(conn) {
		conn.sendText(info)
	})
}

if(process.env.NODE_ENV === 'development' || true){
	console.log("开始建立连接...")
	let ws = require("nodejs-websocket") // 对象
	let wsServer = ws.createServer((conn) => {
		conn.on('text',(m) => {
			let message = JSON.parse(m)
			// 登录
			if (message.type === 'login') {
				let res = user.findIndex((val, index ,arr)=> {
					return val.username === message.username
				})
				if (res < 0) {
					user.push({
						readay:true,
						conn:conn,
						username:message.username
					})
					resultUser.push({
						readay:true,
						username:message.username
					})
				} else {
					user[res].conn = conn
					user[res].readay = true
					resultUser[res].readay = true
				}
				broadcast(wsServer,JSON.stringify({
					type:'system',
					message:message.username +' ' + '登录'
				}))
				broadcast(wsServer,JSON.stringify({
					type:'userList',
					message:resultUser
				}))
			}
			// 发送接收
			if (message.type === 'message') {
				let sendIndex = user.findIndex((val, index ,arr)=> {
					return val.username === message.sendName
				})
				let reciveIndex = user.findIndex((val, index ,arr)=> {
					return val.username === message.reciveName
				})
				console.log(sendIndex,reciveIndex,user)
				if(user[sendIndex].readay&&user[reciveIndex].readay){
					user[sendIndex].conn.sendText(JSON.stringify({
						type:'message',
						sendName:message.sendName,
						reciveName:message.reciveName,
						message:message.message
					}))
					user[reciveIndex].conn.sendText(JSON.stringify({
						type:'message',
						sendName:message.sendName,
						reciveName:message.reciveName,
						message:message.message
					}))
				}
			}
			// 关闭
			if (message.type === 'close') {
				let res = user.findIndex((val, index ,arr)=> {
					return val.username === message.username
				})
				console.log('1',res)
				if (res > -1) {
					user[res].conn = null
					user[res].readay = false
					resultUser[res].readay = false
				}
				broadcast(wsServer,JSON.stringify({
					type:'system',
					message:message.username +' ' + '离线'
				}))
				broadcast(wsServer,JSON.stringify({
					type:'userList',
					message:resultUser
				}))
			}
			console.log(message)
			// console.log(user)
		})
		conn.on('connect',(code) => {
			console.log('开启连接',code)
		})
		conn.on('close',(code) => {
			console.log('关闭连接',code)
			// user.forEach((val, index ,arr)=> {
			// 	user[index].conn = null
			// 	user[index].readay = false
			// })
			// resultUser.forEach((val, index, arr) => {
			// 	resultUser[index].readay = false
			// })
		})
		conn.on('error',(code) => {
			// 某些情况如果客户端多次触发连接关闭，会导致connection.close()出现异常，这里try/catch一下
			try {
				conn.close()
			} catch (error) {
				console.log('close异常', error)
			}
			console.log('异常关闭',code)
		})
	})
	wsServer.listen(3001)
	console.log("websocket连接完毕")
} else {
	console.log("请在本地环境运行！")
}

