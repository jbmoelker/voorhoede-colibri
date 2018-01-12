const fs = require('fs')
const app = require('express')()
const compression = require('compression')
const sapper = require('sapper')
const static = require('serve-static')

const { PORT = 2473 } = process.env

// this allows us to do e.g. `fetch('/api/blog')` on the server
const fetch = require('node-fetch')
global.fetch = (url, opts) => {
  if (url[0] === '/') url = `http://localhost:${PORT}${url}`
  return fetch(url, opts)
}

app.get('/', (req, res) => res.redirect('/nl'))

app.use(compression({ threshold: 0 }))

app.use('/api/', require('./lib/api/router'))

app.use(static('assets'))

app.use(sapper())

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
