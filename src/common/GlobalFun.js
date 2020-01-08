// 全局函数

// 判断当前设备是否为手机
function isMobileBrowser() {
	return (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
}

function enterTxt(str) {
	return str.replace(/\t/g, "").replace(/\n/g, "<br/>")
}
// 格式化时间
function format(fmt){
	let o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(let k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}
// 下载链接
function download(filename, text) {
	let pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	if (document.createEvent) {
		let event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}
export default {
	// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
	install: function (Vue) {
		Vue.prototype.isMobileBrowser = () => isMobileBrowser()
		Vue.prototype.enterTxt = (s) => enterTxt(s)
		Vue.prototype.format = (s) => format(s)
		Vue.prototype.download = (s) => download(s)
	}
}
