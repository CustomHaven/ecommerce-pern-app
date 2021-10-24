const Models = require('../models');
const { User } = Models;

module.exports = class UserService {

  async findAllUsers() {
    try {
      const allUsers = await User.findAll();
      if (allUsers) {
        return allUsers
      }
      return null
    } catch (err) {
      throw err
    }
  }

  async findOneUser(id) {
    try {
      const user = User.findOne({ where: { uid: id }})
      if (user) {
        return user
      }
      return null
    } catch (err) {
      throw err
    }
  }

  async updateUser(id, data) {
    try {
      const user = await User.findByPk(id);
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
  async findByPrimaryKey(id) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        return user;
      }
      return null
    } catch (err) {
      throw err
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.destroy({ where: { uid: id } });
      if (!user) {
        return null
      }
      return { message: 'Successfully removed the user' }
    } catch (err) {
      throw err
    }
  }
}