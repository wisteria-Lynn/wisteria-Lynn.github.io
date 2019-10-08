
# 创建项目
创建一个目录 webpack-demo，初始化npm
```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

>使用webpack4+,需要安装cli

添加src/GlobalVal.js ,/index.html文件

# 创建一个bundle文件

调整下目录结构，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载

要在 GlobalVal.js 中打包 lodash 依赖，我们需要在本地安装 library：

```
npm install --save lodash
```
>在安装一个要打包到生产环境的安装包时，你应该使用 npm install --save，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用 npm install --save-dev。

在我们的脚本index.js中 import lodash：

GlobalVal.js 显式要求引入的 lodash 必须存在，然后将它绑定为 _（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个优化过的，会以正确顺序执行的 bundle。

可以这样说，执行 ，会将我们的脚本作为入口起点，然后 输出 为 main.js。Node 8.2+ 版本提供的 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件

```
npx webpack

Hash: dabab1bac2b940c1462b
Version: webpack 4.0.1
Time: 3003ms
Built at: 2018-2-26 22:42:11
    Asset      Size  Chunks             Chunk Names
main.js  69.6 KiB       0  [emitted]  main
Entrypoint main = main.js
   [1] (webpack)/buildin/module.js 519 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] ./src/GlobalVal.js 256 bytes {0} [built]
    + 1 hidden module

WARNING in configuration(配置警告)
```

浏览器中打开 index.html，如果一切访问都正常，你应该能看到以下文本：'Hello webpack'

# 使用一个配置文件

在 webpack 4 中，可以无须任何配置使用，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 配置文件。这比在终端(terminal)中手动输入大量命令要高效的多，
所以让我们创建一个取代以上使用 CLI 选项方式的配置文件：

添加 webpack.config.js 导出入口出口文件,
```
const path=require('path')

module.exports={
  entry: "./src/GlobalVal.js",
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist')
  }
}
```
dist/index.html 修改
```
<!--<script src="main.js"></script>-->
<script src="./bundle.js"></script>
```

在执行如下命令

```
npx webpack --config webpack.config.js

Hash: dabab1bac2b940c1462b
Version: webpack 4.0.1
Time: 328ms
Built at: 2018-2-26 22:47:43
    Asset      Size  Chunks             Chunk Names
bundle.js  69.6 KiB       0  [emitted]  main
Entrypoint main = bundle.js
   [1] (webpack)/buildin/module.js 519 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] ./src/GlobalVal.js 256 bytes {0} [built]
    + 1 hidden module

WARNING in configuration(配置警告)
```
>注意，当在 windows 中通过调用路径去调用 webpack 时，必须使用反斜线()。
>例如 node_modules\.bin\webpack --config webpack.config.js。

比起 CLI 这种简单直接的使用方式，配置文件具有更多的灵活性。
我们可以通过配置方式指定 loader 规则(loader rules)、插件(plugins)、解析选项(resolve options)，以及许多其他增强功能。

# npm脚本

考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便，我们可以设置一个快捷方式。

package.json中添加
```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
},
```
现在，可以使用 npm run build 命令，来替代我们之前使用的 npx 命令。注意，使用 npm 的 scripts，
我们可以像使用 npx 那样通过模块名引用本地安装的 npm 包。这是大多数基于 npm 的项目遵循的标准，
因为它允许所有贡献者使用同一组通用脚本（如果必要，每个 flag 都带有 --config 标志）。

运行如下：

```
npm run build

> webpack-demo@1.0.0 build D:\Lynn\myproject\webpack-demo
> webpack

Hash: dabab1bac2b940c1462b
Version: webpack 4.0.1
Time: 323ms
Built at: 2018-2-26 22:50:25
    Asset      Size  Chunks             Chunk Names
bundle.js  69.6 KiB       0  [emitted]  main
Entrypoint main = bundle.js
   [1] (webpack)/buildin/module.js 519 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] ./src/GlobalVal.js 256 bytes {0} [built]
    + 1 hidden module

WARNING in configuration(配置警告)
```
>通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors

现在，你已经实现了一个基本的构建过程，你应该移至下一章节的 Asset Management 指南，以了解如何通过 webpack 来管理资源，例如图片、字体。此刻你的项目应该和如下类似：

>如果你使用的是 npm 5，你可能还会在目录中看到一个 package-lock.json 文件。

# 管理资源

如果你是从开始一直遵循着指南的示例，现在会有一个小项目，显示 "Hello webpack"。现在我们尝试整合一些其他资源，比如图像，看看 webpack 如何处理。

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从 /src 文件夹移动到 /dist 或 /build 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。让我们从 CSS 开始起步，或许你可能已经熟悉了这个设置过程。

# 加载css

为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：

```
npm install --save-dev style-loader css-loader
```

webpack.config.js:
```
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
```

>webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，
>以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。

这使你可以在依赖于此样式的文件中 import './style.css'。现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。

添加文件 src/style.css
```
.hello {
  color: red;
}
```

src/GlobalVal.js
```
import _ from 'lodash';
+ import './style.css';

  function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```
运行 npm run build

# 加载图片

假想，现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中
```
npm install --save-dev file-loader
```
webpack.config.js
```
+ {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+  }
```

现在，当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，_并且_ MyImage 变量将包含该图像在处理后的最终 url。当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 <img src="./my-image.png" />。

我们向项目添加一个图像，然后看它是如何工作的，你可以使用任何你喜欢的图像：

添加文件 src/icon.png

src/GlobalVal.js
```
+ import Icon from './icon.png';

+   // 将图像添加到我们现有的 div。
+   var myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);
```
src/style.css
```
.hello {
    color: red;
+   background: url('./icon.png');
  }
```
-> npm run build

如果一切顺利，和 Hello webpack 文本旁边的 img 元素一样，现在看到的图标是重复的背景图片。如果你检查此元素，你将看到实际的文件名已更改为像 5c999da72346a995e7e2718865d019c8.png 一样。这意味着 webpack 在 src 文件夹中找到我们的文件，并成功处理过它！

>合乎逻辑下一步是，压缩和优化你的图像。查看 image-webpack-loader 和 url-loader，以了解更多关于如果增强加载处理图片功能。

# 加载字体

那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。让我们更新 webpack.config.js 来处理字体文件：

webpack.config.js
```
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```

添加字体 src/font.woff
src/style.css
```
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }
  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```
此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理这三类文件

```
npm install --save-dev csv-loader xml-loader
```

webpack.config.js

```
 {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
```

src/data.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

# 管理输出

到目前为止，我们在 index.html 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始对文件名使用哈希(hash)]并输出多个 bundle，手动地对 index.html 文件进行管理，一切就会变得困难起来。然而，可以通过一些插件，会使这个过程更容易操控。

添加src/print.js
```
export default function printMe() {
  console.log('I get called from print.js!');
}
```
src/GlobalVal.js
```
  import _ from 'lodash';
+ import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
+   var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+   btn.innerHTML = 'Click me and check the console!';
+   btn.onclick = printMe;
+
+   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
```

# 设定 HtmlWebpackPlugin

```
npm install --save-dev html-webpack-plugin
```
webpack.config.js

```
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/GlobalVal.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

# 清理 /dist文件夹
由于过去的指南和代码示例遗留下来，导致我们的 /dist 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。
通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。让我们完成这个需求。

```
npm install --save-dev clean-webpack-plugin
```
webpack.config.js

```
+ const CleanWebpackPlugin=require('clean-webpack-plugin')
plugins:[
+   new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({title:'output management'})
  ]
```

# 使用Source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。

为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。

对于本指南，我们使用 inline-source-map 选项，这有助于解释说明我们的目的（仅解释说明，不要用于生产环境）：

webpack.config.js
```
+ devtool: 'inline-source-map',
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({title:'output management'})
  ]
```
在src/print.js中生成错误
```
-   console.log('I get called from print.js!');
+   cosnole.error('I get called from print.js!');
```

# 选择一个开发工具

每次要编译代码时，手动运行 npm run build 就会变得很麻烦。

webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

webpack's Watch Mode
webpack-dev-server
webpack-dev-middleware
多数场景中，你可能需要使用 webpack-dev-server，但是不妨探讨一下以上的所有选项。

# 使用观察模式

你可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

我们添加一个用于启动 webpack 的观察模式的 npm script 脚本

package.json:
```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },
```

现在,保存文件并检查终端窗口。应该可以看到 webpack 自动重新编译修改后的模块！

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。

# 使用webpack-dev-serve

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。让我们设置以下：

修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：

webpack.config.js
```
 devtool: 'inline-source-map',
 +   devServer: {
 +     contentBase: './dist'
 +   },
```
以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

让我们添加一个 script 脚本，可以直接运行开发服务器(dev server)：

package.json:
```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
```

# 模块热替换
模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。本页面重点介绍实现，而概念页面提供了更多关于它的工作原理以及为什么它有用的细节。

>HMR 不适用于生产环境，这意味着它应当只在开发环境使用

# 启用HMR
启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件。我们还要删除掉 print.js 的入口起点，因为它现在正被 GlobalVal.js 模块使用。

>如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。

webpack.config.js
```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/GlobalVal.js',
-      print: './src/print.js'
+      app: './src/GlobalVal.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

注意，我们还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖。在起步阶段，我们将通过在命令行中运行 npm start 来启动并运行 dev server。

现在，我们来修改 GlobalVal.js 文件，以便当 print.js 内部发生变更时可以告诉 webpack 接受更新的模块。
src/GlobalVal.js
```

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```
# 通过node.js api

当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。例如：

new WebpackDevServer(compiler, options)

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。webpack-dev-server package 中具有一个叫做 addDevServerEntrypoints 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个小例子：

# 生产环境构建

开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

我们先从安装 webpack-merge 开始，并将之前指南中已经成型的那些代码再次进行分离：

```
npm install --save-dev webpack-merge
```

# 指定环境

许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：












