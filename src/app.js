import express from 'express'

import installAppMiddlewares from './middlewares'
import apiRouter             from './api'
import authRouter            from './auth/router'
import { logError }          from './util/logger'

const app = express()

installAppMiddlewares(app)

app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    return res.status(401).send('Invalid token')

  logError(err.stack)

  res.status(500).send('Something went wrong.')
})

export default app
