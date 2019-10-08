const express = require('express')
const Router = express.Router()
const nodeApi = require('./api/FRDB_API')
const otherApi = require('./api/other_api')

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
module.exports = Router
