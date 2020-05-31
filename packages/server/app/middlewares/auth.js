import { getUIDFromToken } from '../services/firebase'
import User from '../models/User'

export async function userAuth(req, res, next) {
  const token = req.header('Auth-Token')
  if (!token) {
    res.status(401).send('You are not authenticated')
    return
  }
  try {
    const authId = await getUIDFromToken(token)
    const user = (await User.where([ 'authId', '==', authId ]))[0]
    req.user = user
    next()
  } catch (_ignored) {
    res.status(401).send('You are not authenticated')
  }
}
