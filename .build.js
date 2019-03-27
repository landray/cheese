const fs = require('fs')
const path = require('path')
const standardReadmeName = 'README.md'

function readDates(dir) {
  return fs
    .readdirSync(dir)
    .filter(f => /^\d{8}$/.test(f))
    .filter(f => {
      return fs.statSync(path.join(__dirname, f)).isDirectory()
    })
    .sort((a, b) => {
      return parseInt(b) - parseInt(a)
    })
}

function readDateArticles(dir) {
  return fs
    .readdirSync(dir)
    .filter(
      f => /^[^.]/.test(f) && fs.statSync(path.join(dir, f)).isDirectory()
    )
    .filter(f => {
      return find2ndNormalizeReadme(path.join(dir, f))
    })
    .map(f => getReadMeContent(path.join(dir, f, standardReadmeName)))
}

function find2ndNormalizeReadme(dir) {
  const readme = fs
    .readdirSync(dir)
    .filter(f => /^readme\.md$/i.test(f))
    .pop()
  if (!readme) return
  const standardPath = path.join(dir, standardReadmeName)
  const currentPath = path.join(dir, readme)
  if (currentPath !== standardPath) {
    fs.renameSync(currentPath, standardPath)
  }
  return standardPath
}

function getReadMeContent(p) {
  const content = fs.readFileSync(p, 'utf8')
  const title = content.split('\n').find(line => /^#+/.test(line.trim()))

  return {
    title: title.replace(/^\s*#+/, '').trim(),
    href: p.replace(__dirname, '.').replace(standardReadmeName, '')
  }
}

function readDateNavi(date) {
  let navi =
    '- ' + date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1 年 $2 月 $3 日') + '\n'
  navi += readDateArticles(path.join(__dirname, date))
    .map(item => `  - [${item.title}](${encodeURI(item.href)})`)
    .join('\n')
  return navi
}

function main() {
  let content = '- [介绍](./)\n'
  content += readDates(__dirname)
    .map(readDateNavi)
    .join('\n')

  fs.writeFileSync(path.join(__dirname, '_summary.md'), content, {
    encoding: 'utf8'
  })
}

main()
