import Mock from 'mockjs'
import {citys} from '../../static/js/citylink'

Mock.mock('/nodeApi/login','post',function(data){
	// let params = JSON.parse(data.body).params
	let params = JSON.parse(data.body)
	if (params.username === '流莹离'&&params.password === '1234567890') {
		return {
			'code':0,
			'message':'登陆成功',
			'token': '0123456789'
		}
	}
	return {
		'code':1,
		'message':'登陆失败'
	}
})

Mock.mock('/nodeApi/getCity','post',function(data){
	let params = JSON.parse(data.body).id || 0
	let result = citys.filter((cur,index,arr)=>{
		return cur.code == params
	})
	return result.length > 0 ? {
		code:0,
		data: result
	} : {
		'code':1,
		'message':'获取失败'
	}
})
