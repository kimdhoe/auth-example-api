import validator from 'validator'
import isEmpty   from 'lodash/isEmpty'

const validate = ({ username, email, password, passwordConfirmation }) => {
  const errors = {}

  if (validator.isNull(username))
    errors.username = '이름이 필요합니다.'

  if (!validator.isEmail(email))
    errors.email = '이메일 주소가 올바르지 않습니다.'

  if (validator.isNull(email))
    errors.email = '이메일 주소가 필요합니다.'

  if (validator.isNull(password))
    errors.password = '암호가 필요합니다.'

  if (validator.isNull(passwordConfirmation))
    errors.passwordConfirmation = '암호 확인이 필요합니다.'

  if (!validator.equals(password, passwordConfirmation))
    errors.passwordConfirmation = '암호와 암호확인이 일치하지 않습니다.'

  return { errors
         , isValid: isEmpty(errors)
         }
}

export default validate
