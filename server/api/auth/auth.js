import jwt from 'jsonwebtoken'

import { findUser
       , authenticate
       }      from '../user/model'
import config from '../../config'

// Verifies a user from a request body.
export const verifyUser = () => (req, res, next) => {
  const { identifier, password } = req.body

  const user = findUser({ username: identifier })
            || findUser({ email:    identifier })

  if (!user) {
    res.status(401).json({ errors: { form: '정보가 올바르지 않습니다.' } })
  }
  else {
    if (authenticate(user, password)) {
      req.user = user
      next()
    }
    else {
      res.status(401).json({ errors: { form: '정보가 올바르지 않습니다.' } })
    }
  }
}

// Given a user ID, generates a token.
export const signToken = id =>
  jwt.sign( { id }
          , config.secrets.jwt
          , { expiresIn: config.expireTime }
          )
