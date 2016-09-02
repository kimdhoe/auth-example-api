import express from 'express'

import userRouter      from './user/router'
import protectedRouter from './protected/router'

const router = express.Router()

router.use('/users',     userRouter)
router.use('/protected', protectedRouter)

export default router
