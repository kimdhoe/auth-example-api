import isEmpty from 'lodash/isEmpty'

import validate     from '../../validations/signup'
import { getUsers
       , findUser
       , saveUser } from './model'

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
    const { username, password } = req.body

    try {
      saveUser(username, password)
    }
    catch (e) {
      return res.status(500).json({ error: err })
    }

    res.json({ success: true })
  }
  else
    res.status(400).json(errors)
}
