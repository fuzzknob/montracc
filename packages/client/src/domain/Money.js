import User from '@/models/User'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'
import Action from '@/models/Action'
import { formatCurrency } from '@/utils/formatters'

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

async function updateStorageAmount(storageId, amount) {
  await Storage.update(storageId, {
    amount,
  })
  Action.add({
    action: 'updateStorageAmount',
    payload: {
      storageId,
      amount,
    },
  })
}

async function updateAggregateAmount(totalAmount, totalSpent) {
  await User.update({
    totalAmount,
    totalSpent,
  })
  Action.add({
    action: 'updateAggregateAmount',
    payload: {
      totalAmount,
      totalSpent,
    },
  })
}

async function updateExpenditureSpent(expenditureId, amount) {
  await Expenditure.update(expenditureId, {
    spent: amount,
  })
  Action.add({
    action: 'updateExpenditureSpent',
    payload: {
      expenditureId,
      amount,
    },
  })
}

function addTransaction(data) {
  console.log(data.description)
  Action.add({
    action: 'addTransaction',
    payload: data,
  })
}

export async function spendMoney({
  amount, storageId, expenditureId, description,
}) {
  const storage = await Storage.get(storageId)
  const expenditure = await Expenditure.get(expenditureId)
  const user = await User.get()

  if (storage.amount < amount) {
    throw new Error(`You don't have enough money in ${storage.name}`)
  }
  await updateStorageAmount(storageId, storage.amount - amount)
  await updateExpenditureSpent(expenditureId, expenditure.spent + amount)
  const totalAmount = user.totalAmount - amount
  const totalSpent = user.totalSpent + amount
  await updateAggregateAmount(totalAmount, totalSpent)
  addTransaction({
    type: 'OUTGOING',
    amount,
    description: description || `Spend ${formatCurrency(amount)} on ${expenditure.name}`,
    from: storage.name,
    to: expenditure.name,
  })
}

export async function transferMoney({
  amount, from, to, transferCharge, description,
}) {
  const fromStorage = from === 'external' ? null : await Storage.get(from)
  const toStorage = await Storage.get(to)
  if (fromStorage) {
    const totalOutgoing = amount + transferCharge
    if (fromStorage.amount < totalOutgoing) {
      throw new Error(`You don't have enough money in ${fromStorage.name} to transfer.`)
    }
    await updateStorageAmount(from, fromStorage.amount - totalOutgoing)
    addTransaction({
      type: 'OUTGOING',
      amount,
      description: `${formatCurrency(amount)} was transferred to ${toStorage.name} from ${fromStorage.name}.`,
      from: fromStorage.name,
      to: toStorage.name,
    })
  } else {
    const user = await User.get()
    await updateAggregateAmount(user.totalAmount + amount, user.totalSpent)
  }
  if (transferCharge) {
    const user = await User.get()
    await updateAggregateAmount(user.totalAmount, user.totalSpent + transferCharge)
    addTransaction({
      type: 'OUTGOING',
      amount: transferCharge,
      description: `${formatCurrency(transferCharge)} was changed while transferring money to ${toStorage.name} from ${fromStorage.name}.`,
      from: fromStorage.name,
      to: 'External',
    })
  }
  await updateStorageAmount(to, toStorage.amount + amount)
  addTransaction({
    type: 'INCOMING',
    amount,
    description: description
    || `${formatCurrency(amount)} was transferred from ${fromStorage ? fromStorage.name : 'external source'} to ${toStorage.name}.`,
    from: fromStorage ? fromStorage.name : 'External',
    to: toStorage.name,
  })
}

export function editLimit(expenditureId, limit) {
  Expenditure.update(expenditureId, {
    limit,
  })
  Action.add({
    action: 'updateExpenditureLimit',
    payload: {
      expenditureId,
      limit,
    },
  })
}
