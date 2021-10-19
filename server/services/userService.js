const Models = require('../models');
const { User } = Models;

module.exports = class UserService {

  async updateUser({id, ...data}) {
    // const { id } = data
    console.log('hi save here')
    const user = await User.findOne({ where: { uid: id } })
    if (user) {
      return await user.update(data)
    }
    return null
  }

  async addUser(data) {
    const user = User.create()
  }

  async findByPks({id}) {
    const user = await User.findOne
  }

  firstName(name) {
    console.log('we are in the console.log of firstName')
    return `hello ${name} we are in firstname and it worked`
  }

  lastName(name) {
    console.log('we are in the console.log of lastName')
    return `hello ${name} we are in lastname and it worked`
  }

  sum(a, b) {
    console.log('full count')
    return a + b
  }
}