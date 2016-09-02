import express from 'express'

import { params
       , create } from './controller'

const router = express.Router()

router.post('/', create)

export default router
