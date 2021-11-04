const customerController = require('../controllers/customerController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/customer', router);

  /**
   * @swagger
   * components:
   *    schemas:
   *      Customer:
   *        type: Object
   *        properties:   
   *          first_name:
   *            type: string   
   *          last_name:
   *            type: string
   *          address:
   *            type: string   
   *          zip_code:
   *            type: string   
   *          city:
   *            type: string   
   *          country:
   *            type: string   
   *          email:
   *            type: string   
   *        example:
   *          first_name: neo   
   *          last_name: andersson 
   *          address: 10 downing street
   *          zip_code: sw1a 2aa   
   *          city: london   
   *          country: uk
   *          email: sample@email.com  
   */

  /**
   * @swagger
   * tags:
   *    name: Customers
   *    description: Customer API
   */

    
  /**
  * @swagger
  * /api/v1/customer:
  *    get:
  *      tags: [Customers]
  *      summary: Login as an administrator to view all customers before you attempted this
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All customers
  *          content: {}
  *        404:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', customerController.findAll);

 /**
  * @swagger
  * /api/v1/customer:
  *     post:
  *       tags: [Customers]
  *       summary: Create a new customer
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add a customer
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Customer'
  *       responses:
  *         201:
  *           description: New customer added
  *           content: {}
  *         400:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/', customerController.addCustomer);

/**
  * @swagger
  * /api/v1/customer/{id}:
  *     get:
  *       tags: [Customers]
  *       summary: Fetch a user
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a customer
  *       responses:
  *         200:
  *           description: The customer
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.get('/:id', customerController.findACustomer);

/**
  * @swagger
  * /api/v1/customer/{id}:
  *     put:
  *       tags: [Customers]
  *       summary: Fetch a customer to update
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a customer
  *       requestBody:
  *         description: fill in what you want to update
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Customer'
  *       responses:
  *         200:
  *           description: The customer
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.put('/:id', customerController.updateCustomer);

/**
  * @swagger
  * /api/v1/customer/{id}:
  *     delete:
  *       tags: [Customers]
  *       summary: Delete customer
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: The uuid4 string to delete the customer
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
  router.delete('/:id', customerController.removeCustomer);

  return router
}