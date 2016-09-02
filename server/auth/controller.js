import { signToken } from './auth'

// 사용자 정보로 토큰을 만들어 보냅니다.
export const login = (req, res) => {
  const token = signToken(req.user.id)

  res.json({ token
           , username: req.user.username
           }
          )
}
