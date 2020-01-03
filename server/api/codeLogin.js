const Utils = require('../utils/index')
let uidLine = []
let uidLineTime = []
let uidAllow = []
let times = 60*1000
let timeIDList = []
function setTime(){
	return setInterval(()=>{
		console.log('定时器')
		if(uidLine.length <=0){
			clear()
		}
		for(let i in uidLine){
			let date = new Date()
			console.log(date.getTime() - uidLineTime[i].getTime())
			if(date.getTime() - uidLineTime[i].getTime() > 2*60*1000){
				uidLine.splice(i,1)
				uidLineTime.splice(i,1)
			}
		}
	},times)
}
timeIDList.push(setTime())
// console.log(timeIDList)
function clear(){
	for(let i in timeIDList){
		clearInterval(timeIDList[i])
	}
}
module.exports = {
	createUid(req, res, next){
		let qr = req.body
		console.log(uidLine,uidLineTime)
		if(qr.size){
			let uid = Utils.randomCoding(qr.size)
			if(uidLine.indexOf(uid) > -1){
				this.createUid(req, res, next)
			} else {
				console.log(uid)
				uidLine.push(uid)
				uidLineTime.push(new Date())
				if(timeIDList.length <=0){
					console.log('定时器2开始')
					timeIDList.push(setTime())
				}
				res.json({code: 0, data:uid })
			}
		} else {
			res.json({
				code: 1,
				message: '参数不能为空'
			})
		}
	},
	UidLogin(req, res, next){
		let qr = req.body
		if(qr.uid){
			let index = uidLine.indexOf(qr.uid)
			let date = new Date
			if(index > -1 &&(date.getTime() - uidLineTime[index].getTime() < 2* 60 *1000)){
				uidAllow.push(qr.uid)
				res.json({
					code: 0
				})
			} else {
				res.json({
					code: 1,
					message: '二维码已失效'
				})
			}
		} else {
			res.json({
				code: 1,
				message: '参数不存在'
			})
		}
	},
	queryUid(req, res, next){
		let qr = req.body
		if(qr.uid){
			let index = uidAllow.indexOf(qr.uid)
			if(index > -1){
				uidAllow.splice(index,1)
				res.json({
					code: 0
				})
			} else {
				res.json({
					code: 1,
					message: '二维码暂未扫描或确定'
				})
			}
		} else {
			res.json({
				code: 1,
				message: '参数不存在'
			})
		}
	}
}
