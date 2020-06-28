import User from '@/models/User'
import Action from '@/models/Action'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'

const USER_DATA = {
  firstName: 'Gagan',
  lastName: 'Rai',
  email: 'gagan_rai@outlook.com',
}

const STORAGE_DATA = [
  {
    name: 'In Hand',
    amount: 5000,
  },
  {
    name: 'MBL',
    amount: 45000,
  },
  {
    name: 'NMB',
    amount: 10000,
  },
]

const EXPENDITURES = [
  {
    name: 'Food',
    limit: 2000,
    spent: 0,
  },
  {
    name: 'Travel',
    limit: 2000,
    spent: 0,
  },
  {
    name: 'Accessories',
    limit: 2000,
    spent: 0,
  },
  {
    name: 'Misc',
    limit: 0,
    spent: 0,
  },
]


async function seedDB() {
  // Clearing Database
  await User.delete()
  await Action.deleteAll()
  await Storage.deleteAll()
  await Expenditure.deleteAll()

  // Seeding Database
  await User.put(USER_DATA)
  await Storage.bulkAdd(STORAGE_DATA)
  await Expenditure.bulkAdd(EXPENDITURES)
}

seedDB()
