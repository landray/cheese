## 使用grunt-prompt添加交互式命令行

使用grunt的命令时，有时需要添加一些交互式操作，提示操作者应该输入什么或选择什么。
这样做一是为了更好的用户体验，二是为了限制输入格式或内容等。

## 解决方法
使用grunt-prompt插件：

1.安装
`npm install grunt-prompt --save-dev`

注：grunt安装命令，可根据实际需要加上`--save-dev`，以保存在package.json配置文件的依赖项中。

2.基本配置项
grunt-prompt插件支持多任务，即可以创建多个prompt提示任务
```js
grunt.initConfig({
  prompt: {
    target: {
      options: {
        questions: [
          {
            config: 'config.name', // 一般为grunt任务的名称
            type: '<question type>', // list,列表，返回一个字符串;checkbox,多选框，返回一个数组; confirm,确认，返回布尔值; input,输入框，返回一个字符串, password,密码输入框，返回一个字符串
            message: 'String|function(answers)', // 提示信息, 如果是function 需要返回一个字符串,
            default: 'value', // 默认值
            choices: 'Array|function(answers)',
            validate: function(value), // 如果合法返回 true, 否则返回错误信息。 只在 type:input 时有效
            filter:  function(value), // 格式化输入值
            when: function(answers) // 当这个函数返回true时才问这个问题
          }
        ]
      }
    },
  },
})
```
3.加载
在grunt.initConfig之后加入一句
`grunt.loadNpmTasks('grunt-prompt');`

4.注册任务
`grunt.registerTask 'target', ['prompt:target','targetDone']`
表示在执行targetDone任务之前先执行target的提示。

### 实际使用场景

场景1：需要限制输入内容的格式时

```js
prompt:
  new:
  options:
    questions: [
      {
        config: 'new'
        type: 'input'
        message: '请输入需要新建的版本记录文件夹名称:'
        validate: (value) ->
          var valid = semver.valid(value);
            return !!valid || '版本记录文件夹名称必须合法, 例如 5.2.5 详情见 http://semver.org/ for more details.';
      }
    ]
```

场景2：有固定选择项时

```js
prompt:
  generate:
    options:
      questions: [
        {
          config: 'generate'
          type: 'list'
          message: '请选择需要生成html的版本记录文件夹：'
          choices: ['5.1.1', '5.2.2', '5.2.5, '5.2.6']
        }
      ]
```

### 相关链接
1.[Grunt 中文网](http://www.gruntjs.net)
相关介绍很详细，也可以搜索需要的grunt插件
2.[grunt-prompt 插件](http://github.com/dylang/grunt-prompt)
grunt-prompt的更多详细用法
3.[Grunt综述，从安装到使用](http://www.imooc.com/article/12573)
个人关于安装、配置Grunt的基础问题做的归纳总结


