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

  async spendMoney({ dispatch }, data) {
    await Money.spendMoney(data)
    dispatch('fetchFromDatabase')
  },

  async transferMoney({ dispatch }, data) {
    await Money.transferMoney(data)
    dispatch('fetchFromDatabase')
  },

  async editLimit({ commit, state }, data) {
    await Money.editLimit(data.id, data.limit)
    const expenditures = state.expenditures.map((expenditure) => {
      if (expenditure.id === data.id) {
        return {
          ...expenditure,
          limit: data.limit,
        }
      }
      return expenditure
    })
    commit('setExpenditures', expenditures)
  },
}
