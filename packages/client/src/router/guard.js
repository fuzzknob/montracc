import Auth from '@/domain/Auth'

export function applyGuard(router) {
  router.beforeEach(async (to, from, next) => {
    if (to.name === 'Login') {
      next()
      return
    }
    const token = await Auth.getAuthToken()
    if (token) {
      next()
      return
    }
    next({ path: '/login' })
  })
}
