import bodyParser     from 'body-parser'
import cors           from 'cors'
import methodOverride from 'method-override'
import morgan         from 'morgan'

import config from '../config'

// effect - Installs application-wide middlewares into the given app.
const installAppMiddlewares = app => {
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(methodOverride())
  app.use(morgan(config.morgan))
}

export default installAppMiddlewares
