import Model from '@/services/Model'

class Expenditure extends Model {
  constructor() {
    super('expenditures')
  }
}

export default new Expenditure()
