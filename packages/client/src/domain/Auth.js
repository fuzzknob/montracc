import {
  login as loginFirebase,
  logout as logoutFirebase,
  onAuthStateChanged,
} from '@/services/firebase'

export class Auth {
  firebaseAuthUser = null

  initializeAuth() {
    let hasResolvePromise = false
    return new Promise((resolve) => {
      onAuthStateChanged((user) => {
        this.firebaseAuthUser = user
        if (!hasResolvePromise) {
          resolve(true)
          hasResolvePromise = true
        }
      })
    })
  }

  async getAuthToken() {
    if (!this.firebaseAuthUser) {
      return ''
    }
    return this.firebaseAuthUser.getIdToken()
  }

  login(loginInfo) {
    return loginFirebase(loginInfo.email, loginInfo.password)
      .then((cred) => {
        this.firebaseAuthUser = cred.user
      })
      .catch((e) => {
        if (e.code === 'auth/user-not-found') {
          // eslint-disable-next-line
          throw 'Email or Password wrong'
        }
        throw e.message
      })
  }

  logout() {
    return logoutFirebase().then(() => {
      window.location.href = ''
    })
  }
}

export default new Auth()
