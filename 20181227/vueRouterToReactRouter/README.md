## React 调试工具

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related)

[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Vue router 与 React router 的区别

### 效果
当浏览器的url产生变化时，不向服务器进行请求，而是直接控制前端页面产生变化，产生类似页面跳转等效果。

### 对比
 * Vue router
    * 并列级路由: 任何路由组件都会被渲染到<router-view/>位置
     * 全局配置(VUE): 路由配置要提供给new VueRouter()对象，这个对象要在全局VUE对象初始化时提供
     * 仅支持对象形式的配置
 * React router
    * 子路由: 子组件作为children被传入父组件，而根组件被渲染到<Router/>位置。
     * 全局组件(React): 路由需要配置给全局<Router/>组件，虽然react-router也提供类似于vue-router典型代码中的对象数组形式的配置方式，但是最终仍是要将配置传递给<Router/>。
     * 支持对象形式和JSX语法的组件形式配置。


####  vue-router
JS:
```
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes 
})

const app = new Vue({
  router
}).$mount('#app')
```
HTML:
```
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <router-linkto="/foo">Go to Foo</router-link>
    <router-linkto="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口-->
  <!-- 路由匹配到的组件将渲染在这里 -->
 <router-view></router-view>
</div>
```

#### react-router
JS/JSX:
```
// modules/Foo.js
import React from 'react'
export default React.createClass({
  render() {
    return<div>Foo</div>
  }
})
```
```
// modules/Bar.js
import React from 'react'
export default React.createClass({
  render() {
    return<div>Bar</div>
  }
})
```
```
// index.js
// ...
render((
  <Routerhistory={hashHistory}>
    <Route path="/"component={App}>
      <Route path="/foo"component={Foo}/>
      <Route path="/bar"component={Bar}/>
    </Route>
  </Router>
), document.getElementById('app'))
```
```
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>React RouterTutorial</h1>
        <ulrole="nav">
          <li><Linkto="/foo">Go To Foo</Link></li>
          <li><Linkto="/bar">Go To Bar</Link></li>
        </ul>
        {/* 路由匹配到的组件将渲染在这里 */}
        {this.props.children}
      </div>
    )
  }
// ...
```

## 处理页面URL的方式
 * hashHistory：通过#/ ，其实就像是单页面应用中常见的hashbang方式，http://example.com/#/path/path.. 
 * browserHistory：通过URL的变化改变路由，但是需要在服务器端需要做一些配置
 * createMemoryHistory：Memory history 并不会从地址栏中操作或是读取，它能够帮助我们完成服务器端的渲染，我们得手动创建history对象

```
render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="first" component={First} />
        <Route path="second" component={Second} />
    </Router>
    ),
    document.getElementById('box')
)
```
## React router 的其他组件
 * IndexRoute: 在主页面会用到，如上个例子中，在路径"/"下我们看到的是空白页面，可以添加默认的页面组件用于导航
 * Link: 可以认为它是`<a>`标签在React中的实现，使用to属性定义路径，还可以通过activeClass或activeStyle定义active的样式
 * IndexLink: 类似Link，推荐用来定义指向主页面的链接，当然也可以随意定义
 * Redirect: 从from路径重定向到to路径
 * IndexRedirect: 在主页面，直接重定向到to路径

## React router 的path规则
path定义的路由的路径，在hashHistory中，它的主页路径是#/
自定义Route路由通过与父Route的path进行合并，在与主页路径合并，得到最终的路径

### 语法：
* :paramName 匹配 URL 的一个部分，直到遇到下一个/、?、#
* () 表示URL的这个部分是可选的
* * 匹配任意字符(非贪婪模式)，直到模式里面的下一个字符为止
* ** 匹配任意字符(贪婪模式)，直到下一个/、?、#为止
```
<Route path="/hello/:name">         // 匹配 /hello/leo 和 /hello/saiya
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/leo, 和 /hello/saiya
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/hello.html
<Route path="/**/*.jpg">            // 匹配 /files/hello.jpg 和 /files/path/to/file.jpg
```

