import User from '../models/User'
import Storage from '../models/Storage'
import Expenditure from '../models/Expenditure'
import Transaction from '../models/Transaction'

export default class Money {
  constructor(userId) {
    this.userId = userId
  }

  addTransaction(data) {
    const transaction = new Transaction()
    transaction.type = data.type
    transaction.amount = data.amount
    transaction.description = data.description
    transaction.from = data.from
    transaction.to = data.to
    transaction.userId = this.userId
    return transaction.save()
  }

  async updateStorageAmount(data) {
    const storage = await this.getDataWithLocalDbId(Storage, data.storageId)
    storage.amount = data.amount
    return storage.update()
  }

  async updateAggregateAmount(data) {
    const user = await User.get(this.userId)
    user.totalAmount = data.totalAmount
    user.totalSpent = data.totalSpent
    return user.update()
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
    const entity = await model.where([['userId', '==', this.userId], ['localDBId', '==', localDBId]])
    return entity[0]
  }

  async getAllData() {
    const user = await User.get(this.userId)
    const storages = await Storage.where(['userId', '==', this.userId])
    const expenditures = await Expenditure.where(['userId', '==', this.userId])
    return {
      totalAmount: user.totalAmount,
      totalSpent: user.totalSpent,
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
