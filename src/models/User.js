import Model from '@/services/Model'

export class User extends Model {
  constructor() {
    super('user')
  }

  get() {
    super.get(1)
  }

  put(data) {
    super.put({
      id: 1,
      ...data,
    })
  }

  update(data) {
    super.update(1, data)
  }

  delete() {
    super.delete(1)
  }
}
