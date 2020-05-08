import admin, { firestore } from 'firebase-admin'

const SERVICE_KEY = process.env.SERVICE_KEY

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(SERVICE_KEY)),
})

export const db = admin.firestore(app)

export function getTimeStamp() {
  return firestore.FieldValue.serverTimestamp()
}

function formatData(document) {
  const data = document.data()
  return {
    ...data,
    id: document.id,
  }
}

export function getDocuments(collectionName, wheres, orderBy) {
  let collectionRef = db.collection(collectionName)
  if (wheres && wheres.length) {
    wheres = typeof wheres[0] === 'string' ? [wheres] : wheres
    wheres.forEach((where) => {
      const [fieldPath, operator, value] = where
      collectionRef = collectionRef.where(fieldPath, operator, value)
    })
  }
  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy)
  }
  return collectionRef.get().then(snapShot => {
    const results = []
    snapShot.forEach(document => {
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
    .then(document => {
      return formatData(document)
    })
}

export function addDocument(collection, data) {
  return db
    .collection(collection)
    .add({
      ...data,
      createdAt: getTimeStamp(),
      updatedAt: getTimeStamp(),
    })
    .then(snapshot => {
      return snapshot.get()
    })
    .then(document => {
      return formatData(document)
    })
}

export function updateDocument(collectionName, docName, data) {
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

export function getUIDFromToken(token) {
  return admin
    .auth()
    .verifyIdToken(token)
    .then(decoded => {
      return decoded.uid
    })
}

export function createUser(userProps) {
  return admin
    .auth()
    .createUser(userProps)
    .then(user => {
      return user.uid
    })
}

export default admin
