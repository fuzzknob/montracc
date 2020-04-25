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
