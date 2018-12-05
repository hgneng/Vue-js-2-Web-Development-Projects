# demo

> Trying out Vue.js!

## Build Setup

``` bash
# install dependencies
# 这个命令会安装node_modules，第一次装所需的时间会比较长，建议创建一个符号链接到根目录的node_modules，让所有项目共享一个npm库
npm install

# npm run后面的参数是在package.json里定义的，定义了它们的行为，就像Makefile的作用
# 这里很方便地启动了Web服务器，如果要完整运行这个demo，还需要启动../server的服务端
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
