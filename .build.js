const fs = require('fs')
const { join } = require('path')
const standardReadmeName = 'README.md'

main()

function main() {
  const summary = fs
    .readdirSync(__dirname)
    .filter(
      f => /^\d{8}$/.test(f) && fs.statSync(join(__dirname, f)).isDirectory()
    )
    .sort((a, b) => {
      return parseInt(b) - parseInt(a)
    })
    .map(date => {
      let navi =
        '- ' +
        date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1 年 $2 月 $3 日') +
        '\n'

      navi += fs
        .readdirSync(join(__dirname, date))
        .filter(
          f =>
            /^[^.]/.test(f) &&
            fs.statSync(join(__dirname, date, f)).isDirectory()
        )
        .filter(f => {
          return find2ndNormalizeReadme(join(__dirname, date, f))
        })
        .map(f =>
          getReadMeContent(join(__dirname, date, f, standardReadmeName))
        )
        .join('\n')
      return navi
    })
    .join('\n')

  fs.writeFileSync(join(__dirname, '_summary.md'), summary, {
    encoding: 'utf8'
  })
}

function find2ndNormalizeReadme(dir) {
  const readme = fs
    .readdirSync(dir)
    .filter(f => /^readme\.md$/i.test(f))
    .pop()
  if (!readme) return
  const standardPath = join(dir, standardReadmeName)
  const currentPath = join(dir, readme)
  if (currentPath !== standardPath) {
    fs.renameSync(currentPath, standardPath)
  }
  return standardPath
}

function getReadMeContent(p) {
  const content = fs.readFileSync(p, 'utf8')
  let title = content.split('\n').find(line => /^#+/.test(line.trim()))
  title = title.replace(/^\s*#+/, '').trim()
  const href = p.replace(__dirname, '.').replace(standardReadmeName, '')
  return `  - [${title}](${encodeURI(href)})`
}
