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
		path: '/demo',
		name: 'demo',
		meta: {
			title: '演示',
			// requireAuth: true
		},
		component: resolve => require(['../pages/demo/demoIndex.vue'], resolve),
		children: [
			{
				path: 'indexAnima',
				name: 'demo-indexAnima',
				meta: {
					title: '城市级联',
					// requireAuth: true
				},
				component: resolve => require(['../pages/demo/indexAnima.vue'], resolve),
			}
		]
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
				path: 'chatLogin',
				name: 'chatLogin',
				meta: {
					title: '聊天室登录',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/chat/chatLogin.vue'], resolve)
			},
			{
				path: 'chat',
				name: 'chat',
				meta: {
					title: '聊天室',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/chat/chat.vue'], resolve)
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
					title: '小说详情',
					// requireAuth: true
				},
				component: resolve => require(['../pages/novel/novelDetail.vue'], resolve),
			},
			{
				path: 'addNovel',
				name: 'addNovel',
				meta: {
					title: '添加',
					// requireAuth: true
				},
				component: resolve => require(['../pages/novel/addNovel.vue'], resolve),
			}
		]
	},
	{
		path: '/blog',
		name: 'blog',
		meta: {
			title: '博客',
			// requireAuth: true
		},
		component: resolve => require(['../pages/blog/blog.vue'], resolve),
		children: [
			{
				path: 'city',
				name: 'city',
				meta: {
					title: '城市级联',
					// requireAuth: true
				},
				component: resolve => require(['../pages/project/city/city.vue'], resolve),
			}
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
