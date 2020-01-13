// const mysql = require('mysql')
// const dbConfig = require('../db')
// const pool = mysql.createPool({
// 	host: dbConfig.mysql.host,// 数据库地址
// 	user: dbConfig.mysql.user,// 数据库用户名
// 	password: dbConfig.mysql.password,// 数据库密码
// 	database: dbConfig.mysql.database,// 数据库名称
// 	port: dbConfig.mysql.port,// 数据库端口
// 	multipleStatements: true // 多语句查询
// })
const Base64 = require('js-base64').Base64
const DB = require('../db')
module.exports = {
	// 城市 - 多级查询
	getCity(req, res, next) {
		let qr = req.query // 参数
		DB.connectDB(res,'SELECT * FROM pj_mon_areainfo WHERE code=?',(result)=>{
			if (result.length !== 0) {
				// 返回数据
				res.json({code: 0, data: result})
			}
		},[qr.id === '' ? 0 : qr.id])
	},
	// 登录
	login(req, res, next) {
		let qr = req.body
		DB.connectDB(res,'SELECT * FROM userinfo WHERE username=? AND password=?',(result)=>{
			if (result.length !== 0) {
				res.json({
					code: 0,
					data: {
						username:result[0].username,
						phone:result[0].phone,
						token: '0123456789'
					}
				})
			} else {
				res.json({
					code: 10001,
					message: '账户或密码错误'
				})
			}
		},[qr.username, Base64.decode(qr.password)])
	},
	// 聊天室 - 登录
	chatLogin(req, res, next) {
		let qr = req.body
		DB.connectDB(res,'SELECT * FROM chatuser WHERE chatname=?',(result)=>{
			if (result.length === 0) {
				res.json({code: 10003, message:'用户不存在'})
			} else {
				res.json({code: 0, data: result[0]})
			}
		},[qr.name])
	},
	// 聊天室 - 用户列表
	chatFriendList(req, res, next) {
		let qr = req.query
		DB.connectDB(res,'SELECT * FROM chatuser WHERE chatname=?',(result)=>{
			if (result.length === 0) {
				res.json({code: 10003, message:'用户不存在'})
			} else {
				res.json({code: 0, data: JSON.parse(result[0].friendList)})
			}
		},[qr.name])
	},
	// 聊天室 - 添加朋友
	chatAddFriend(req, res, next) {
		let qr = req.body
		DB.connection(res,(err,connection)=>{
			// 查询用户列表语句
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			// 更新用户朋友字段语句
			let sql_update = 'UPDATE chatuser SET friendList=? WHERE chatname=?'
			let result_1
			let result_2
			connection.query(sql_query,[qr.sendName] ,(err, result1) => {
				// 发送方用户信息
				result_1 =result1[0]
				// 发送方朋友列表
				let fList_1 = JSON.parse(result_1.friendList)
				let openId_1 = result_1.openID
				if(fList_1.length >= 30){
					res.json({code: 20022, message:'最多只能添加30位好友'})
				} else {
					try{
						connection.query(sql_query,[qr.reciveName] ,(err, result2) => {
							if(result2.length !== 0){
								// 接收方用户信息
								result_2 = result2[0]
								// 接收方朋友列表
								let fList_2 = JSON.parse(result_2.friendList)
								let openId_2 = result_2.openID
								// 发送方&&接收方 用户存在
								if (result_1.length !== 0 && result_2.length !== 0) {
									// 发送方添加朋友
									if (qr.type === 'add'){
										// type 0 已发送 1 待同意 2 同意已成为朋友
										fList_1.push({
											"openID":openId_2,
											"username":qr.reciveName,
											"type":0
										})
										fList_2.push({
											"openID":openId_1,
											"username":qr.sendName,
											"type":1
										})
										connection.query(sql_update,[JSON.stringify(fList_1),qr.sendName] ,(err, result3) => {
											// console.log('1',result3)
										})
										connection.query(sql_update,[JSON.stringify(fList_2),qr.reciveName] ,(err, result4) => {
											// console.log('2',result4)
											res.json({code: 0, message:'success'})
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
							} else {
								res.json({code: 10003, message:'name not exit'})
							}
						})
					} catch (e) {
						console.log('操作异常', e)
						res.json({code: 20000, message:'error'})
					}
				}
			})
		})
	},
	// 上传用户头像
	chatUploadAvatar(req, res, next){
		let qr = req.body
		if(qr.avatar === ''){
			res.json({
				code: 1,
				message: '头像不可为空'
			})
		} else {
			DB.connectDB(res,'UPDATE chatuser SET avatar=? WHERE chatname=?',(result)=>{
				if (result.length !== 0) {
					res.json({
						code: 0,
						data: {
							avatar:qr.avatar
						}
					})
				} else {
					res.json({
						code: 1,
						message: '不存在用户'
					})
				}
			},[qr.avatar,qr.username])
		}
	},
	// 聊天室 - 注册
	chatRegist(req, res, next) {
		let qr = req.body
		DB.connection(res,(connection)=>{
			let sql_query = 'SELECT * FROM chatuser WHERE chatname=?'
			let sql = 'INSERT INTO chatuser(chatname) VALUES ("' + qr.name + '")'
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
		})
	},
	// 天气预报 - 获取城市
	// getWeatherCity(req, res, next) {
	// 	pool.getConnection((err, connection) => {
	// 		let sql = 'SELECT * FROM weathercode'
	// 		try {
	// 			connection.query(sql,(err, result) => {
	// 				if (result.length !== 0) {
	// 					res.json({code: 0, data: result})
	// 				}
	// 				connection.release()
	// 			})
	// 		} catch (e) {
	// 			console.log('操作异常', e)
	// 			res.json({code: 20000, message:'error'})
	// 		}
	// 	})
	// },
	// 博客 - 获取文章列表
	// getBlogList(req, res, next){
	// 	let qr = req.query
	// 	pool.getConnection((err, connection) => {
	// 		let sql = 'SELECT * FROM bloglist'
	// 		try {
	// 			connection.query(sql,(err, result) => {
	// 				if (result.length !== 0) {
	// 					res.json({code: 0, data: result})
	// 				} else {
	// 					res.json({code: 10004, message: 'no data'})
	// 				}
	// 				connection.release()
	// 			})
	// 		} catch (e) {
	// 			console.log('操作异常', e)
	// 			res.json({code: 20000, message:'error'})
	// 		}
	//
	// 	})
	// },
	// // 博客 - 获取文章评论
	// getBlogRemarkList(req, res, next){
	// 	let qr = req.query
	// 	pool.getConnection((err, connection) => {
	// 		let sql = 'SELECT * FROM blogremarklist WHERE blogtitleid=?'
	// 		try {
	// 			connection.query(sql,[qr.blogtitleid],(err, result) => {
	// 				if (result.length !== 0) {
	// 					res.json({code: 0, data: result})
	// 				} else {
	// 					res.json({code: 10004, message: 'no data'})
	// 				}
	// 				connection.release()
	// 			})
	// 		} catch (e) {
	// 			console.log('操作异常', e)
	// 			res.json({code: 20000, message:'error'})
	// 		}
	//
	// 	})
	// }
}
