import { getInitialData } from '@/domain/Money'

export default {
  async fetchFromDatabase({ commit }) {
    const {
      totalAmount, totalSpent, storages, expenditures,
    } = await getInitialData()
    commit('setTotalAmount', totalAmount)
    commit('setTotalSpent', totalSpent)
    commit('setStorages', storages)
    commit('setExpenditures', expenditures)
  },
}
