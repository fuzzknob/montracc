import * as Money from '@/domain/Money'

export default {
  async fetchFromDatabase({ commit }) {
    const {
      totalAmount, totalSpent, storages, expenditures,
    } = await Money.getInitialData()
    commit('setTotalAmount', totalAmount)
    commit('setTotalSpent', totalSpent)
    commit('setStorages', storages)
    commit('setExpenditures', expenditures)
  },

  async spendMoney({ commit, state }, data) {
    const {
      totalAmount, totalSpent, expenditure, storage,
    } = await Money.spendMoney(data)
    commit('setTotalAmount', totalAmount)
    commit('setTotalSpent', totalSpent)
    commit('setStorages', state.storages.map((targetStorage) => {
      if (targetStorage.id === storage.id) {
        return storage
      }
      return targetStorage
    }))
    commit('setExpenditures', state.expenditures.map((targetExpenditure) => {
      if (targetExpenditure.id === expenditure.id) {
        return expenditure
      }
      return targetExpenditure
    }))
  },
}
