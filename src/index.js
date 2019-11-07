import 'babel-polyfill'
import App from './app.vue'
import Vue from 'vue'
import routes from './router/index.js'
import Router from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import STORE from './vuex/store'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
require('./mock/mock.js')
// 页面标题json文档
import pageTitle from './common/pageTitle.json'
// 全局变量
import WS from './common/websocket'
import GlobalVal from './common/GlobalVal'
// 全局函数
import GlobalFunc from './common/GlobalFun'
// 过滤器
// 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
import * as filter from './common/filter'

// 过滤器注册
Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})
// 全局组件
import GlobalComponent from './common/GlobalComponent'

// UI
import {
	Pagination,
	Dialog,
	// Autocomplete,
	// Dropdown,
	// DropdownMenu,
	// DropdownItem,
	// Menu,
	// Submenu,
	// MenuItem,
	// MenuItemGroup,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	RadioButton,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Switch,
	Select,
	Option,
	OptionGroup,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	// DatePicker,
	// TimeSelect,
	// TimePicker,
	Popover,
	Tooltip,
	// Breadcrumb,
	// BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tag,
	// Tree,
	// Alert,
	// Slider,
	// Icon,
	Row,
	Col,
	Upload,
	// Progress,
	// Spinner,
	// Badge,
	Card,
	Rate,
	// Steps,
	// Step,
	// Carousel,
	// CarouselItem,
	Collapse,
	CollapseItem,
	// Cascader,
	// ColorPicker,
	// Transfer,
	// Container,
	Header,
	Aside,
	Main,
	Footer,
	Timeline,
	TimelineItem,
	// Link,
	// Divider,
	// Image,
	// Calendar,
	// Backtop,
	// PageHeader,
	// CascaderPanel,
	Loading,
	MessageBox,
	Message,
	Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
// Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
// Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
// Vue.use(Link);
// Vue.use(Divider);
// Vue.use(Image);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import layer from 'vue-layer'

// UI
Vue.prototype.layer = layer(Vue)
// Vue.use(ElementUI)

// vuex
Vue.use(Vuex)
Vue.use(Viewer, {
	debug: true,
	defaultOptions: {
		'inline': false,
		'navbar': false,
		'url': 'data-source',
		zIndex: 9999
	}
})
// 路由
Vue.use(Router)
const router = new Router({
  routes
})
/* 请求拦截器 */
axios.interceptors.request.use(
	config => {
		let token = localStorage.getItem('userToken')
		if (token) {
			config.headers.token = token
		}
		// config.url = process.env.NODE_ENV === 'production' ? apiMode.SERVICE_CONTEXT_PATH + config.url : 'apis' + config.url
		// config.url = apiMode.SERVICE_CONTEXT_PATH + config.url
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
/**
 * axios拦截器，后台响应是否需要重新登录
 */
axios.interceptors.response.use(
	response => {
		function login() {
			// 清除token信息并跳转到登录页面
			localStorage.removeItem('userToken')
			router.replace({
				path: '/login',
				query: {redirect: router.currentRoute.fullPath}
			})
		}
		// console.log(response)
		if (response) {
			switch (response.data.code) {
				case 11001:
					login()
					break
				case 10004:
					login()
					break
			}
		}
		return response
	},
	error => {
		return Promise.reject(error.response.data) // 返回接口返回的错误信息
	}
)
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
// 路由前置
router.beforeEach((to, from, next) => {
  // 修改标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    let Titlekey = Object.keys(pageTitle).find((val, index, arr) => {
      return val === to.path
    })
    document.title = pageTitle[Titlekey] || '找不到页面'
  }
  // 登录验证token
  if (to.meta.requireAuth) {
  	if (!store.state.USER.isLogin) {
  		next({
			path:'/login',
			query:{
				redirect:to.fullPath
			}
		})
	}
  }
  next()
})

// 引入全局变量/全局函数/全局组件
Vue.prototype.GLOBAL = GlobalVal
Vue.prototype.WS = WS
Vue.use(GlobalFunc)
Vue.use(GlobalComponent)

// 去掉生产模式的警告
// Vue.config.productionTip=false

// 状态管理
let store = new Vuex.Store(STORE)

// 新建Vue实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
