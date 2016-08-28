const { map }    = require('lodash')
const { cyan
      , green
      , red
      , yellow } = require('colors')
const shouldLog  = require('../config').shouldLog

// Given an array, console-logs the elements.
const logXs = xs => console.log(...xs)

const consoleLog = shouldLog ? logXs : ()=>{}

// Logs colorful messages with a tag prefixed.
const logInfo = (...xs) => {
  const tag = green('[* LOG *]')

  const format = x =>
    typeof x === 'object'
      ? `${tag}  ${cyan(JSON.stringify(x, null, 2))}`
      : `${tag}  ${cyan(x)}`

  consoleLog(map(xs, format))
}

// Logs colorful error messages with a tag prefixed.
const logError = (...es) => {
  const format = e => {
    e          = e.stack || e
    const name = e.name  || 'ERROR'
    const tag  = yellow(`[* ${name} *]`)

    return `${tag}  ${red(e)}`
  }

  consoleLog(map(es, format))
}

exports.logInfo  = logInfo
exports.logError = logError
