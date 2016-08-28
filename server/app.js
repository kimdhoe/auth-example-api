const express = require('express')
const { logError } = require('./util/logger')

const app = express()

app.use('/', (req, res, next) => {
  res.send({ok: true})
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    return res.status(401).send('Invalid token')

  logError(err.stack)
  res.status(500).send('NOOO')
})

module.exports = app
