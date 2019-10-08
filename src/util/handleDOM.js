/**
 * css 类操作
 * hasClass 检测是否存在类
 * addClass 添加类
 * removeClass 移除类
 * @type {{removeClass: dom.removeClass, hasClass: (function(*, *): *), addClass: dom.addClass}}
 */
export const dom = {
	hasClass: function (obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
	},
	addClass: function (obj, cls) {
		if (!dom.hasClass(obj, cls)) obj.className += ' ' + cls
	},
	removeClass: function (obj, cls) {
		if (dom.hasClass(obj, cls)) {
			const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
			obj.className = obj.className.replace(reg, '')
		}
	}
}

/**
 * 处理 css类 显示
 * @param $el
 */
export const previewShow = ($el) => {
	$el.childNodes[1].classList.add('show-1')
	$el.childNodes[1].classList.remove('hidden')
}
/**
 * 处理 css类 隐藏
 * @param $el
 */
export const previewHidden = ($el) => {
	$el.childNodes[1].classList.add('hidden')
	$el.childNodes[1].classList.remove('show-1')
}

/**
 * 平滑滑动
 * total 目标元素距离顶部高度
 * distance  滚动条距离顶部高度
 * element 包含滚动条的div元素id | 值为空时，元素为document
 * */
export const Scroll = {
	element: '',
	scrollInt: function (total, distance, element) {
		this.element = element
		let step = Math.abs(distance - total) / 30
		if (total > distance) {
			Scroll.scrollDown(step, total, distance)
		} else {
			Scroll.scrollUp(step, total, distance)
		}
	},
	//向下滑动
	scrollDown: function (step, total, distance) {
		if (distance < total) {
			distance += step
			if (distance > total) {
				distance = total
			}
			if(this.element === ''){
				document.documentElement.scrollTop = distance
			} else {
				document.getElementById(this.element).scrollTop = distance
			}
			setTimeout(() => Scroll.scrollDown(step, total, distance), 20)
		}
	},
	//向上滑动
	scrollUp: function (step, total, distance) {
		if (distance > total) {
			distance -= step
			if (distance < total) {
				distance = total
			}
			if(this.element === ''){
				document.documentElement.scrollTop = distance
			} else {
				document.getElementById(this.element).scrollTop = distance
			}
			setTimeout(() => Scroll.scrollUp(step, total, distance), 20)
		}
	},
	// 路由切换，滚动条回顶部
	goTop: function (router) {
		router.afterEach((to, from, next) => {
			window.scrollTo(0, 0)
		})
	},
	// 获取滚动条距离顶部高度
	scrollTop:function(){
		let scroll_top = 0
		if (document.documentElement && document.documentElement.scrollTop) {
			scroll_top = document.documentElement.scrollTop
		} else if (document.body) {
			scroll_top = document.body.scrollTop
		}
		return scroll_top
	}
}

/**
 * 处理节流
 * @param fn 回调函数
 * @param delay 延时(s)
 * @returns {Function}
 */
export const throttle = function (fn, delay) {
	let timer = null
	return function () {
		clearTimeout(timer)
		timer = setTimeout(function () {
			fn.call(this)
		}, delay)
	}
}
