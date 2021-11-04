const dealerProductController = require('../controllers/dealerProductController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/dealer/product', router);

/**
  * @swagger
  * components:
  *    schemas:
  *      Supplier Products:
  *        type: Object
  *        properties:   
  *          product_name:
  *            type: string   
  *          type:
  *            type: string
  *          description:
  *            type: string   
  *          price:
  *            type: string   
  *          quantity:
  *            type: integer
  *          dealers_did:
  *            type: string 
  *        example:
  *          product_name: boxing gloves   
  *          type: sports 
  *          description: fat description
  *          price: 3.65   
  *          quantity: 6000
  *          dealers_did: First select a Supplier from the Supplier API
  */

/**
  * @swagger
  * tags:
  *    name: Supplier's Products
  *    description: Supplier's Products API
  */

/**
  * @swagger
  * /api/v1/dealer/product:
  *    get:
  *      tags: [Supplier's Products]
  *      summary: Login as an administrator to view all of supplier's products before you attempted this
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All products
  *          content: {}
  *        404:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', dealerProductController.findAll);

/**
  * @swagger
  * /api/v1/dealer/product:
  *     post:
  *       tags: [Supplier's Products]
  *       summary: Create a new product
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add a product
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Supplier Products'
  *       responses:
  *         201:
  *           description: New product added
  *           content: {}
  *         400:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/', dealerProductController.addDealerProduct);

/**
  * @swagger
  * /api/v1/dealer/product/{id}:
  *     get:
  *       tags: [Supplier's Products]
  *       summary: Fetch a product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get the product
  *       responses:
  *         200:
  *           description: The product
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.get('/:id', dealerProductController.findADealerProduct);

/**
  * @swagger
  * /api/v1/dealer/product/{id}:
  *     put:
  *       tags: [Supplier's Products]
  *       summary: Fetch a product to update
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get the product
  *       requestBody:
  *         description: fill in what you want to update
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Supplier Products'
  *       responses:
  *         200:
  *           description: The product
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.put('/:id', dealerProductController.updateDealerProduct);

/**
  * @swagger
  * /api/v1/dealer/product/{id}:
  *     delete:
  *       tags: [Supplier's Products]
  *       summary: Delete a product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: The uuid4 string to delete the product
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
  router.delete('/:id', dealerProductController.removeDealerProduct);

  return router
}