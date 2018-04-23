/******/(function(modules) {
/******/	//var installedModules = {};
/******/	function require(moduleId) {
/******/		//if(installedModules[moduleId])
/******/			//return installedModules[moduleId].exports;
/******/		//var module = installedModules[moduleId] = {
/******/		var module = {
/******/			exports: {}
/******/		};
/******/		modules[moduleId](module, module.exports, require);
/******/		return module.exports;
/******/	}
/******/	return require(0);
/******/})

// 开头永远都不变 一直就是这个函数
// 后面是根据用户的代码去拼接的一个大对象
// 构建一个 depTree
