import * as HomeController from './controller/Home'
import * as SyncController from './controller/Sync'
import { Router } from 'express'

const router = Router()

router.get('/', HomeController.home)
router.post('/sync', SyncController.sync)

export default router
