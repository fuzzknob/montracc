import request from '@/services/request'
import User from '@/models/User'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'
import Action from '@/models/Action'
import { formatCurrency } from '@/utils/formatters'

export async function getInitialData() {
  const user = await User.get()
  if (!user) {
    return null
  }
  const storages = await Storage.getAll()
  const expenditures = await Expenditure.getAll()
  return {
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

async function updateExpenditureSpent(expenditureId, spent) {
  await Expenditure.update(expenditureId, {
    spent,
  })
  Action.add({
    action: 'updateExpenditureSpent',
    payload: {
      expenditureId,
      spent,
    },
  })
}

function addTransaction(data) {
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

  if (storage.amount < amount) {
    throw new Error(`You don't have enough money in ${storage.name}`)
  }
  await updateStorageAmount(storageId, storage.amount - amount)
  await updateExpenditureSpent(expenditureId, expenditure.spent + amount)
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
  }
  if (transferCharge) {
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
  return Action.add({
    action: 'updateExpenditureLimit',
    payload: {
      expenditureId,
      limit,
    },
  })
}

function updateLocalDB(data) {
  const promises = []
  promises.push(
    Storage.bulkPut(data.storages),
  )
  promises.push(
    Expenditure.bulkPut(data.expenditures),
  )
  return Promise.all(promises)
}

async function deleteActions(actions) {
  return Action.bulkDelete(actions.map((action) => action.id))
}

export async function sync() {
  const actions = await Action.getAll()
  try {
    const data = await request({
      url: '/sync',
      method: 'POST',
      data: { actions },
    })
    await updateLocalDB(data)
    if (actions) {
      await deleteActions(actions)
    }
  } catch (e) {
    throw new Error('There was error ref: SYNC FUNCTION')
  }
}

export async function cleanDB() {
  await User.delete()
  await Action.deleteAll()
  await Storage.deleteAll()
  await Expenditure.deleteAll()
}
