import User from '../models/User'

export async function getProfile(req, res) {
  const { userId } = req
  const user = await User.get(userId)
  res.send({
    id: userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    totalAmount: user.totalAmount,
    totalSpent: user.totalSpent,
  })
}
