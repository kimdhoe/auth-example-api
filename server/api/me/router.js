import express from 'express'

import { decodeToken
       , getUser } from '../../auth/auth'
import { show }    from './controller'

const router = express.Router()

router.get('/', decodeToken(), getUser(), show)

export default router
