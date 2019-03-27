# React Intl

- 官方库: [GitHub React-Intl](https://github.com/yahoo/react-intl)
- 使用文档: [Home · yahoo/react-intl Wiki · GitHub](https://github.com/yahoo/react-intl/wiki)
  React-intl 内置了对时间的多语言的处理， 支持对单数复数处理

## 使用步骤

### 声明语言文件

语言文件数据格式

```ts
interface ILocales {
  [k: string]: string
}
```

示例

```ts
// zh.ts
export default {
  title: '欢迎使用 {name}',
  subtitle: '这是示例的副标题',
  submitBtn: '刷新'
}
```

### 引入语言文件

```ts
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import App from './app'
import zhLocal from './locales/zh'
import enLocal from './locales/en'
// 中文时间多语言
import zh from 'react-intl/locale-data/zh'
// 英文时间多语言
import en from 'react-intl/locale-data/en'

const lang = /zh/.test(navigator.language) ? 'zh' : 'en'
const locale = lang === 'zh' ? zhLocal : enLocal

// 加入内置的关于时间的多语言数据
addLocaleData([...zh, ...en])

ReactDOM.render(
  <IntlProvider
    // 语言对象
    messages={locale}
    // 当前语言
    locale={lang}
    // 默认语言
    defaultLocale="en"
  >
    <App />
  </IntlProvider>,
  document.getElementById('app')
)
```

### 使用语言

```ts
// app.tsx
import React, { Component } from 'react'
// 使用组件方式来使用多语言
import { FormattedMessage } from 'react-intl'
import Editor from './editor'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>
          <FormattedMessage
            tagName="a"
            id="title"
            values={{ name: 'Solomon' }}
          />
          <small>
            <FormattedMessage id="agsdfsd" defaultMessage="默认标题" />
          </small>
        </h1>
        <Editor layout="vertical" />
      </div>
    )
  }
}

// editor.tsx
import React, { Component } from 'react'
// 通过JS API来使用多语言
import { injectIntl, InjectedIntl } from 'react-intl'

// 组件自带属性
interface IProps {
  layout?: 'vertical' | 'horizontal'
  onSubmit?: (object) => void
}

// 组件被注入的属性多语言属性
interface IIntlProps {
  intl: InjectedIntl
}

class Editor extends Component<IProps & IIntlProps> {
  static defaultProps: IProps = {
    layout: 'vertical'
  }
  getFormData(form: HTMLFormElement) {
    return {}
  }
  onSubmit(e: Event) {
    e.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(this.getFormData(e.target as HTMLFormElement))
    }
  }
  render() {
    const formatMessage = this.props.intl.formatMessage
    return (
      <form
        className={'form form-' + this.props.layout}
        onSubmit={this.onSubmit.bind(this)}
      >
        <label htmlFor="content">
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            placeholder={formatMessage({
              id: 'formPlh',
              defaultMessage: '请输入内容'
            })}
          />
        </label>
        <button type="submit">{formatMessage({ id: 'submitBtn' })}</button>
      </form>
    )
  }
}
export default injectIntl(Editor)
```
