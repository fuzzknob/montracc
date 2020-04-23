import User from '@/models/User'
import Action from '@/models/Action'
import Storage from '@/models/Storage'
import Expenditure from '@/models/Expenditure'

const USER_DATA = {
  firstName: 'Gagan',
  lastName: 'Rai',
  email: 'gagan_rai@outlook.com',
  totalAmount: 60000,
  spent: 0,
}

const STORAGE_DATA = [
  {
    name: 'MBL',
    amount: 45000,
  },
  {
    name: 'NMB',
    amount: 10000,
  },
  {
    name: 'In Hand',
    amount: 5000,
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
  const user = new User()
  const action = new Action()
  const storage = new Storage()
  const expenditure = new Expenditure()

  // Clearing Database
  // await user.delete()
  await action.deleteAll()
  await storage.deleteAll()
  await expenditure.deleteAll()

  // Seeding Database
  await user.put(USER_DATA)
  await storage.bulkAdd(STORAGE_DATA)
  await expenditure.bulkAdd(EXPENDITURES)
}

seedDB()
