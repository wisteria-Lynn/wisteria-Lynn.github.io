// 全局组件
import headerOne from '../components/header/headerOne.vue'
import indexSide from '../components/aside/indexSide.vue'

// 导出组件
export default {
  install: function(Vue) {
    Vue.component('headerOne', headerOne)
	Vue.component('v-side', indexSide)
  }
}
