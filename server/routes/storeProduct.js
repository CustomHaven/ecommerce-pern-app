const storeProductController = require('../controllers/storeProductController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/store/product', router);

/**
  * @swagger
  * components:
  *    schemas:
  *      Store Products:
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
  *          dealer_product_dpid:
  *            type: string 
  *        example:
  *          product_name: boxing gloves   
  *          type: sports 
  *          description: fat description 
  *          quantity: 250
  *          dealer_product_dpid: First select a Supplier's Products from the Supplier's Products API
  */

/**
  * @swagger
  * tags:
  *    name: Store Products
  *    description: Store Products API
  */


/**
  * @swagger
  * /api/v1/store/product:
  *    get:
  *      tags: [Store Products]
  *      summary: All the products in the store
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
  router.get('/', storeProductController.findAll);

/**
  * @swagger
  * /api/v1/store/product:
  *     post:
  *       tags: [Store Products]
  *       summary: Create a new product
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add a product
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Store Products'
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
  router.post('/', storeProductController.addStoreProduct);

/**
  * @swagger
  * /api/v1/store/product/{id}:
  *     get:
  *       tags: [Store Products]
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
  router.get('/:id', storeProductController.findAStoreProduct);

/**
  * @swagger
  * /api/v1/store/product/{id}:
  *     put:
  *       tags: [Store Products]
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
  *               $ref: '#components/schemas/Store Products'
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
  router.put('/:id', storeProductController.updateStoreProduct);

/**
  * @swagger
  * /api/v1/store/product/{id}:
  *     delete:
  *       tags: [Store Products]
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
  router.delete('/:id', storeProductController.removeStoreProduct);

  return router
}