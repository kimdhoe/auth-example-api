import express from 'express'

import userRouter      from './user/router'
import protectedRouter from './protected/router'
import meRouter        from './me/router'

const router = express.Router()

router.use('/users',     userRouter)
router.use('/protected', protectedRouter)
router.use('/me',        meRouter)

export default router
