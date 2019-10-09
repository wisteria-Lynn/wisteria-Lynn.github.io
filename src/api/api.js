// 全局api
import axios from 'axios'
/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err.data)
		})
	})
}

/**
 * 封装post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err.data)
			})
	})
}

/**
 * 后台返回code对应文本信息
 * @param code {int} code码
 * @param message {String} 后台返回的信息
 * @return {string} 返回的文本信息
 */
export function codeText(code,message) {
	switch (code) {
		case 404:
			return '404 Not Found'
		// 全局
		case 10001:
			return '用户名或密码错误'
		case 10002:
			return '用户名已经存在'
		case 10003:
			return '用户名不存在'
		case 10004:
			return '查不到数据'
		case 20000:
			return '操作数据库异常'
		case 20001:
			return '数据库插入错误'
		default:
			return message
	}
}

