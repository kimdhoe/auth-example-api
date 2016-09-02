import shortid from 'shortid'
import bcrypt  from 'bcrypt'
import find    from 'lodash/find'

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
const users = [ { id:              shortid.generate()
                , username:        'guest'
                , email:           'guest@example.com'
                , password_digest: digest('guest')
                }
              ]

// makeUser : string * string -> User
// Produces a user.
const makeUser = (username, password_digest) => (
  { id: shortid.generate()
  , username
  , password_digest
  }
)

// findUser : string -> User or undefined
// effect - Finds a user with the given information in users DB.
// e.g. findUser({ username: 'foo' })
export const findUser = info =>
  find(users, info)

// saveUser : string * string -> void
// effect - saves a new user with the given name and password to users db.
export const saveUser = (username, plainTextPassword) => {
  users.push(makeUser(username, digest(plainTextPassword)))
}
