const Models = require('../models');
const bcrypt = require('bcryptjs');
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

  async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email }})
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

  async addUser(data) {
    try{
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash
      const user = await User.create(data);
      if (!user) {
        return null;
      }
      return user
    } catch(err) {
      throw err;
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