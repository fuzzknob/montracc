import User from '@/models/User'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'

export async function getInitialData() {
  const user = await User.get()
  const storages = await Storage.getAll()
  const expenditures = await Expenditure.getAll()
  return {
    totalAmount: user.totalAmount,
    totalSpent: user.totalSpent,
    storages,
    expenditures,
  }
}

export async function spendMoney({ amount, storageId, expenditureId }) {
  const storage = await Storage.get(storageId)
  const expenditure = await Expenditure.get(expenditureId)
  const user = await User.get()

  if (storage.amount < amount) {
    throw new Error(`You don't have enough money in ${storage.name}`)
  }
  await Storage.update(storageId, {
    amount: storage.amount - amount,
  })
  await Expenditure.update(expenditureId, {
    spent: expenditure.spent + amount,
  })
  const totalAmount = user.totalAmount - amount
  const totalSpent = user.totalSpent + amount

  User.update({
    totalAmount,
    totalSpent,
  })

  return {
    totalAmount,
    totalSpent,
    expenditure: {
      ...expenditure,
      spent: expenditure.spent + amount,
    },
    storage: {
      ...storage,
      amount: storage.amount - amount,
    },
  }
}