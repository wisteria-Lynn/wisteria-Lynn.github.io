const mysql = require('mysql')
const dbConfig = {
	mysql: {
		host:'localhost',
		user:'root',
		password:'admin',
		database:'myfirstdb',
		port:'3306'
	},
	mysql2: {
		host:'localhost',
		user:'root',
		password:'admin',
		database:'myfirstdb',
		port:'3306'
	}
}
const pool = mysql.createPool({
	host: dbConfig.mysql.host,// 数据库地址
	user: dbConfig.mysql.user,// 数据库用户名
	password: dbConfig.mysql.password,// 数据库密码
	database: dbConfig.mysql.database,// 数据库名称
	port: dbConfig.mysql.port,// 数据库端口
	multipleStatements: true // 多语句查询
})

module.exports = {
	connectDB(res,sql,callBack,code){
		pool.getConnection((err, connection) => {
			try {
				connection.query(sql, code, (err, result) => {
					callBack(result)
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}
		})
	},
	connection(res,callBack){
		pool.getConnection((err, connection) => {
			try {
				callBack(err,connection)
			} catch (e) {
				console.log('操作异常', e)
				res.json({code: 20000, message:'error'})
			}
		})
	},
	connectChatDB(sql,callBack,code){
		pool.getConnection((err, connection) => {
			try {
				connection.query(sql, code, (err, result) => {
					callBack(result)
					connection.release()
				})
			} catch (e) {
				console.log('操作异常', e)
			}
		})
	},
	connectChat(callBack){
		pool.getConnection((err, connection) => {
			try {
				callBack(err,connection)
			} catch (e) {
				console.log('操作异常', e)
			}
		})
	}
}
