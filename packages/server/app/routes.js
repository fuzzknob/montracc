import * as HomeController from './controller/Home'
import * as SyncController from './controller/Sync'
import { Router } from 'express'

import { userAuth } from './middlewares/auth'

const router = Router()

router.get('/', HomeController.home)
router.post('/sync', [userAuth], SyncController.sync)

export default router
