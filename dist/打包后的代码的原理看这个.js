/******/(function(modules) {
/******/	function require(moduleId) {
/******/		var module = {
/******/			exports: {}
/******/		};
/******/		modules[moduleId](module, require);
/******/		return module.exports;
/******/	}
/******/	return require(0);
/******/})
/******/({
/******/0: function(module, require) {

let a = require(/* /Users/mac/Desktop/code/webpack/my-webpack/src/a.js */1);
let b = require(/* /Users/mac/Desktop/code/webpack/my-webpack/src/b.js */2);

a();
b();

/******/},
/******/
/******/1: function(module, require) {

// module a

module.exports = function () {
    console.log('a')
};

/******/},
/******/
/******/2: function(module, require) {

// module b

module.exports = function () {
    console.log('b')
};

/******/},
/******/
/******/})