module.exports = {
	randomCoding(n) {
		//创建26个字母数组
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let val = '';
		for (let i = 0; i < n; i++) {
			val += str[Math.floor(Math.random() * 62)];
		}
		return val;
	}
}
