const UserService = require('../services/userService');
const userService = new UserService();
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
  try {
    const user = await userService.findAllUsers();
    if (!user) {
      throw createError(404, 'No users found')
    }
    res.status(200).send(user);
  } catch (error) {
    next(error)
  }
}

exports.findAUser = async (req, res, next) => {
  try {
    const user = await userService.findOneUser(req.params.id);
    if (!user) {
      throw createError(404, 'User not found')
    }
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw createError(404, 'Update was unsuccessful because user was not found')
    }
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

exports.addUser = async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
}

exports.removeUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      throw createError(404, 'No user found to delete')
    }
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}

/*findAllUsers()//
findOneUser(id)//
updateUser(id, data)//
addUser(data)//
findByPrimaryKey(id)leave
deleteUser(id)//*/