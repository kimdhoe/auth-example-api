const config      = require('./server/config')
const app         = require('./server/app')
const { logInfo } = require('./server/util/logger')

app.listen( config.port
          , () => logInfo('Listening on port' + config.port)
          )
