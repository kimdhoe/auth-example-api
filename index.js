const config = require('./server/config')
const app    = require('/server/app')
const logger = require('./server/util/logger')

app.listen( config.port
          , () => logger.log('Listening on port' + config.port)
          )
