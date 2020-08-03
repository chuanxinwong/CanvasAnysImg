const path = require("path");
const fse = require("fs-extra");

module.exports = {
    entry: {
        test01: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: "webpackNumbers",
        libraryTarget: "umd",
    },
    // mode: "development",
    module: {
        rules: [
        ],
    },
    devtool: "source-map",
};

// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin(fun) {
    this.fun = fun;
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function (compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。

    var that = this;

    /* 处理 webpack 内部实例的特定数据。*/
    compiler.plugin("aaaaaaa", function (compilation, callback) {
        console.log("This is an example plugin!!!");

        // 功能完成后调用 webpack 提供的回调。
        callback();
    });

    compiler.plugin("done", function () {
        fse.copySync(fo, to);
        console.log("打包完成......");
    });
};
