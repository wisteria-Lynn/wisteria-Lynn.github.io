// import Mock from 'mockjs'
//
// Mock.mock('/api/saveUserInfo','post',function(data){
// 	// let params = JSON.parse(data.body).params
// 	let params = JSON.parse(data.body)
// 	if (params.username === '111'&&params.password === '111') {
// 		return {
// 			'status':0,
// 			'message':'成功',
// 			'token': '0123456789'
// 		}
// 	}
// 	return {
// 		'status':1,
// 		'message':'失败'
// 	}
// })
//
// Mock.mock('/api/getTokening','post',function(data){
// 	// let params = JSON.parse(data.body).params
// 	let params = JSON.parse(data.body)
//
// 	if (params.token && params.token === '0123456789') {
// 		return {
// 			'status':0,
// 			'message':'成功',
// 			'token': '0123456789'
// 		}
// 	}
// 	return {
// 		'status':1,
// 		'message':'失败'
// 	}
// })
