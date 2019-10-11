let fs = require('fs')
let readline = require('readline')
module.exports = {
	createdFileDir(callBack) {
		// 创建文件夹
		fs.mkdir('test', function (err) {
			if (err) {
				callBack(err)
				return;
			}
			callBack('success')
		})
	},
	readFile(filename, callBack) {
		// 读取文件
		fs.readFile(filename, 'utf-8', function (err, data) {
			if (err) {
				callBack(err)
			} else {
				callBack(data)
			}
		})
	},
	createdFile(filename, content, callBack) {
		// 写文件
		fs.writeFile(filename, content, function (err) {
			if (err) {
				callBack(err)
				return
			}
			callBack('success')
		})
	},
	readFileByLine(fReadName, callback) {
		let fRead = fs.createReadStream(fReadName);
		let objReadline = readline.createInterface({
			input: fRead
		});
		let arr = [];
		objReadline.on('line', function (line) {
			let l = line.replace(/\s*/,'')
			if(l){//去除空格空行
				arr.push(l);
			}
		});
		objReadline.on('close', function () {
			callback(arr);
		});
	}
}
