const express = require('express')
const Router = express.Router()
const nodeApi = require('./api/FRDB_API')
const otherApi = require('./api/other_api')
const read = require('./readFile/read')

Router.get('/getCity',(req, res, next) => {
	nodeApi.getCity(req, res, next)
})

Router.post('/login',(req, res, next) => {
	nodeApi.login(req, res, next)
})

Router.post('/chatLogin',(req, res, next) => {
	nodeApi.chatLogin(req, res, next)
})

Router.post('/chatRegist',(req, res, next) => {
	nodeApi.chatRegist(req, res, next)
})

Router.get('/chatFriendList',(req, res, next) => {
	nodeApi.chatFriendList(req, res, next)
})

Router.post('/chatAddFriend',(req, res, next) => {
	nodeApi.chatAddFriend(req, res, next)
})

Router.get('/weather',(req, res, next) => {
	otherApi.getWeather(req.query.code,(data)=>{
		res.json({code: 0, data: data})
	})
})
Router.get('/getWeatherCity',(req, res, next) => {
	nodeApi.getWeatherCity(req, res, next)
})
Router.get('/getBlogList',(req, res, next) => {
	nodeApi.getBlogList(req, res, next)
})
Router.get('/getBlogRemarkList',(req, res, next) => {
	nodeApi.getBlogRemarkList(req, res, next)
})
Router.get('/getReadFile',(req, res, next) => {
	read.readFileByLine('D:\\Lynn\\myproject\\wisteria-Lynn.github.io\\static\\js\\novel\\novel-1001\\年少许.txt',(data)=>{
		let arr = []
		let obj = {
			title:'',
			txt:[]
		}
		for(let i = 0;i<data.length;i++){
			let start = data[i].indexOf('第')
			let end = data[i].indexOf('章')
			data[i] = data[i].replace(' ','')
			if((start > -1 && end > -1 && data[i].length < 30) || i===data.length - 1){
				obj.title = obj.title || '序言'
				arr.push(obj)
				obj = {
					title:'',
					txt:[]
				}
				obj.title = data[i].substring(end+1)
			} else {
				obj.txt.push(data[i])
			}
		}
		read.createdFile('D:\\Lynn\\myproject\\wisteria-Lynn.github.io\\static\\js\\novel\\novel-1006.js','export const novel = '+JSON.stringify(arr),(msg)=>{
			res.json({
				message:msg
			})
		})
	})
})
module.exports = Router
