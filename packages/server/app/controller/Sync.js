import Money from '../domain/Money'

export async function sync(req, res) {
  const {actions} = req.body
  const { userId } = req
  const money = new Money(userId)
  const actionResponse = []
  for (const action of actions) {
    switch(action.action) {
      case 'addTransaction':
        actionResponse.push(money.addTransaction(action.payload))
        break
      case 'updateStorageAmount':
        actionResponse.push(money.updateStorageAmount(action.payload))
        break
      case 'updateAggregateAmount':
        actionResponse.push(money.updateAggregateAmount(action.payload))
        break
      case 'updateExpenditureSpent':
        actionResponse.push(money.updateExpenditureSpent(action.payload))
        break
      case 'updateExpenditureLimit':
        actionResponse.push(money.updateExpenditureLimit(action.payload))
        break
    }
  }
  await Promise.all(actionResponse)
  res.send('action synced')
}
