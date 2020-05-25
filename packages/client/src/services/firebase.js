import firebase from 'firebase'
import { getEnvValue } from '@/utils'

const firebaseConfig = {
  apiKey: getEnvValue('VUE_APP_API_KEY'),
  authDomain: getEnvValue('VUE_APP_AUTH_DOMAIN'),
  projectId: getEnvValue('VUE_APP_PROJECT_ID'),
  appId: getEnvValue('VUE_APP_APP_ID'),
}

const app = firebase.initializeApp(firebaseConfig)

export function login(email, password) {
  return app.auth().signInWithEmailAndPassword(email, password)
}

export function logout() {
  return app.auth().signOut()
}

export function getIdToken() {
  return app.auth()
}

export function onAuthStateChanged(callback) {
  return app.auth().onAuthStateChanged(callback)
}
