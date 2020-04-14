import firebase, { firestore } from 'firebase'
import 'firebase/firestore'
import { getEnvValue } from '@/utils'

const firebaseConfig = {
  apiKey: getEnvValue('API_KEY'),
  authDomain: getEnvValue('AUTH_DOMAIN'),
  databaseURL: getEnvValue('DATABASE_URL'),
  projectId: getEnvValue('PROJECT_ID'),
  appId: getEnvValue('APP_ID'),
}

const app = firebase.initializeApp(firebaseConfig)

const db = app.firestore()

export function getTimeStamp() {
  return firestore.FieldValue.serverTimestamp()
}


function formatData(document) {
  const data = document.data()
  return ({
    ...data,
    id: document.id,
  })
}

export function getDocuments(collectionName, where, orderBy) {
  let collectionRef = db.collection(collectionName)
  if (where && where.length) {
    const [fieldPath, operator, value] = where
    collectionRef = collectionRef.where(fieldPath, operator, value)
  }
  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy)
  }
  return collectionRef.get().then((snapShot) => {
    const results = []
    snapShot.forEach((document) => {
      const result = formatData(document)
      results.push(result)
    })
    return results
  })
}

export function getDocument(collection, docName) {
  return db
    .collection(collection)
    .doc(docName)
    .get()
    .then((document) => formatData(document))
}

export function addDocument(collection, data) {
  return db
    .collection(collection)
    .add({
      ...data,
      createdAt: getTimeStamp(),
      updatedAt: getTimeStamp(),
    })
    .then((snapshot) => snapshot.get())
    .then((document) => formatData(document))
}

export function updateDocument(
  collectionName,
  docName,
  data,
) {
  return db
    .collection(collectionName)
    .doc(docName)
    .update({ ...data, updatedAt: getTimeStamp() })
}

export function deleteDocument(collectionName, docName) {
  return db
    .collection(collectionName)
    .doc(docName)
    .delete()
}
