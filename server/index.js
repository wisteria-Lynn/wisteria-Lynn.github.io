const bodyParser = require('body-parser')
const express = require('express')
const nodeRouter = require('./nodeRouter')
const app = express()

app.use(bodyParser.json())
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin",'http://localhost:9090');
	res.header("Access-Control-Allow-Origin",'*');
	res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use('/nodeApi',nodeRouter)
app.listen(3000)
console.log('node success list at port 3000')
