import request from '@/services/request'
import User from '@/models/User'

export async function getUserProfile() {
  const profile = await request({
    method: 'GET',
    url: 'user/profile',
  })
  await User.put(profile)
  return profile
}
