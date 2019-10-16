//1、path模块是路径设置，不论是在这个配置中还是其他配置中，都是必不可少的。
//2、util是对vue-loader对于css预编译一些提取的工具模块，因为对于个人开发而言，里面提供了sass,less,stylus,possCss等一系列预编译解析的loader。
//3、config是对开发环境和生产环境的一系列不同参数的路径等配置。
//4、vueLoaderConfig也是同样基础生产环境和开发环境对vue-loader进行配置。
const path = require('path')//引入noded的路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//指定html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
//这是一个封装函数，进行传参，获取绝对路径，方便对import时引入地址的方便填写。
//path.join()是对多个字符串进行拼接，此时__dirname是build文件路径..代表在出去一层，就是文件的根路径，dir这个参数则是你要传的文件夹，如果我们传crs的话就从src目录开始查找。
function resolve (dir) {
	return path.join(__dirname, '..', dir)
}
// let env = process.env.NODE_ENV === "development";
module.exports = {
	entry: {//入口
		app:["babel-polyfill",'./src/index.js']
		// app: './src/index.js'//在webpack4中不需要指定入口和出口：不指定输入文件位置的话，则默认为src/index.js.
	},
	output: {//输出
		filename: '[name].[hash].js',//输出名
		path: path.resolve(__dirname, '../dist'),//输出地址//不指定输出文件位置，默认为 dist/main.js
		publicPath: ''
	},
	resolve: {
		extensions: [' ', '.js', '.json', '.vue', '.scss', '.css'],//导入的时候不用写拓展名
		alias: {
			'vue': 'vue/dist/vue.js',//修改webpack,引入vue完整构建，vue重命位置，他将引用的是vue.runtime.js 这个js文件，这个文件是无法将.vue编译的。
			// '@': path.resolve(__dirname, '../src'),//重命名路径
			'@': resolve('src'),
			'assets': resolve('src/assets'),
			'components': resolve('src/components'),
			'api': resolve('src/api'),
			'common': resolve('src/common')
		}
	},
	plugins: [//插件
		new VueLoaderPlugin(),
		//它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
		// html模板
		new HtmlWebpackPlugin({
			title: '首页',
			template: 'index.html',
			filename: 'index.html',
			favicon: './favicon.ico', // 添加小图标
			minify: {  //压缩html
				removeComments: true,  //删除注释
				collapseWhitespace: true  //删除空格
			},
			inject: true
		}),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,//规则转换 .vue,.js,.css等文件转换
				use: ['vue-loader']
			},
			{
				test: /\.js$/,//规则转换 .vue,.js,.css等文件转换
				use: [{
					loader: 'babel-loader',
					options: {
						presets:['es2015']//需要安装转换
					}
				}],
				include: [
					resolve('src'),
					resolve('node_modules/vue-echarts'),
				],//include是代表我们解析的文件只包含那些东西。
				exclude: /node_modules/ //排除
			},
			// {
			// 	test: /\.(js|vue)$/,
			// 	loader: 'eslint-loader',
			// 	enforce: 'pre',
			// 	include: [path.resolve('src'), path.resolve('test')],
			// 	options: {
			// 		formatter: require('eslint-friendly-formatter')
			// 	}
			// },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,//规则转换 字体转换
				use: {
					loader:'url-loader',
					options: {
						useRelativePath:false,//必须为false以免多次引用，使得路径有错
						name:'[name].[hash].[ext]',//打包生成图片的名字
						outputPath:'font/'//输出地址//生成路径
					}
				}
			}
		]
	}
}
