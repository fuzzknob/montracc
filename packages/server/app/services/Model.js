import {
  getDocument,
  getDocuments,
  updateDocument,
  addDocument,
  deleteDocument,
} from '../services/firebase'

export default class Model {
  static collection = ''

  constructor(data) {
    if (data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key]
      })
    }
  }

  getInsertableData() {
    const data = {}
    Object.keys(this).forEach((key) => {
      if (key === 'id') {
        return
      }
      data[key] = this[key]
    })
    return data
  }

  save() {
    if (this.id) {
      return this.update()
    }
    const data = this.getInsertableData()
    return addDocument(this.constructor.collection, data).then((data) => {
      this.id = data.id
      this.createdAt = data.createdAt
      this.updatedAt = data.updatedAt
    })
  }

  update() {
    const data = this.getInsertableData()
    return updateDocument(this.constructor.collection, this.id, data)
  }

  delete() {
    if (this.id) {
      return deleteDocument(this.constructor.collection, this.id)
    }
    throw 'You cannot delete document that is not created'
  }

  static where(whereCase) {
    const DerivedModel = this
    return getDocuments(DerivedModel.collection, whereCase).then((documents) => {
      return documents.map(document => new DerivedModel(document))
    })
  }

  static get(id) {
    const DerivedModel = this
    return getDocument(DerivedModel.collection, id).then((document) => {
      return new DerivedModel(document)
    })
  }

  static getAll() {
    return this.where()
  }
}
