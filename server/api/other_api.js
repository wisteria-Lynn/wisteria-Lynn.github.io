let http=require("http")
module.exports = {
	getWeather(cityCode,callBack){
	// getWeather2(cityCode,callBack){
		let options = {
			protocol : 'http:',
			hostname : 't.weather.sojson.com',
			port:'80',
			path : '/api/weather/city/'+cityCode,
			method : 'get',
			headers: {
				'User-Agent': 'request'
			}
		}
		let requset2 = http.request(options,(res2) => {
			// res2.setEncoding('utf8')
			let info = ''
			res2.on('data',(chunk) => {
				info +=chunk
				// console.log('data:'+chunk.toString())
			})
			res2.on('end',()=> {
				callBack(JSON.parse(info))
			})
		})
		requset2.on('error',(err) => {
			console.log('error:' + err.message)
		})
		requset2.end()
	},
	queryWeather(cityCode,callback) {
	// getWeather(cityCode,callback) {
		let options = {
			protocol: 'http:',
			hostname: 'www.weather.com.cn',
			port: 80,
			path: '/data/sk/' + cityCode + '.html',
			method: 'get'
		}

		let req = http.request(options, (res) => {
			let info = '';

			res.on('data', (chunk) => {
				info += chunk;
			});
			res.on('end', () => {
				info = JSON.parse(info);
				callback(info);
			});
		});

		req.end();
	}
}
