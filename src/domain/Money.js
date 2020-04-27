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

  return User.update({
    totalAmount,
    totalSpent,
  })
}

export async function transferMoney({
  amount, from, to, transferCharge,
}) {
  const realTransferredAmount = amount - transferCharge
  if (from !== 'external') {
    const fromStorage = await Storage.get(from)
    if (fromStorage.amount < amount) {
      throw new Error(`You don't have enough money in ${fromStorage.name} to transfer.`)
    }
    await Storage.update(from, {
      amount: fromStorage.amount - amount,
    })
  } else {
    const user = await User.get()
    await User.update({
      totalAmount: user.totalAmount + realTransferredAmount,
      totalSpent: user.totalSpent + transferCharge,
    })
  }
  const toStorage = await Storage.get(to)
  return Storage.update(to, {
    amount: toStorage.amount + realTransferredAmount,
  })
}

export function editLimit(expenditureId, limit) {
  return Expenditure.update(expenditureId, {
    limit,
  })
}
