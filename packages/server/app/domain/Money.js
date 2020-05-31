import User from '../models/User'
import Storage from '../models/Storage'
import Expenditure from '../models/Expenditure'
import Transaction from '../models/Transaction'

export default class Money {
  constructor(user) {
    this.user = user
  }

  addTransaction(data) {
    const transaction = new Transaction()
    transaction.type = data.type
    transaction.amount = data.amount
    transaction.description = data.description
    transaction.from = data.from
    transaction.to = data.to
    transaction.userId = this.user.id
    return transaction.save()
  }

  async updateStorageAmount(data) {
    const storage = await this.getDataWithLocalDbId(Storage, data.storageId)
    storage.amount = data.amount
    return storage.update()
  }

  async updateAggregateAmount(data) {
    this.user.totalAmount = data.totalAmount
    this.user.totalSpent = data.totalSpent
    return this.user.update()
  }

  async updateExpenditureSpent(data) {
    const expenditure = await this.getDataWithLocalDbId(Expenditure, data.expenditureId)
    expenditure.spent = data.spent
    return expenditure.update()
  }

  async updateExpenditureLimit(data) {
    const expenditure = await this.getDataWithLocalDbId(Expenditure, data.expenditureId)
    expenditure.limit = data.limit
    return expenditure.update()
  }

  async getDataWithLocalDbId(model, localDBId) {
    const entity = await model.where([['userId', '==', this.user.id], ['localDBId', '==', localDBId]])
    return entity[0]
  }

  async getAllData() {
    const storages = await Storage.where(['userId', '==', this.user.id])
    const expenditures = await Expenditure.where(['userId', '==', this.user.id])
    return {
      totalAmount: this.user.totalAmount,
      totalSpent: this.user.totalSpent,
      storages: storages.map((storage) => ({
        id: storage.localDBId,
        name: storage.name,
        amount: storage.amount,
      })),
      expenditures: expenditures.map((expenditure) => ({
        id: expenditure.localDBId,
        name: expenditure.name,
        limit: expenditure.limit,
        spent: expenditure.spent,
      })),
    }
  }
}
