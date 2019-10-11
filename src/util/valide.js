
/**
 * 图片尺寸是否符号要求
 * @param size 文件尺寸
 * @param n 要求的尺寸 MB
 * @returns {boolean}
 */
export let fileSizeMB = function(size, n) {
	return Math.floor(size / 1024 / 1024) < n;
};
/**
 * * 检查图片是否损坏
 * @param file 图片对象
 * @param size 图片需求大小 MB number
 * @param type 图片需求类型 array类型
 * @param callBack 图片回调函数
 * @returns {Promise<any>}
 */
export let checkImg = (file, size, type, callBack) => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		let _URL = window.URL || window.webkitURL;
		img.onload = () => {
			if (type.indexOf(file.type) < 0) {
				callBack(`上传图片只能是 ${type.toString().replace(/image\//g, '')} 格式!`);
				reject(false);
			}
			if (!fileSizeMB(file.size, size)) {
				callBack(`图片大小不能超过 ${size}MB!`);
				reject(false);
			}
			resolve(true);
		};
		img.onerror = () => {
			if (img.width === 0 || img.height === 0) {
				callBack('选择的文件不是图片或图片已损坏，请重新上传!');
				reject(false);
			}
		};
		img.src = _URL.createObjectURL(file);
	});
};
