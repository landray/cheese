# yarn 小知识

## .yarnrc

在项目根路径中增加 `yarnrc`文件， 可用于配置 npm 包所使用的下载源地址， 例如:

```
"@toolkit:registry" "http://npm.landray.com.cn/"
"@ekp-next:registry" "http://npm.landray.com.cn/"
registry "https://registry.npm.taobao.org"
```

## 执行命令

Yarn 命令按照 `内置命令` `package.json 中 scripts 中声明的命令` 及 `node_modules/.bin 目录中的命令` 的优先级来执行。

### 内置命令

```sh
add # 安装依赖， 对应 npm install
remove # 移除依赖, 对应 npm uninstall
run # 执行 package.json 中 scripts 中的命令， 对应 npm run
create # 执行 create-* 相关命令， 参考 [yarn create | Yarn](https://yarnpkg.com/zh-Hans/docs/cli/create)
autoclean # node_modules 文件夹瘦身
cache

# 示例
yarn add xxxx
yarn remove xxx
```

### package.json 中 scripts 中声明的命令

```js
  "scripts": {
    "dev": "cross-env NODE_ENV=development node webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --progress --colors",
	  "remove": "echo 'todo'",
    "postbuild": "npm run crx",
    "crx": "crx pack dist -o ext.crx",
    "lint": "tslint --project ./tsconfig.json --config tslint.json"
  },
//  示例
yarn dev xxx
yarn build xxx
// 与内置命令冲突时， 使用 yarn run xxx
yarn run remove
```

### node_modules/.bin 目录中的命令

```sh
➜  elements (dev) ✗ ls node_modules/.bin
JSONStream                    mkdirp
acorn                         multicast-dns
ansi-html                     needle
atob                          node-gyp

# 示例
yarn mkdirp xxxx
yarn atob xxxx
```

## yarn 中有用的命令

完整命令集 [CLI 介绍 | Yarn](https://yarnpkg.com/zh-Hans/docs/cli/) (看右侧菜单列表)

### yarn autoclean

清理 node_modules 中无用的文件(比如 test 文件，licence 文件)， 减少依赖体积。

初次使用需要执行 `yarn autoclean --init` , 后会在项目根路径下生成 `.yarnclean` 文件。 后续执行 `yarn/yarn add xxx` 时则会自动清理无用文件。

[yarn autoclean | Yarn](https://yarnpkg.com/zh-Hans/docs/cli/autoclean)

### yarn cache

管理 yarn 在本机上的缓存文件。

```sh
yarn cache dir # 显示缓存文件路径
yarn cache clean # 清理缓存
```

[yarn cache | Yarn](https://yarnpkg.com/zh-Hans/docs/cli/cache)

### yarn pack

打包整个项目， 并生成 `.tgz` 压缩文件。压缩时会排出掉 `.gitignore`(若存在 .npmignore 文件，则使用该文件) 中所忽略掉文件。

[yarn pack | Yarn](https://yarnpkg.com/zh-Hans/docs/cli/pack)
