const assert = require('assert')
const fs = require('fs')
const path = require('path')

const root = __dirname
const required = [
  'index.html',
  'README.md',
  'package.json',
]

for (const file of required) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`)
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

assert.ok(html.includes('<title>Gipity4</title>'), 'index title is Gipity4')
assert.ok(html.includes('Gipity4'), 'index includes Gipity4')
assert.equal(pkg.private, true)
assert.equal(pkg.scripts.test, 'node gipity.test.js')

console.log('gipity4 splash smoke passed')