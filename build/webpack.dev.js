const path = require('path')//引入noded的路径
const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')
// const websockt = require('../server/websocket/socket')
// const server = require('../server/index')
console.log('当前是开发环境:development')

module.exports = merge(base, {
	mode: 'development',//在 webpack 4+ 中，你可以使用 mode 选项：会将 process.env.NODE_ENV 设置成 development
	devtool: 'inline-source-map',//debug工具
	devServer: {
		contentBase: path.join(__dirname, './dist'),//告诉开发服务器(dev server)，在哪里查找文件
		// contentBase:'./dist',
		host: 'localhost',
		port: 9000,//设置端口号
		overlay: true,//这个配置属性用来在编译出错的时候，在浏览器页面上显示错误，默认是false，
		stats: 'errors-only',//配置属性用来控制编译的时候输出内容，errors-only"表示只打印错误：
		inline: true,//实时刷新
		hot: true, //热加载
		open: true,  //open选项被设置为true时，dev server将直接打开浏览器
		// publicPath:'',//用于设置编译后文件的路径，假设服务器的运行地址是 http://localhost:8080，输出文件名设置为bundle.js，那么默认情况下publicPath是”/”，因此文件地址为http://localhost:8080/bundle.js 如果想要设置为别的路径可以这样
		//publicPath: "/assets/",
		proxy: {
			// "/city": {
			// 	target: "http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html",
			// 	secure: false,  // 如果是https接口，需要配置这个参数
			// 	changeOrigin: true,  // 是否跨域
			// 	pathRewrite: {"^/api": ""}
			// },
			"/nodeApi": {
				target: "http://localhost:3000/nodeApi",
				secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true,  // 是否跨域
				pathRewrite: {"^/nodeApi": ""}
			}
		}//重定向,//代理
	},
	plugins: [
		new webpack.NamedModulesPlugin(),//热加载
		new webpack.HotModuleReplacementPlugin()//热加载
	],
	module: {
		rules: [//开发环境下的规则
			{
				test: /\.(le|c|sa|sc)ss$/,
				use: ['style-loader', 'css-loader', 'less-loader',{
					loader: 'sass-resources-loader',
					options: {
						resources: [
							path.resolve(__dirname, '../src/assets/less/color.less'),
						]
					}
				}]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				use: [
					{
						loader: 'url-loader',
						// loader: 'file-loader',
						options: {
							limit: 10000,// 表示小于10kb的图片转为base64,大于50kb的是路径、、默认是10kb
							useRelativePath: false,//必须为false以免多次引用，使得路径有错
							name: '[name].[hash].[ext]',//打包生成图片的名字
							outputPath: 'img/'//输出地址
						}
					},
					// {
					// 	loader: 'image-webpack-loader',//压缩图片，这里安装不成功
					// 	options: {
					// 		bypassOnDebug:true
					// 	}
					// }
				]
			}
		]
	}
})
