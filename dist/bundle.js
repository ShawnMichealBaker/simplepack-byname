/******/(function(modules) {
/******/	function require(moduleId) {
/******/		var module = {
/******/			exports: {}
/******/		};
/******/		modules[moduleId](module, require);
/******/		return module.exports;
/******/	}
/******/	return require("/Users/mac/Desktop/code/webpack/simplepack-byname/src/index.js");
/******/})
/******/({
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/index.js": function(module, require) {

let a = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/a.js');
let b = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/b.js');
let c = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/c.js');
let d = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/dir/d.js');

a();
b();
c();
d();

/******/},
/******/
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/a.js": function(module, require) {

// module a

module.exports = function () {
    console.log('a')
};

/******/},
/******/
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/b.js": function(module, require) {

// module b
let c = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/c.js');

module.exports = function () {
    console.log('b');
    console.log('b中的c');
    c();
    console.log('b中的c');
};

/******/},
/******/
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/c.js": function(module, require) {

// module c

module.exports = function () {
    console.log('c')
};

/******/},
/******/
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/dir/d.js": function(module, require) {

// module d

let a = require('/Users/mac/Desktop/code/webpack/simplepack-byname/src/dir/a.js');

module.exports = function () {
    console.log('d');
    a();
};

/******/},
/******/
/******/"/Users/mac/Desktop/code/webpack/simplepack-byname/src/dir/a.js": function(module, require) {


// module a2

module.exports = function () {
    console.log('a2')
};

/******/},
/******/
/******/})