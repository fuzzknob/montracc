import User from '@/models/User'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'

export default {
  async fetchFromDatabase({ commit }) {
    const user = new User()
    const storage = new Storage()
    const expenditure = new Expenditure()

    const userData = await user.get()
    const storageData = await storage.getAll()
    const expenditureData = await expenditure.getAll()
    console.log({ userData, storageData, expenditureData })
    commit('setTotalAmount', userData.totalAmount)
    commit('setTotalSpent', userData.totalSpent)
    commit('setExpenditures', expenditureData)
  },
}
