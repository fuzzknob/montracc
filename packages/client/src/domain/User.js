import request from '@/services/request'

export function fetchProfile() {
  return request({
    method: 'GET',
    url: 'user/profile',
  })
}
