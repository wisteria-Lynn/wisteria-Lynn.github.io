
const Base64 = require('js-base64').Base64
const DB = require('../db')
const pinyin = require("node-pinyin");
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
		DB.connection(res,(err,connection)=> {
			if(qr.type === 'add'){
				connection.query(`SELECT * FROM chatfriend WHERE UID=${qr.sendName} AND FID=${qr.reciveName}`,(err, result) => {
					if(result.length > 0){
						res.json({code: 1, message:'你们已经是好友了'})
					} else {
						res.json({code: 0, message:'success'})
					}
					connection.release()
				})
				connection.query(`INSERT INTO chatfriend(UID,FID,UIDtype,FIDtype) VALUES ("${qr.sendName}","${qr.reciveName}",0,1)`,(err, result) => {
					res.json({code: 0, message:'success'})
					connection.release()
				})
			} else {
				connection.query(`SELECT * FROM chatfriend WHERE UID=${qr.sendName} AND FID=${qr.reciveName}`,(err, result1) => {
					// console.log(result1)
					if(result1.length > 0){
						// console.log(qr.sendName,qr.reciveName)
						connection.query(`UPDATE chatfriend SET UIDtype='2',FIDtype='2' WHERE UID=${qr.sendName} AND FID=${qr.reciveName}`,(err, result) => {
							res.json({code: 0, message:'success'})
							connection.release()
						})
					} else {
						res.json({code: 1, message:'用户不存在'})
					}
				})
			}
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
			// console.log(qr.avatar,qr.openID)
			DB.connectDB(res,'UPDATE chatuser SET avatar=? WHERE openID=?',(result)=>{
				// console.log(result)
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
			},[qr.avatar,qr.openID])
		}
	},
	chatSearch(req, res, next){
		let qr = req.body
		if(qr.keyword === ''){
			res.json({
				code: 1,
				message: '搜索字段不可为空'
			})
		} else {
			DB.connectDB(res,"select * from chatuser where chatname like '%"+qr.keyword+"%'",(result)=>{
				if (result.length !== 0) {
					res.json({
						code: 0,
						data: result
					})
				} else {
					res.json({
						code: 1,
						message: '不存在用户'
					})
				}
			})
		}
	},
	// 聊天室 - 注册
	chatRegist(req, res, next) {
		let qr = req.body
		DB.connection(res,(err,connection)=>{
			connection.query('SELECT * FROM chatuser WHERE chatname=?',[qr.name],(err, result) => {
				// console.log(result)
				if (result.length !== 0) {
					res.json({code: 10002, message:'name exit'})
					connection.release()
				} else {
					let sort = pinyin(qr.name)[0][0][0]
					connection.query(`INSERT INTO chatuser(chatname,sort) VALUES ("${qr.name}","${sort}")`,(err, result2) => {
						// console.log(result2)
						if(result2){
							connection.query(`INSERT INTO chatfriend(UID,FID,UIDtype,FIDtype) VALUES ("${result2.insertId}","${result2.insertId}",2,2)`,(err, result3) => {
								if(result3){
									res.json({code: 0, data: {name:qr.name}})
								}
								connection.release()
							})
						} else {
							res.json({code: 20001, message:'database error'})
						}
					})
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
