// 全局组件
import indexSide from '../components/aside/indexSide.vue'

// 导出组件
export default {
  install: function(Vue) {
  	Vue.component('v-base-temp', (resolve) => require(['@/components/modelTemplate/baseTemp'], resolve));
  	Vue.component('v-header', (resolve) => require(['@/components/header/YUheader'], resolve));
  	Vue.component('v-footer', (resolve) => require(['@/components/footer/YUfooter'], resolve));
	Vue.component('v-side', indexSide);
	Vue.component('v-panel-one', (resolve)=>{require(['../components/panel/panel-one'],resolve)});
	Vue.component('v-head-back', (resolve)=>{require(['../components/header/headBack'],resolve)});
	Vue.component('v-head-back-2', (resolve)=>{require(['../components/header/headBack-2'],resolve)});
  }
}
