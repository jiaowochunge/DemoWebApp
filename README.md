# DemoWebApp
### 项目描述
html + css + js方式开发App。这是[cordova](https://cordova.apache.org/)的目标，在用了cordova很久后，也算是有点开发经验了。前不久，尝试用Electron开发桌面App时，遇到一些挑战，一个良好的开始是成功的一半，在成功一半的路上走的很幸苦。所以我想，会不会也有很多人刚接触cordova时，遇到一些困难呢？这是这个项目的初衷。项目目的就是使用前端方式开发App的一些示范。

### 项目目标
[webpack](https://webpack.js.org/) + [react](https://reactjs.org/), 那么我们将使用JSX + ES6语法开发，使用babel将js转到ES5以兼容浏览器。在 webpack 的帮助下，我们将分开开发环境和生产环境，uglify之类的只需要配置下就行了。总之 webpack 很强大就是了。

### 开发步骤
开发环境简介：git + node.js。安装node.js后，会送一个npm工具包，是一个依赖管理工具，全局安装cordova，`npm install cordova -g`。
1. `cordova create DemoWebApp` 创建一个初始项目。查看官方文档，可以引导你了解更多。
2. `cd DemoWebApp && git init` 使用git管理项目。<br/>这时候项目默认开发目录是 **www/** ，可以看到里面有 **css/** , **img/** , **js/** , **index.html** ，这不方便我们开发，因为 **www/** 目录是生产目录。我们将创建一个 **src/** 目录，使用 webpack-dev-server 工具开发，生产时使用 webbpack 打包到 **www/** 目录下。
3. `cordova platform add browser` 我们尝试用浏览器启动，这是为了创建必要的文件或目录。接下来我们要添加 *.gitigonre* 文件。`cordova run -p browser` 启动项目。**node_modules/** 目录出现了。添加忽略，**node_modules/** 没用，依赖包都在这。**plugins/** 没用，这是native相关的插件。**platforms/** 没用，各种平台支持在这。**www/** 也没用，因为我们将建 **src/** 目录作为开发目录。
4. `mkdir src` 下面我们将在 **src/** 下开发。目标是，`npm start` 使用webpack-dev-server启动本地浏览器开发，具有HMR功能。`npm run build` 则会将 **src/** 目录下的代码编译到 **www/** 下。那么我们开始安装各种依赖吧。
  - `npm install webpack webpack-cli webpack-dev-server webpack-merge -D` 首先是webpack。这是我们的前端构建工具。'transpile', 'uglify', 'es-lint', 'less', 'rm dir', 'copy dir' 等功能之类。
  - `npm install react react-dom -D` 添加react
  - `npm install babel-core babel-loader babel-plugin-transform-runtime babel-preset-env babel-preset-react -D` ES6和JSX语法支持
  - `npm install style-loader css-loader file-loader -D` css支持。没有添加less sass之类，只是基本的css
  - `npm install html-webpack-plugin -D` 支持html模版。生产环境时，需要引用cordova.js的文件，在开发阶段没用
  - `npm install clean-webpack-plugin -D` build时，我们将 **www/** 目录清空。我们现在先手动把 **css/** , **img/** , **js/** 目录删了
  - `npm i -D uglifyjs-webpack-plugin` webpack3.0时期，这个插件内置的，现在webpack4.0要自己下了。我们下好，准备试下 `npm run build`。好的，成功。我再添加iOS平台，用模拟器测试下。`cordova platform add ios` `cordova build ios`。*platform/* 目录下打开ios工程用模拟器启动。good，it works.
5. todo: react-route-dom react-redux 这对开发会很有帮助。我们也没有加 es-lint 来帮助我们规范代码。我只想使工程尽量简单。网上有很多boilerplate来帮助你，但是往往很多比较厚重。本来 webpack.config.js 我也不想分开开发环境和生产环境，三个文件比一个文件让人望而生畏。权衡之下，目前项目还是比较简单的吧。

#### 步骤详解
我试图尽量讲清楚明白些，水平有限，尽量吧。这部分是对‘开发步骤’的一些补充说明
1. cordova是一个跨平台开发的项目，在这一步时，你已经可以运行项目看一下效果。只是你需要一个添加一个平台。我们以浏览器平台为例，运行第三步的命令（`cordova platform add browser`），然后 `cordova run browser` 你就可以在浏览器中看到效果了。
2. 上面提到的 `cordova run browser` 方式将不是我们的开发方式。这种方式无法热更新，失去web开发的优势了。我们将使用 webpack 这个工具。简单介绍下 webpack 。注意 cordova 方式开发项目时， **www** 目录是目标目录，你最终运行的代码，其他资源都在这个目录下。这应该被看作一个生产目录，而不是开发目录。譬如我们要使用ES6语法，直接在写ES6在 **www** 下是不行的，难免浏览器不支持某些语法。所以我们要创建一个 **src** 目录作为开发目录，我们写的 ES6 + JSX 将被 babel 处理成 ES5 以下的语法。再比如我们写 sass 文件，要翻译成普通的 css 文件。开发目录下的图片拷贝到生产目录。这些功能都可以通过 webpack 实现。webpack 大致就是这个作用。另外再考虑下，我们怎么开发调试？我们需要开个本地服务器，那么我们修改样式或者js代码，刷新下就可以看到结果。这就是 webpack-dev-server 帮你做的事情。实际上，当你配置HMR后，很多时候刷新也不用你做了，自动热更新。
3. 这步我试图讲解 cordova 项目目录结构，具体的当然还是看官方文档更好。
4. `npm start` 和 `npm run build` 命令都在 pakcage.json 文件中配置。`npm start` 就是跑 webpack-dev-server ，`npm run build` 是通过 webpack 将 **src** 目录 build 到 **www** 目录。这一步装了很多包，目的一是安装 webpack 相关包，目的二是安装 react 相关包。至此开发环境安装完毕，开发流程一般是，`npm start` 在浏览器中开发，开发完成后，`npm run build` 将代码部署到 **www** 目录。然后 `cordova run ios` 或 `cordova run android` 查看真机运行效果。

### 末了
有空还是写个简单的项目，目前太简陋了
