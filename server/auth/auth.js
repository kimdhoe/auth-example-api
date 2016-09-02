import jwt  from 'jsonwebtoken'
import pick from 'lodash/pick'

import { findUser
       , authenticate
       }      from '../api/user/model'
import config from '../config'

// 토큰을 해독한 후, 사용자 ID를 request에 추가합니다.
export const decodeToken = () => (req, res, next) => {
  // 토큰이 query에 들어있는 경우 header로 복사합니다.
  if (req.query && req.query.hasOwnProperty('access_token'))
    req.headers.authorization = `Bearer ${req.query.access_token}`

  let token = ''

  if (req.headers.authorization)
    token = req.headers.authorization.split(' ')[1]

  if (token) {
    // 토큰을 해독한 후, 사용자 정보(id)를 request에 추가합니다.
    jwt.verify(token, config.secrets.jwt, (err, decoded) => {
      if (err)
        res.status(401).send('사용자 인증에 실패했습니다.')
      else {
        req.user = decoded
        next()
      }
    })
  }
  else {
    res.status(403).send('토큰이 필요합니다.')
  }
}

// 토큰 해독에서 나온 사용자 정보를 DB에서 찾아온 정보로 대체합니다.
export const getUser = () => (req, res, next) => {
  try {
    const user = findUser({ id: req.user.id })

    if (!user)
      res.status(401).send('사용자 정보를 찾을 수 없습니다.')
    else {
      req.user = pick(user, [ 'id', 'username', 'email' ])
      next()
    }
  }
  catch (e) { next(e) }

}

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
