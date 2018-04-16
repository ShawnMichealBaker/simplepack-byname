

const fs = require('fs');
const path = require('path');
const templateSingle = fs.readFileSync(path.join(__dirname, 'templateSingle.js'));

webpack();

function webpack() {
    const context = '/Users/mac/Desktop/code/webpack/simplepack-byName/';
    const entry = 'src/index.js';
    const output = 'dist/bundle.js';
    // 分析模块间的依赖关系,生成模块依赖关系
    let depTree = buildDeps(entry, context);
    // 拼接生成目标JS文件
    let buffer = [];
    let filename = path.resolve(context, output);
    // 把require(0) 改成 require(context+entry)
    let index = templateSingle.indexOf('0')
    let buf1 = templateSingle.slice(0, index);
    let buf3 = templateSingle.slice(index + 1, templateSingle.length);
    buffer.push(buf1, '"' + context + entry + '"', buf3);
    // 开始添加传入的参数
    buffer.push('/******/({\n');
    // 拼接modules进对应的chunk中
    let chunks = writeModule(depTree, depTree.chunk);
    buffer.push(chunks);
    buffer.push('/******/})');
    buffer = buffer.join('');
    // 写文件
    fs.writeFile(filename, buffer, 'utf-8', function (err) {
        if (err) {
            throw err;
        }
    });
}

/**
 * 分析处理模块依赖
 * @param { string } entry 
 */
//function buildDeps(entry, context) {
function buildDeps(entry, context) {
    let depTree = {
        modules: {},// 通过模块名索引各个模块对象
    };
    absoluteEntry = path.resolve(context, entry);//获取入口文件的绝对路径
    context = path.dirname(absoluteEntry);//获取入口文件所在的上下文
    // 构造依赖树模型的
    depTree = parseModule(depTree, absoluteEntry, context);
    return depTree;
}

/**
 * 分析模块
 * @param {*} depTree 
 * @param {*} moduleName 模块的绝对路径
 */
function parseModule(depTree, moduleName, context) {
    let module;
    // 用模块的绝对路径作为模块的键值,保证不重复加载文件
    module = depTree.modules[moduleName] = {};
    // 根据绝对路径，读取文件源码
    let source = fs.readFileSync(moduleName).toString();
    // 将源码中依赖的模块转换成绝对路径
    source = parseRequireName(source, context);
    // 将源码转换为对象模型 模型中记录了依赖和源码
    let parsedModule = parse(source);
    // 放到depTree上
    module.requires = parsedModule.requires || [];
    module.source = parsedModule.source;
    // 如果此模块有依赖的模块,采取深度优先的原则,遍历解析其依赖的模块
    let requireModules = parsedModule.requires;
    // 如果有依赖 再去解析依赖
    if (requireModules && requireModules.length > 0) {
        for (let require of requireModules) {
            // 切换到依赖的文件所在的上下文中
            let tempContext = path.dirname(require.name);
            depTree = parseModule(depTree, require.name, tempContext);
        }
    }
    return depTree;
}

/**
 * 将源码转换为模型
 * @param {string} source 
 */
function parseRequireName(source, context) {
    const regEx = /require\(.*\)/g;//require(***)
    var params = [];
    var param;
    while ((param = regEx.exec(source)) !== null) {
        let value = param[0].replace('require(', '').replace(')', '').replace(/'/g, '');
        let absolute = path.resolve(context, value);
        source = source.replace(value, absolute);
    }
    return source;
};

/**
 * 将源码转换为模型
 * @param {string} source 
 */
function parse(source) {
    let localModule = {};
    localModule.requires = [];
    // 从source里面找require函数 找到后把其参数的值和范围放到 localModule.requires数组里
    // localModule.requires.push({ name: param.value, nameRange: param.range })
    // value是一个字符串 'a' 或者 "a" 这样
    // range是一个数组 [开始位置,结束位置]
    // 其实就是获取require的第一个参数 以及这个字符串从哪儿到哪
    // 匹配 require(***) 返回 ***.trim() 以及范围
    const regEx = /require\(.*\)/g;
    var params = [];
    var param;
    while ((param = regEx.exec(source)) !== null) {
        //params.push(param);
        let value = param[0].replace('require(', '').replace(')', '').replace(/'/g, '');
        // param.index + 8 加的是 'require(' 8个字符
        // regEx.lastIndex - 1 减的是 ')' 1个字符
        // 得到的是 参数名的范围
        let range = [param.index + 8, regEx.lastIndex - 1];
        localModule.requires.push({ name: value, nameRange: range });
    }
    localModule.source = source;
    return localModule;
};

/**
 * 将每个module写入输出文件
 * @param {*} depTree 
 */
function writeModule(depTree) {
    let buffer = [];
    for (let moduleName in depTree.modules) {
        //let module = depTree.modulesById[moduleName];
        buffer.push('/******/');
        buffer.push('"' + moduleName + '"');
        buffer.push(': function(module, exports, require) {\n\n');
        // 调用此方法,拼接每一个具体的模块的内部内容
        buffer.push(depTree.modules[moduleName].source);
        buffer.push('\n\n/******/},\n/******/\n');
    }
    return buffer.join('');
}
