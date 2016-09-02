import express from 'express'

import { verifyUser } from './auth'
import { login }      from './controller'

const router = express.Router()

router.post('/', verifyUser(), login)

export default router
