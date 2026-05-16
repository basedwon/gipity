#!/usr/bin/env node

const fs = require('fs')
const http = require('http')
const path = require('path')

const ROOT = __dirname
const DEFAULT_PORT = 4177

function argValue (name) {
  const index = process.argv.indexOf(name)
  if (index === -1)
    return ''

  return process.argv[index + 1] || ''
}

function getPort () {
  const raw = argValue('--port') || process.env.PORT || String(DEFAULT_PORT)
  const port = Number(raw)

  if (!Number.isInteger(port) || port < 1 || port > 65535)
    return DEFAULT_PORT

  return port
}

function contentType (file) {
  if (file.endsWith('.html'))
    return 'text/html; charset=utf-8'

  if (file.endsWith('.json'))
    return 'application/json; charset=utf-8'

  if (file.endsWith('.svg'))
    return 'image/svg+xml; charset=utf-8'

  if (file.endsWith('.png'))
    return 'image/png'

  if (file.endsWith('.ico'))
    return 'image/x-icon'

  return 'application/octet-stream'
}

function resolveFile (url) {
  const clean = decodeURIComponent(url.split('?')[0]).replace(/^\/+/, '')
  const rel = clean && clean !== '/' ? clean : 'index.html'
  const file = path.resolve(ROOT, rel)

  if (!file.startsWith(ROOT))
    return path.join(ROOT, 'index.html')

  return file
}

function sendFile (res, file) {
  fs.readFile(file, (err, body) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }

    res.writeHead(200, { 'content-type': contentType(file) })
    res.end(body)
  })
}

function start () {
  const port = getPort()
  const server = http.createServer((req, res) => {
    sendFile(res, resolveFile(req.url || '/'))
  })

  server.listen(port, '127.0.0.1', () => {
    console.log(`Gipity4 splash: http://127.0.0.1:${port}/`)
  })
}

const command = process.argv[2] || 'up'

if (command === 'up' || command === 'start')
  start()
else {
  console.log('Usage: gipity up [--port 4177]')
  process.exit(command === '--help' || command === '-h' ? 0 : 1)
}
