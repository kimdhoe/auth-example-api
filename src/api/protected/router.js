import express from 'express'

import { decodeToken
       , getUser } from '../../auth/auth'
import { create }  from './controller'

const router = express.Router()

router.post('/', decodeToken(), getUser(), create)

export default router
