import { getUsers
       , findUser
       , saveUser } from './model'

export const create = (req, res, next) => {
  const { name, password } = req.body

  saveUser(name, password)

  const token = 'abcdefghijklmnopqrstuvwxyz'

  res.json({token})
}
