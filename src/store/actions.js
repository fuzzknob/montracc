import User from '@/models/User'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'

export default {
  async fetchFromDatabase({ commit }) {
    const user = new User()
    const storage = new Storage()
    const expenditure = new Expenditure()

    const userData = await user.get()
    const storages = await storage.getAll()
    const expenditures = await expenditure.getAll()
    commit('setTotalAmount', userData.totalAmount)
    commit('setTotalSpent', userData.totalSpent)
    commit('setStorages', storages)
    commit('setExpenditures', expenditures)
  },
}
