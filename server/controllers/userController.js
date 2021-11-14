const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');
const userService = new UserService();
const jwtGenerator = require('../utils/jwtGenerator');
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
    req.body.is_admin = false
    req.body.password = String(req.body.password);
    const user = await userService.addUser(req.body);

    const token = jwtGenerator(user.uid);

    res.status(201).json({ token });
  } catch (error) {
    next(error)
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    req.body.password = String(req.body.password);
    const user = await userService.findByEmail(req.body.email);
    if (!user) {
      throw createError(404, 'User not found');
    }

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
        throw createError(401, 'Incorrect password.', { expose: true });
    }

    // console.log(user)
        
    
    const token = jwtGenerator(user.uid);

    res.status(201).json({ token });
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