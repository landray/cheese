## 如何快速抄袭一个小程序?

### 原理
在微信开发者工具中上传后，微信会对你的 JS 代码进行压缩混淆以及对 wxml、wxss 和资源文件等进行整合打包成一个 .wxapkg 文件上传给微信服务器。

### 思路
在手机上找到微信客户端下载保存在本地的小程序包。然后进行反编译。

### 工具
 * iPhone 手机 (越狱的)
 * Android 手机 (Root的)
 * 电脑模拟器的Android也行

### 找到编译包目录
 * IOS:
      1. 在 Cydia，搜索并安装 iFile 或者 Filza 等文件浏览 App，打开 iFile 或者 Filza
      2. 到达目录 /path/to/WeiChat SandBox/Library/WechatPrivate/{UserId}/WeApp/LocalCache/release/
      3. 提取wxapkg文件，搞到电脑上(不管你用什么方法)

 * Android:
      1. 用 RE 文件管理器(或其它取得最高权限的文件管理器)
      2. 到达目录 /data/data/com.tencent.mm/MicroMsg/{UserId}/appbrand/pkg/
      3. 提取wxapkg文件，搞到电脑上(不管你用什么方法)

*`{UserId}` 为当前登录的微信账号 `Id` 的 `MD5` 值（32 位字符串）*

### 解包、反编译
[wechat-app-unpack](https://github.com/leo9960/wechat-app-unpack)

[wxappUnpacker](https://github.com/qwerty472123/wxappUnpacker)

### 解包后的结构
 * app-service.js: 小程序工程中所有 JS 文件的汇总，已被混淆；
 * app-config.json: 小程序工程 app.json 以及各个页面的 JSON 配置文件汇总，可直接查看；
 * page-frame.html: 所有页面的 .wxml 和 app.wxss 样式文件的汇总，可读性差，需要还原；
 * *.html: 包含每个页面对应的 .wxss 信息，可读性较好；
 * 资源文件: 各类图片、音频等资源文件



测试appid: wx41bab989844cba23