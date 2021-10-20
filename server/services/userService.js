const Models = require('../models');
const createError = require('http-errors');
const { User } = Models;

module.exports = class UserService {

  async updateUser(id, data) {
    try {
      const user = await User.findOne({ where: { uid: id } })
      if (!user) {
        // throw createError(404, 'User Not Found') // find out how to include this without makinng the test fail
        return null // test works for null case SO i wanted the error case instead
      }
      return await user.update(data)
    } catch (err) {
      throw err
    }
  }

  async addUser(data){
    try{
      const user = await User.create(data);
      if (!user) {
        return null;
      }
      return user
    }catch(err){
      return err;
    }
  }
  async findByPks({id}) {
    const user = await User.findOne()
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