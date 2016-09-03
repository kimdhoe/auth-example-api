import config      from './config'
import app         from './app'
import { logInfo } from './util/logger'

app.listen( config.port
          , () => logInfo(`Listening on port ${config.port}.`)
          )
