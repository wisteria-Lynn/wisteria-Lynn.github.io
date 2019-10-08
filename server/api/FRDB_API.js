const mysql = require('mysql')
const dbConfig = require('../db')
const pool = mysql.createPool({
	host: dbConfig.mysql.host,// 数据库地址
	user: dbConfig.mysql.user,// 数据库用户名
	password: dbConfig.mysql.password,// 数据库密码
	database: dbConfig.mysql.database,// 数据库名称
	port: dbConfig.mysql.port,// 数据库端口
	multipleStatements: true // 多语句查询
})
module.exports = {
	// 城市 - 多级查询
	getCity(req, res, next) {
		let qr = req.query // 参数
		pool.getConnection((err, connection) => {
			let sql = 'SELECT * FROM pj_mon_areainfo WHERE code=?'
			let code = qr.id === '' ? 0 : qr.id
			try {
				connection.query(sql,[code] ,(err, result) => {
					if (result.length !== 0) {
						// 返回数据
						res.json({code: 0, data: result})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	},
	// 登录
	login(req, res, next) {
		let qr = req.body
		pool.getConnection((err, connection) => {
			let sql = 'SELECT * FROM userinfo WHERE username=? AND password=?'
			try {
				connection.query(sql, [qr.username, qr.password], (err, result) => {
					// console.log(result)
					if (result.length !== 0) {
						res.json({
							code: 0,
							data: {
								token: '0123456789'
							}
						})
					} else {
						res.json({
							code: 10001,
							message: '账户或密码错误'
						})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}
		})
	},
	// 聊天室 - 登录
	chatLogin(req, res, next) {
		let qr = req.body
		pool.getConnection((err, connection) => {
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			try{
				connection.query(sql_query,[qr.name] ,(err, result) => {
					if (result.length === 0) {
						res.json({code: 10003, message:'name not exit'})
					} else {
						res.json({code: 0, data: result[0]})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	},
	// 聊天室 - 用户列表
	chatFriendList(req, res, next) {
		let qr = req.query
		pool.getConnection((err, connection) => {
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			try{
				connection.query(sql_query,[qr.name] ,(err, result) => {
					if (result.length === 0) {
						res.json({code: 10003, message:'name not exit'})
					} else {
						res.json({code: 0, data: JSON.parse(result[0].friendList)})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	},
	// 聊天室 - 添加朋友
	chatAddFriend(req, res, next) {
		let qr = req.body
		pool.getConnection((err, connection) => {
			// 查询用户列表语句
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			// 更新用户朋友字段语句
			let sql_update = 'UPDATE chatuser SET friendList=? WHERE chatname=?'
			let result_1
			let result_2
			try{
				connection.query(sql_query,[qr.sendName] ,(err, result) => {
					// 发送方用户信息
					result_1 =result[0]
					try{
						connection.query(sql_query,[qr.reciveName] ,(err, result) => {
							// 接收方用户信息
							result_2 = result[0]
							// 发送方朋友列表
							let fList_1 = JSON.parse(result_1.friendList)
							// 接收方朋友列表
							let fList_2 = JSON.parse(result_2.friendList)
							// 发送方&&接收方 用户存在
							if (result_1.length !== 0 && result_2.length !== 0) {
								// 发送方添加朋友
								if (qr.type === 'add'){
									// type 0 已发送 1 待同意 2 同意已成为朋友
									fList_1.push({
										"username":qr.reciveName,
										"type":0
									})
									fList_2.push({
										"username":qr.sendName,
										"type":1
									})
									connection.query(sql_update,[fList_1,qr.sendName] ,(err, result) => {
										console.log('1',result)
									})
									connection.query(sql_update,[fList_2,qr.reciveName] ,(err, result) => {
										console.log('2',result)
									})
								}
								// 接收方 同意 成为朋友
								if (qr.type === 'recive'){
									// 找到接收方在发送方朋友列表中的索引
									let fList_Index_1 = fList_1.findIndex((val, index ,arr) => {
										return val.username === qr.reciveName
									})
									// 找到发送方在接收方朋友列表中的索引
									let fList_Index_2 = fList_2.findIndex((val, index ,arr) => {
										return val.username === qr.sendName
									})
									if (fList_Index_1 > -1 && fList_Index_2 > -1) {
										// 改变 双方朋友状态 type = 2 同意
										fList_1[fList_Index_1].type = 2
										fList_2[fList_Index_2].type = 2
										connection.query(sql_update,[JSON.stringify(fList_1),qr.sendName] ,(err, result) => {
										})
										connection.query(sql_update,[JSON.stringify(fList_2),qr.reciveName] ,(err, result) => {
											res.json({code: 0, message:'success'})
										})
									}
								}
								connection.release()
							} else {
								res.json({code: 10002, message:'name exit'})
							}
						})
					} catch (e) {
						console.log('操作异常', e)
						res.json({code: 20000, message:'error'})
					}
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	},
	// 聊天室 - 注册
	chatRegist(req, res, next) {
		let qr = req.body
		// console.log(qr.name)
		pool.getConnection((err, connection) => {
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			let sql = 'INSERT INTO chatuser(chatname) VALUES ("' + qr.name + '")'
			try {
				connection.query(sql_query,[qr.name],(err, result) => {
					// console.log(result)
					if (result.length !== 0) {
						res.json({code: 10002, message:'name exit'})
						connection.release()
					} else {
						try {
							connection.query(sql,(err, result) => {
								if(result){
									res.json({code: 0, data: {name:qr.name,}})
								} else {
									res.json({code: 20001, message:'database error'})
								}
								connection.release()
							})
						} catch (e) {
							console.log('操作异常', e)
							res.json({code: 20000, message:'error'})
						}
					}
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}
		})
	},
	// 天气预报 - 获取城市
	getWeatherCity(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = 'SELECT * FROM weathercode'
			try {
				connection.query(sql,(err, result) => {
					if (result.length !== 0) {
						res.json({code: 0, data: result})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}
		})
	},
	// 博客 - 获取文章列表
	getBlogList(req, res, next){
		let qr = req.query
		pool.getConnection((err, connection) => {
			let sql = 'SELECT * FROM bloglist'
			try {
				connection.query(sql,(err, result) => {
					if (result.length !== 0) {
						res.json({code: 0, data: result})
					} else {
						res.json({code: 10004, message: 'no data'})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	},
	// 博客 - 获取文章评论
	getBlogRemarkList(req, res, next){
		let qr = req.query
		pool.getConnection((err, connection) => {
			let sql = 'SELECT * FROM blogremarklist WHERE blogtitleid=?'
			try {
				connection.query(sql,[qr.blogtitleid],(err, result) => {
					if (result.length !== 0) {
						res.json({code: 0, data: result})
					} else {
						res.json({code: 10004, message: 'no data'})
					}
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}

		})
	}
}
