import config      from './server/config'
import app         from './server/app'
import { logInfo } from './server/util/logger'

app.listen( config.port
          , () => logInfo(`Listening on port ${config.port}.`)
          )
