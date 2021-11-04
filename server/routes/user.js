const userController = require('../controllers/userController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/user', router);

  /**
   * @swagger
   * components:
   *    schemas:
   *      User:
   *        type: Object
   *        properties:
   *          email:
   *            type: string   
   *          password:
   *            type: string   
   *          first_name:
   *            type: string   
   *          last_name:
   *            type: string
   *        example:
   *          email: sample@email.com   
   *          password: somepassword  
   *          first_name: neo  
   *          last_name: andersson
   */

  /**
   * @swagger
   * tags:
   *    name: Users
   *    description: Users API
   */

  /**
  * @swagger
  * /api/v1/user:
  *    get:
  *      tags: [Users]
  *      summary: Login as an administrator to view all the users before you attempted this
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All users
  *          content: {}
  *        400:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', userController.findAll)


 /**
  * @swagger
  * /api/v1/user:
  *     post:
  *       tags: [Users]
  *       summary: Create a new user
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add the user
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/User'
  *       responses:
  *         201:
  *           description: New user added
  *           content: {}
  *         400:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/', userController.addUser)

 /**
  * @swagger
  * /api/v1/user/{id}:
  *     get:
  *       tags: [Users]
  *       summary: Fetch a user
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a user
  *       responses:
  *         200:
  *           description: The user
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.get('/:id', userController.findAUser)

 /**
  * @swagger
  * /api/v1/user/{id}:
  *     put:
  *       tags: [Users]
  *       summary: Fetch a user to update
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a user  
  *       requestBody:
  *         description: fill in what you want to update
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/User'
  *       responses:
  *         200:
  *           description: The user
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.put('/:id', userController.updateUser)

  /**
  * @swagger
  * /api/v1/user/{id}:
  *     delete:
  *       tags: [Users]
  *       summary: Delete user
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: The uuid4 string to delete the user
  *       responses:
  *         204:
  *           description: Deleted successful
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.delete('/:id', userController.removeUser)

  return router
}