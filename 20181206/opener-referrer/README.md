# Opener/referrer

在网页中打开外链时，例如最常见的 `a` 标签 `target=_blank`，会将页面的信息以以下两种方式传递过去：

- referrer 页面来源信息， 可在被打开的窗口中通过 `document.referrer` 获取
- opener 打开超链接的页面 window 对象，可在被打开的窗口中通过 `window.opener` 获取

可以打开 [Landray Frontend Starter](http://frontend-toolkit.kk.cafe/frontend-starter/#/) 点任意一个超链接，在新窗口中尝试读取。

但在访问 [Startpage.com](https://us.startpage.com/) 这个搜索引擎，打开搜索结果时，上述两个信息却为空。

下面看看具体什么情况。

## Opener/referrer 有什么用

### opener

opener 是指父窗口(打开本窗口的窗口)的 window 对象, 使用 `window.opener` 访问，访问该对象受同源策略限制：

> 若和父窗口跨域， 则只能通过 opener 访问一些简单的属性，如 `window.opener.postMessage`, `window.opener.location`(可以设置 location 的值， 但是不能读取， 读取会报跨域错误)， 访问其他属性则都会保跨域错误。同域则可以通过 opener 访问任意内容。

opener 可以用于操纵窗口，甚至是攻击父窗口， 访问 <https://mathiasbynens.github.io/rel-noopener/> 查看实例。

opener 还可以用于 和父窗口通信， 基于 `window.opener.postMessage`

#### 什么时候会有 opener

通常情况， 通过 JS 或者通过`a`标签打开的新窗口都会默认有 `opener` 属性， 但是通过按住 ctrl(Windows)/Cmd(Mac) + 鼠标左键点击链接在新窗口打开时， opener 信息为空。

### referrer

referrer 指向父窗口的地址栏地址(location.href), 可以在当前窗口通过 `document.referrer` 访问， 同时被打开的网址的服务器端可以在 HTTP 请求头中通过 `Referer` 来访问， 该值不受同源策略限制：

> 即使和父窗口跨域，默认情况下 referrer 信息会完整传递

referrer 可以用于读取本窗口的访问来源地址，可用于访问统计或者做页面功能限制。

#### 什么时候会有 referrer

通常情况， 不论通过 JS 还`a` 标签，也不论是否在新窗口打开页面，被打开的页面都可以读取到 referrer 信息。

## 如何避免传递 opener 和 referrer

### 使用标签属性

#### 通过给 `a` 标签添加 `rel="noopener noreferrer"` 属性的方式， 可以去除 opener 和 referrer 信息， 其中：

- noopener 用于去除 opener 信息
- noreferrer 则可以去除 opener 和 referrer 两者

```html
<a
  href="https://en.wikipedia.org/wiki/Schutzstaffel"
  target="_blank"
  rel="noopener noreferrer"
  >Schutzstaffel - Wikipedia</a
>
```

因为这两个属性是新增的属性， 在浏览器使用有兼容性问题，所以一般两者一起使用，但即使一起， 也不能保证所有浏览器都能生效。

- [noopener 兼容性](https://caniuse.com/#search=noopener) Firefox >= 52, Chrome >= 49, Safari > 10, IE 及 Edge 不支持
- [noreferrer 兼容性](https://caniuse.com/#search=noreferrer) Firefox >= 33, Chrome >=16 Safari >=5, Edge >=13

#### 使用 meta 标签统一控制

统一控制 referrer

```html
<meta content="origin" name="referrer" />
```

可选值如下:

- `no-referrer` Do not send a HTTP Referrer header.
- `origin` Send the origin of the document.
- `no-referrer-when-downgrade` Send the origin as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.
- `origin-when-cross-origin` Send the full URL (stripped of parameters) for same-origin requests, but only send the origin for other cases.
- `same-origin` A referrer will be sent for same-site origins, but cross-origin requests will contain no referrer information.
- `strict-origin` Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).
- `strict-origin-when-cross-origin` Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).
- `unsafe-URL` Send the full URL (stripped of parameters) for same-origin or cross-origin requests.

referrer content 值选项 <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name>

通过 meta 标签只能控制 referrer, 但不影响 opener.

[meta - referrer 兼容性](https://caniuse.com/#search=referrer) Firefox >= 36, Chrome >= 61, Safari >11

### 使用 JS 方式

使用 JS 方式只能去除 opener, 但跨浏览器兼容性好.

思路是创建动态 iframe 打开链接， 打开后移除 iframe:

```js
/**
 * url 链接地址
 * strWindowName 窗口名称
 * strWindowFeatures 窗口需要使用的特性， 如 "resizable,scrollbars,status"
 * @return 被打开的窗口 window 对象
 */
function iframeOpen(url, strWindowName, strWindowFeatures) {
  var iframe, iframeDoc, script, openArgs, newWin

  iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframeDoc = iframe.contentDocument || iframe.contentWindow.document

  openArgs = '"' + url + '"'
  if (strWindowName) {
    openArgs += ', "' + strWindowName + '"'
  }
  if (strWindowFeatures) {
    openArgs += ', "' + strWindowFeatures + '"'
  }

  script = iframeDoc.createElement('script')
  script.type = 'text/javascript'
  script.text =
    'window.parent = null; window.top = null;' +
    'window.frameElement = null; var child = window.open(' +
    openArgs +
    ');' +
    'if (child) { child.opener = null }'
  iframeDoc.body.appendChild(script)
  newWin = iframe.contentWindow.child

  document.body.removeChild(iframe)
  return newWin
}
```

详细可参考第三库：
[GitHub - danielstjules/blankshield: Prevent reverse tabnabbing phishing attacks caused by \_blank](https://github.com/danielstjules/blankshield/)
