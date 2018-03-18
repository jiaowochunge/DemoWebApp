# DemoWebApp
### 项目描述
html + css + js方式开发App。这是[cordova](https://cordova.apache.org/)的目标，在用了cordova很久后，也算是有点开发经验了。前不久，尝试用Electron开发桌面App时，遇到一些挑战，一个良好的开始是成功的一半，在成功一半的路上走的很幸苦。所以我想，会不会也有很多人刚接触cordova时，遇到一些困难呢？这是这个项目的初衷。项目目的就是使用前端方式开发App的一些示范。

### 项目目标
[**webpack**](https://webpack.js.org/) + [**react**](https://reactjs.org/), 那么我们将使用JSX + ES6语法开发，使用babel将js转到ES5以兼容浏览器。在 **webpack** 的帮助下，我们将分开开发环境和生产环境，uglify之类的只需要配置下就行了。总之 **webpack** 很强大就是了。

### 开发步骤
开发环境简介：git + node.js。安装node.js后，会送一个npm工具包，是一个依赖管理工具，全局安装cordova，`npm install cordova -g`。
1. `cordova create DemoWebApp` 创建一个初始项目。
2. `cd DemoWebApp && git init` 使用git管理项目。<br/>这时候项目默认开发目录是 *www/* ，可以看到里面有 *css/* , *img/* , *js/* , *index.html* ，这不方便我们开发，因为 *www/* 目录是生产目录。我们将创建一个 *src/* 目录，使用 webpack-dev-server 工具开发，生产时使用 webbpack 打包到 *www/* 目录下。
3. `cordova platform add browser` 我们尝试用浏览器启动，这是为了创建必要的文件或目录。接下来我们要添加 *.gitigonre* 文件。`cordova run -p browser` 启动项目。*node_modules/* 目录出现了。添加忽略，*node_modules/* 没用，依赖包都在这。*plugins/* 没用，这是native相关的插件。*platforms/* 没用，各种平台支持在这。*www/* 也没用，因为我们将建 *src/* 目录作为开发目录。
