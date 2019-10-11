import axios from "axios"
// import QS from 'qs'
import { post, get } from './api'

// 登录
// export const saveUserInfo = p => post('/api/saveUserInfo', p)

export const city = p => post('/nodeApi/getCity', p)
export const login = p => post('/nodeApi/login', p)
// export const login = p => {
// 	return new Promise((resolve, reject) => {
// 		resolve({
// 			code:0
// 		})
// 	})
// }

//天气
export const getWeather = p => get('/nodeApi/weather',p)
export const getWeatherCity = p => get('/nodeApi/getWeatherCity',p)
export const getReadFile = p => get('/nodeApi/getReadFile',p)

// websocket 聊天
export const chatLogin = p => post('/nodeApi/chatLogin', p)
export const chatRegist = p => post('/nodeApi/chatRegist', p)
export const chatFriendList = p => get('/nodeApi/chatFriendList', p)
export const chatAddFriend = p => post('/nodeApi/chatAddFriend', p)
// export const chatReciveFriend = p => post('/nodeApi/chatFriendList', p)


// 博客
export const getBlogList = p => get('/nodeApi/getBlogList', p)
export const getBlogRemarkList = p => get('/nodeApi/getBlogRemarkList', p)
