import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalAmount: 0,
    totalSpent: 0,
    storages: [
      {
        id: 'asdasd',
        name: 'In Hand',
        amount: 0,
      },
      {
        id: 'bsbsbsbs',
        name: 'NMB',
        amount: 0,
      },
      {
        id: 'rsrsrs',
        name: 'MBL',
        amount: 0,
      },
    ],
    expenditures: [
      {
        id: 'repoas',
        name: 'Food',
        limit: 100,
        spent: 0,
      },
      {
        id: 'repoer',
        name: 'Home',
        limit: 0,
        spent: 0,
      },
      {
        id: 'travel',
        name: 'Travel',
        limit: 100,
        spent: 0,
      },
      {
        id: 'misc',
        name: 'Misc',
        limit: 100,
        spent: 0,
      },
    ],
  },
  mutations: {
    setExpenditures(state, expenditures) {
      state.expenditures = expenditures
    },
    setStorages(state, storages) {
      state.storages = storages
    },
    setTotal(state, total) {
      state.total = total
    },
    setSpent(state, spent) {
      state.spent = spent
    },
  },
  actions,
})
