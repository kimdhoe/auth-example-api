const bodyParser     = require('body-parser')
const cors           = require('cors')
const methodOverride = require('method-override')
const morgan         = require('morgan')

// effect - Installs application-wide middlewares into the given app.
const installAppMiddlewares = app => {
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(methodOverride())
  app.use(morgan('dev'))
}

module.exports = installAppMiddlewares
