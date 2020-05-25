import * as HomeController from './controller/Home'
import * as SyncController from './controller/Sync'
import * as UserController from './controller/User'
import { Router } from 'express'

import { userAuth } from './middlewares/auth'

const router = Router()

router.get('/', HomeController.home)
router.post('/sync', [userAuth], SyncController.sync)
router.get('/user/profile', [userAuth], UserController.getProfile)

export default router
