# Vue->React 配置篇

### 一、类 React 框架选型

**Nervjs** vs **anujs**

|                 | Nervjs                      | anujs                        |
| --------------- | --------------------------- | ---------------------------- |
| 最新版本        | v1.3.9                      | v1.4.9                       |
| 对应 React 版本 | v16.x                       | v16.3.0                      |
| 路由            | 无自带，官方称最高支持 v2.3 | 自带兼容 IE8 的@reach/router |
| 状态管理        | 自带 nerv-redux             | 自带@rematch/core            |

### 二、package.json

- nervjs/anujs: 类 React 前端框架,兼容 IE8
- antd: 基于 React 的 UI 框架，v1.x 兼容 IE8
- @types/react、@types/react-dom 等: React 类型定义文件
- es5-shim、bluebird、fetch-ie8、…… : 兼容 IE8 的垫片

### 三、@toolkit/webpack-ts 模块

配置通用化，方便后续各类模块复用：[webpack-ts](http://git-kk.landray.com.cn/frontend-toolkit/webpack-ts/)

### 四、Typescript

###### tsconfig.json

- "jsx": "react" (在.tsx 文件里支持 JSX："React"或"Preserve)
- "jsxFactory": "React.createElement" (指定生成目标为 react JSX 时，使用的 JSX 工厂函数)

###### ts 声明文件

```js
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
```

### 五、babel

.babelrc 中加入如下配置支持 JSX 和兼容低版本 IE

```js
"presets": [
    [
      "@babel/preset-env",
      {
        "loose": false,
        "targets": {
          "browsers": [
            "ie >= 8",
            "Chrome >= 21",
            "Firefox >= 1",
            "Edge >= 13",
            "last 3 versions"
          ]
        }
      }
    ]
],
plugins: [
    //react jsx支持
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "React.createElement"
      }
    ]
]
```

### 六、webpack

```js
// 增加ie8兼容的entry
entry['ie8'] = [
  'es5-shim',
  'object-create-ie8',
  'object-defineproperty-ie8',
  'console-polyfill',
  'json3',
  'bluebird',
  'fetch-polyfill2'
]
```

```js
resolve: {
  // nervjs alias
  alias: {
    react: 'nervjs',
    'react-dom': 'nervjs',
    // Not necessary unless you consume a module using `createClass`
    'create-react-class': 'nerv-create-class'
  }
}
```

```js
resolve: {
  // anujs alias
  alias: {
    react: 'anujs/dist/ReactIE.js',
    'react-dom': 'anujs/dist/ReactIE.js',
    'prop-types': 'anujs/lib/ReactPropTypes.js',
    'create-react-class': 'anujs/lib/createClass.js',
    // 路由支持
    'reach-router': 'anujs/dist/Router.js',
    // 状态管理支持
    rematch: 'anujs/dist/Rematch.js'
  }
}
```

### 七、Antd

引入蚂蚁金服 Ant-design，因为要兼容 IE8 所以只能选择 1.x

###### antd 按需加载

```js
loader: 'ts-loader',
options: {
  getCustomTransformers: () => ({
    before: [
      tsImportPluginFactory(
        //  // antd按需加载
        { libraryName: 'antd', style: false }
      )
    ]
  })
}
```

###### 主题定制

1、 antd.less

```css
@import '~antd/dist/antd.less';
@import 'var.scss';
```

2、 webpack 配置修改

```js
{
    test: /\.scss$/,
    issuer: /\.less$/,
    use: {
      loader: path.join(__dirname, './sassVarsToLess.js')
    }
}
```

3、 sassVarsToLess.js

```js
module.exports = function(source) {
  return source.replace(/\$/gi, '@')
}
```

4、 var.scss

```css
// var.scss会被antd.less引用,因为种种限制,除了定义变量请不要在这里使用其他SCSS语法。
$primary-color: #4285f4;
```

### 八、Lint

改用**lint-staged**,lint-staged 只会检查你修改的代码

### 九、文章

###### 类 React 框架相关

[1、nervjs](https://github.com/NervJS/nerv#readme)
[2、nervjs & IE8 模板](https://github.com/NervJS/nerv-webpack-boilerplate)
[3、anujs](https://github.com/RubyLouvre/anu#readme)
[4、anujs & TypeScript 兼容 router](https://zhuanlan.zhihu.com/p/50299598)
[5、anujs & IE8 模板](https://github.com/RubyLouvre/anu-ie8-example)
[6、anujs 兼容 IE8 方案](https://zhuanlan.zhihu.com/p/39103023)

###### IE8 兼容相关

[1、ES5 兼容库](https://www.npmjs.com/package/es5-shim)
[2、Object.create 兼容库](https://www.npmjs.com/package/object-create-ie8)
[3、Object.defineProperty 兼容库](https://www.npmjs.com/package/object-defineproperty-ie8)
[4、Promise 兼容库](https://www.npmjs.com/package/bluebird)
[5、fetch 兼容库](https://www.npmjs.com/package/fetch-ie8)
[6、另外一个 fetch 兼容库](https://www.npmjs.com/package/fetch-polyfill2)

###### antd 相关

[1、antd](https://1x.ant.design/)
[2、TS 版按需加载插件](https://www.npmjs.com/package/ts-import-plugin)
[3、Antd 支持使用 sass 主题定制](https://gist.github.com/Kruemelkatze/057f01b8e15216ae707dc7e6c9061ef7)

###### 其它

[1、lint-staged](https://segmentfault.com/a/1190000009546913)
[2、@reach/router](https://www.npmjs.com/package/@reach/router)
[3、rematch](https://www.npmjs.com/package/@rematch/core)
