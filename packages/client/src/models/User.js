import Model from '@/services/Model'

class User extends Model {
  constructor() {
    super('user')
  }

  get() {
    return super.get(1)
  }

  put(data) {
    return super.put({
      id: 1,
      ...data,
    })
  }

  update(data) {
    return super.update(1, data)
  }

  delete() {
    return super.delete(1)
  }
}

export default new User()
