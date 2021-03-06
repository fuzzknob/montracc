import DexieDb from 'dexie'

export const db = new DexieDb('montracc')

db.version(1).stores({
  user: 'id,firstName,lastName,email',
  storages: '++id,name,amount',
  expenditures: '++id,name,limit,spent',
  actions: '++id,action,payload',
})

export default class Model {
  tableName

  table

  constructor(tableName) {
    this.tableName = tableName
    this.table = db[tableName]
  }

  add(data) {
    return this.table.add(data)
  }

  bulkAdd(items) {
    return this.table.bulkAdd(items)
  }

  bulkPut(items) {
    return this.table.bulkPut(items)
  }

  bulkDelete(keys) {
    return this.table.bulkDelete(keys)
  }

  get(id) {
    return this.table.get(id)
  }

  async getAll() {
    const data = []
    await this.table.each((item) => {
      data.push(item)
    })
    return data
  }

  update(id, data) {
    return this.table.update(id, data)
  }

  put(data) {
    return this.table.put(data)
  }

  delete(id) {
    return this.table.delete(id)
  }

  async deleteAll() {
    const keys = (await this.getAll()).map((item) => item.id)
    return this.table.bulkDelete(keys)
  }

  async where(query) {
    return this.table.where(query)
  }
}
