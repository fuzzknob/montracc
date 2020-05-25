import * as Money from '@/domain/Money'
import Auth from '@/domain/Auth'
import { getUserProfile } from '@/domain/User'

export default {
  async fetchFromDatabase({ commit }) {
    const data = await Money.getInitialData()
    if (!data) {
      return
    }
    const {
      totalAmount, totalSpent, storages, expenditures,
    } = data
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

  async login({ dispatch }, data) {
    await Auth.login(data)
    await getUserProfile()
    await Money.sync()
    return dispatch('fetchFromDatabase')
  },
}
