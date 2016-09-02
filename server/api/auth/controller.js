import { signToken } from './auth'

export const login = (req, res) => {
  const token = signToken(req.user.id)

  res.json({ token
           , username: req.user.username
           }
          )
}
