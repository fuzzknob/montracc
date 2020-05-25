import axios from 'axios'
import Auth from '@/domain/Auth'
import { getEnvValue } from '@/utils'

const BASE_URL = getEnvValue('VUE_APP_API_URL')

const service = axios.create({
  baseURL: BASE_URL,
})

service.interceptors.response.use((response) => response.data)

export default async function request(config) {
  const token = await Auth.getAuthToken()
  return service({
    headers: {
      'Auth-Token': token,
    },
    ...config,
  })
}
