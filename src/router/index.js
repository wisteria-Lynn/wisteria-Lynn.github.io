const routes = [
	{
		path: '/',
		name: 'index',
		meta: {
			title: '流莹离的个人博客',
			// requireAuth: true
		},
		component: resolve => require(['../pages/index.vue'], resolve)
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			requireAuth: false
		},
		component: resolve => require(['../pages/login/login.vue'], resolve)
	},
	{
		path: '/addfile',
		name: 'addfile',
		meta: {
			title: '添加',
			// requireAuth: true
		},
		component: resolve => require(['../pages/addfile.vue'], resolve),
	},
	{
		path: '/demo',
		name: 'demo',
		meta: {
			title: '演示',
			// requireAuth: true
		},
		component: resolve => require(['../pages/project/demoIndex.vue'], resolve)
	},
	{
		path: '/project',
		name: 'project',
		meta: {
			title: '小项目',
			// requireAuth: true
		},
		component: resolve => require(['../pages/project/projectIndex.vue'], resolve),
		children: [
			{
				path: 'city',
				name: 'city',
				meta: {
					title: '城市级联',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/city/city.vue'], resolve),
			},
			{
				path: 'weather',
				name: 'weather',
				meta: {
					title: '天气预报',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/weather/weatherIndex.vue'], resolve),
			},
			{
				path: 'canvasDemo',
				name: 'canvasDemo',
				meta: {
					title: 'canvas绘图',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/canvasDemo/canvasDemo.vue'], resolve)
			},
			{
				path: 'cssAnimaDemo',
				name: 'cssAnimaDemo',
				meta: {
					title: 'css动画演示',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/cssAnimaDemo/cssAnimaDemo.vue'], resolve)
			},
			{
				path: 'imgLazyLoad',
				name: 'imgLazyLoad',
				meta: {
					title: '图片懒加载',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/imgLazyLoad/imgLazyLoad.vue'], resolve)
			},
			{
				path: 'addLister',
				name: 'addLister',
				meta: {
					title: '监听网页操作',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/addLister/addLister.vue'], resolve)
			},
			{
				path: 'indexAnima',
				name: 'indexAnima',
				meta: {
					title: '主页动画加载',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/indexAnima/indexAnima.vue'], resolve)
			},{
				path: 'cropper',
				name: 'cropper',
				meta: {
					title: '图片裁剪',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/cropper/cropper.vue'], resolve)
			},{
				path: 'bgScroll',
				name: 'bgScroll',
				meta: {
					title: '背景无限滚动',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/bgScroll/bgScroll.vue'], resolve)
			},{
				path: 'bgScroll2',
				name: 'bgScroll2',
				meta: {
					title: '背景无限滚动',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/bgScroll/bgScroll2.vue'], resolve)
			},{
				path: 'demo2',
				name: 'demo2',
				meta: {
					title: '其他演示',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/demo/demo.vue'], resolve)
			},
		]
	},
	{
		path: '/novel',
		name: 'novel',
		meta: {
			title: '小说',
			// requireAuth: true
		},
		component: resolve => require(['../pages/novel/novelIndex.vue'], resolve),
		children: [
			{
				path: 'novelDetail',
				name: 'novelDetail',
				meta: {
					title: '小说简介',
					// requireAuth: true
				},
				component: resolve => require(['../pages/novel/novelDetail.vue'], resolve),
			},
			{
				path: 'novelRead',
				name: 'novelRead',
				meta: {
					title: '小说阅读',
					// requireAuth: true
				},
				component: resolve => require(['../pages/novel/novelRead.vue'], resolve),
			}
		]
	},
	{
		path: '/curriculumVitae',
		name: 'curriculumVitae',
		meta: {
			title: '简历',
			// requireAuth: true
		},
		component: resolve => require(['../pages/curriculumVitae/curriculumVitae.vue'], resolve)
	},
	{
		path: '/wechat',
		name: 'wechat',
		meta: {
			title: '聊天',
			// requireAuth: true
		},
		component: resolve => require(['../pages/wechat/wechat.vue'], resolve),
		children: [
			{
				path: 'friendList',
				name: 'friendList',
				meta: {
					title: '聊天列表',
					// requireAuth: true
				},
				component: resolve => require(['../pages/wechat/friendList.vue'], resolve),
			},{
				path: 'chatLogin',
				name: 'chatLogin',
				meta: {
					title: '聊天室登录',
					// requireAuth: true
				},
				component: resolve => require(['../pages/wechat/chatLogin.vue'], resolve)
			},{
				path: 'chatPage',
				name: 'chatPage',
				meta: {
					title: '',
					// requireAuth: true
				},
				component: resolve => require(['../pages/wechat/chatPage.vue'], resolve)
			},{
				path: 'chat',
				name: 'chat',
				meta: {
					title: '聊天室',
					// requireAuth: true
				},
				component: resolve => require(['../pages/wechat/chat.vue'], resolve)
			},
		]
	},
	// {
	// 	path: '/websocket',
	// 	meta: {
	// 		title: 'websocket',
	// 		requireAuth: true
	// 	},
	// 	component: resolve => require(['../pages/project/chat/websocket.vue'], resolve)
	// },
	// {
	// 	path: '/websocket2',
	// 	meta: {
	// 		title: 'websocket2',
	// 		requireAuth: true
	// 	},
	// 	component: resolve => require(['../pages/project/chat/websocket2.vue'], resolve)
	// },
	{
		path: '/404',
		name: '404',
		component: resolve => require(['../pages/404.vue'], resolve)
	},
	{
		path: '*',
		component: resolve => require(['../pages/404.vue'], resolve)
	}
]

export default routes
