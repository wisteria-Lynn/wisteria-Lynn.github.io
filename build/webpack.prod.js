const webpack = require('webpack')
const path = require('path')//引入noded的路径
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')//清除dist
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')//js压缩
const HtmlWebpackPlugin = require('html-webpack-plugin')//指定html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//css抽取
const optimizeCss = require('optimize-css-assets-webpack-plugin')//css压缩
const base = require('./webpack.base.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin//webpack打包体积优化，详细分布查看插件
const copyWebpackPlugin = require("copy-webpack-plugin") // 静态文件输出

console.log('当前是生产环境:production')

module.exports = merge(base, {
	mode: 'production',//在 webpack 4+ 中，你可以使用 mode 选项：会将 process.env.NODE_ENV 设置成 production
	devtool: 'source-map',//debug工具
	output: {
		filename: 'js/[name].[hash].js',//输出名
		path: path.resolve(__dirname, '../dist'),//输出地址
	},
	plugins: [
		// new UglifyJSPlugin({//Js压缩
		// 	sourceMap: true
		// }),// webpack4已废弃
		new CleanWebpackPlugin(['./dist'], {
			root: path.resolve(__dirname, '../'),    // 设置root不会清楚目录原因在于，这个插件会认为webpack.config.js所在的目录为项目的根目录。
			verbose: true//开启在控制台输出消息  只使用第一个参数的话，会报错移除目标的目录位置不对：
		}),
		// new webpack.DefinePlugin({
		//   'process.env.NODE_ENV':JSON.stringify('production')//指定环境
		// }),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css'//抽取 css 成单个文件 之前使用的 extract-text-webpack-plugin 不再支持webpack4，官方出了 mini-css-extract-plugin 来处理css的抽取
		}),
		new optimizeCss({
			// assetNameRegExp:/.css$/,//默认抽取.css
			cssProcessor: require('cssnano'),//引入cssnano配置压缩选项
			cssProcessorOptions: {
				discardComments: {removeAll: true}
			},
			canPrint: true//是否将插件信息打印到控制台
		}),
		new HtmlWebpackPlugin({
			title: '首页',
			template: 'index.html',
			filename: 'index.html',
			favicon: './favicon.ico', // 添加小图标
			inject: true
		}),
		new BundleAnalyzerPlugin(),
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),    //要打包的静态资源目录地址，这里的__dirname是指项目目录下，是node的一种语法，可以直接定位到本机的项目目录中
			to: './static'  //要打包到的文件夹路径，跟随output配置中的目录。所以不需要再自己加__dirname
		}])
	],
	optimization: {//提取公有代码到一个文件
		//webpack本身的runtime代码 单独生成名为manifest-*.js的文件。
		runtimeChunk: {
			"name": "manifest"
		},
		//我们需要将所有的第三方库抽离出来。将chunks值改为all(先前的默认值为async)，表示对所有的第三方库进行代码分割(包括async和initial)。此时生产的代码中多了一个vendors~main.*.js文件。
		splitChunks: {
			chunks:'all',
			// 需要新加一个cacheGroup，该cacheGroup对于被引用
			// 此时大于等于2的module进行分割
			cacheGroups: {
				common: {
					minChunks: 2,
					name: 'commons',
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
		// minimize:true,
		// splitChunks: {// SplitChunks 是由 webpack 4 内置的 SplitChunksPlugin 插件提供的能力，可直接在 optimization 选项中配置
		// 	cacheGroups: {
		// 		styles: {
		// 			name: 'styles',
		// 			test: /\.(le|sa|sc|c)ss$/,
		// 			chunks: 'all',
		// 			enforce: true
		// 		}
		// 	}
		// }
	},
	module: {
		rules: [
			{
				test: /\.(le|sa|sc|c)ss$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../'//压缩抽取css时，css中图片路径的解决
					}
				},
					'css-loader',
					'less-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.resolve(__dirname, '../src/assets/less/common.less'),
							]
						}
					}
				]
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
