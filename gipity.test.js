const assert = require('assert')
const fs = require('fs')
const path = require('path')

const root = __dirname
const required = [
  'index.html',
  'README.md',
  'LICENSE',
  'package.json',
  'gipity.js',
]

for (const file of required) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`)
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

assert.ok(html.includes('<title>Gipity4</title>'), 'index title is Gipity4')
assert.equal(pkg.name, 'gipity4')
assert.equal(pkg.bin.gipity, './gipity.js')
assert.equal(pkg.engines.node, '>=16')

console.log('gipity4 splash smoke passed')
