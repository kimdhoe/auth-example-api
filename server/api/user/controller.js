import isEmpty from 'lodash/isEmpty'

import validate      from '../../validations/signup'
import { getUsers
       , findUser
       , saveUser }  from './model'
import { logError }  from '../../util/logger'
import { signToken } from '../../auth/auth'

const validateUser = user => {
  const { errors } = validate(user)

  if (findUser({ username: user.username }))
    errors.username = '이미 사용 중인 이름입니다.'

  if (findUser({ email: user.email }))
    errors.email = '이미 사용 중인 이메일 주소입니다.'

  return { errors
         , isValid: isEmpty(errors)
         }
}

export const create = (req, res, next) => {
  const { errors, isValid } = validateUser(req.body)

  if (isValid) {
    try {
      saveUser(req.body)
    }
    catch (e) {
      logError(e)
      return res.status(500).json({ error: e })
    }

    // 사용자 등록 성공시 바로 토큰을 보냅니다.
    const { id, username } = findUser({ username: req.body.username })
    const token = signToken(id)

    res.json({ token, username })
  }
  else
    res.status(400).json(errors)
}
