import config     from '../config'
import { cyan
       , green
       , red
       , yellow } from 'colors'

// Given an array, console-logs the elements.
const logXs = xs => console.log(...xs)

const consoleLog = config.shouldLog ? logXs : () => {}

// Logs colorful messages with a tag prefixed.
export const logInfo = (...xs) => {
  const tag = green('[* LOG *]')

  const format = x =>
    typeof x === 'object'
      ? `${tag}  ${cyan(JSON.stringify(x, null, 2))}`
      : `${tag}  ${cyan(x)}`

  consoleLog(xs.map(format))
}

// Logs colorful error messages with a tag prefixed.
export const logError = (...es) => {
  const format = e => {
    e          = e.stack || e
    const name = e.name  || 'ERR'
    const tag  = yellow(`[* ${name} *]`)

    return `${tag}  ${red(e)}`
  }

  consoleLog(es.map(format))
}
