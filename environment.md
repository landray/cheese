# 环境准备

请按本章节配置好本机开发环境。

## 系统环境

先安装好 Nodejs 运行环境，及包管理工具 Yarn（用于替代 npm）

### Nodejs

官网 <https://nodejs.org/zh-cn/>

推荐安装 8.13 版本， 稳定性好，对各种第三方库的兼容性也很好。（Nodejs 当前版本已经到 10，但是 10 有一些 break changes, 导致部分第三方库报错 ）

[8.13 下载地址](https://nodejs.org/dist/v8.13.0/)：

- [MacOS](https://nodejs.org/dist/v8.13.0/node-v8.13.0.pkg)
- [Windows x64](https://nodejs.org/dist/v8.13.0/node-v8.13.0-x64.msi) / [Windows x86](https://nodejs.org/dist/v8.13.0/node-v8.13.0-x86.msi)

### Yarn

官网 <https://yarnpkg.com/zh-Hans/>

Yarn 是一个可以用于完全替代 NPM 的包管理工具。

安装方法：

- MacOS `brew install yarn`
- Windows [下载 MSI 安装包安装](https://yarnpkg.com/latest.msi)

Yarn 相比 NPM 优势在于：

- 更好的依赖解析方式，多个包有共同依赖时，会尝试只安装依赖所有的版本的最匹配的版本（尽量避免将同一依赖安装多次）
- 本地缓存，安装过的依赖会在本地缓存，再次安装时会直接使用本地缓存， 安装速度更快
- 依赖版本锁定，安装完依赖后会产生 `yarn.lock` 文件， 锁定安装的版本，其他人在安装时，会优先通过 `yarn.lock` 文件去解析安装依赖， 从而保证同一项目， 不同开发人员在不同机器上安装的依赖版本完全一致
- 更易用的命令， 如 `yarn add <依赖>` 则自动添加到项目依赖，不会出现依赖未记录到 `package.json` 的问题

Yarn 命令行与 NPM 有些许差异， 详细使用方法： https://yarnpkg.com/zh-Hans/docs/usage

## 开发工具

工欲善其事，必先利其器，选择好正确的工具，事半功倍。

### VSCode

官方网站： <https://code.visualstudio.com/>

推荐使用 VSCode 作为前端代码编辑器， 它免费，扩展性强，对前端各种工具支持良好。当然使用其他编辑器 Sublime Text 或 WebStorm 也可以。

下载地址： <https://code.visualstudio.com/Download>

推荐的插件下载：

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 前端代码自动格式化插件
- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) Typescript 语法校验插件
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) Vue 语法高亮插件

其他插件： <https://github.com/viatsko/awesome-vscode>

### 开发文档查看工具

使用开发文档查看工具可以方便的查看各种语言/库的官方文档。

MacOS 推荐使用 Dash <https://kapeli.com/dash>

Windows 推荐使用 velocity <http://velocity.silverlakesoftware.com/>

在线网页版：<https://devdocs.io/>

## 源码管理

### Git

安装：

- MacOS: 在命令行中输入 `git --version`, 若弹出对话框，则按提示安装命令行工具即可， 若直接输出 git 版本，则表示已安装，可跳过该步骤。
- Windows [原生 Git 客户端, 命令行工具](https://git-scm.com/downloads)

### SourceTree

[Sourcetree 非常好用的 GUI 工具](https://www.sourcetreeapp.com/)

1. SourceTree 是免费软件， 但是需注册才能使用，注册时需要通过 Google 验证码验证， 即`需要翻墙才能注册`
2. SourceTree 设置界面中 Git 页签里，进行优化设置：
   1. 勾选 `Do not fast-forward when merging, always create commit`
   2. `Git Version` 中选择使用系统 Git `Use System Git`，windows 选择 `步骤1` 中安装的 git 路径， Mac 选择系统内置的 git 即可
