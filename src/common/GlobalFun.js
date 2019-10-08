// 全局函数
function packageF (param) {
  console.log(param)
}
function getAPP() {
  console.log('hhhhh')
}

export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.packageF = (param) => packageF(param)
    Vue.prototype.getAPP = () => getAPP()
  }
}
