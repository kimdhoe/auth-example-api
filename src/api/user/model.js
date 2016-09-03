import shortid from 'shortid'
import bcrypt  from 'bcrypt'
import find    from 'lodash/find'

import { logInfo } from '../../util/logger'

// digest : string -> string
// Hashes a given string using bcrypt.
const digest = s =>
  bcrypt.hashSync(s, 10)

// type User = { id:              string
//             , username:        string
//             , email:           string
//             , password_digest: string
//             }

// users : Array<User>
// state - User DB.
const users = [ { id:              'ByKT4GPs'
                , username:        'guest'
                , email:           'guest@example.com'
                , password_digest: digest('guest')
                }
              ]

// makeUser : string * string * string -> User
// Produces a user.
const makeUser = (username, email, password_digest) => (
  { id: shortid.generate()
  , username
  , email
  , password_digest
  }
)

// findUser : { string } -> User or undefined
// effect - Finds a user with the given information in users DB.
// e.g. findUser({ username: 'foo' })
export const findUser = info =>
  find(users, info)

// saveUser : { string, string, string } -> void
// effect - saves a new user with the given name and password to users db.
export const saveUser = ({ username, email, password }) => {
  const newUser = makeUser(username, email, digest(password))

  users.push(newUser)

  logInfo('saved a new user:')
  logInfo(newUser)
}

// authenticate : User * string -> boolean
// Is a given password correct?
export const authenticate = (user, password) =>
  bcrypt.compareSync(password, user.password_digest)
