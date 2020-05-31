import User from '../models/User'

export function getProfile(req, res) {
  const { user } = req
  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    totalAmount: user.totalAmount,
    totalSpent: user.totalSpent,
  })
}
