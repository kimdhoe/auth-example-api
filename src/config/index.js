// A NodeEnv is one of:
const DEVELOPMENT = 'development'
const TESTING     = 'testing'
const PRODUCTION  = 'production'

// state - Base configurations.
const base = { env:      ''
             , port:     process.env.PORT || 8080
             , secrets:  { jwt: process.env.JWT || 'secretiamlookingforajob' }
             , expireIn: '7 days'
             , morgan:   'dev'
             }

process.env.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT
base.env             = process.env.NODE_ENV

// Environment specific configurations.
let envConfig = {}
try {
  envConfig = require(`./${base.env}`)
}
catch (e) {
  console.log(`No configuration file for ${base.env}`)
}

const config = { ...base
               , ...envConfig
               }

export default config
