const orderController = require('../controllers/orderController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/orders', router);
/**
  * @swagger
  * components:
  *    schemas:
  *      Cart List:
  *        type: array
  *        properties:   
  *            customers_cid:
  *              type: string   
  *            quantity:
  *              type: integer
  *            store_products_spid:
  *              type: string
  *        example:
  *            -  customers_cid: get Customer cid from the Customer API
  *               quantity: 2
  *               store_products_spid: get Store Product spid from the Store Product API 
  *            -  customers_cid: only 1 customer id or delete this object if you wish to test for
  *               quantity: 2
  *               store_products_spid: get Store Product spid from the Store Product API   
  */

/**
  * @swagger
  * tags:
  *    name: Orders
  *    description: Order API
  */

/**
  * @swagger
  * /api/v1/orders:
  *    get:
  *      tags: [Orders]
  *      summary: Only administrator can view all orders
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All orders
  *          content: {}
  *        404:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', orderController.findAllOrders);

/**
  * @swagger
  * /api/v1/orders:
  *     post:
  *       tags: [Orders]
  *       summary: Create a new order
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add an order
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Cart List'
  *       responses:
  *         201:
  *           description: New order added
  *           content: {}
  *         400:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/', orderController.addOrder);

/**
  * @swagger
  * /api/v1/orders/list:
  *    get:
  *      tags: [Orders]
  *      summary: Only administrator can view all successfull everyone's cart list
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: Entire cart list
  *          content: {}
  *        404:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/list', orderController.findAllOrderList);

/**
  * @swagger
  * /api/v1/orders/{id}:
  *     get:
  *       tags: [Orders]
  *       summary: View your order
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string for the order
  *       responses:
  *         200:
  *           description: The order
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.get('/:id', orderController.findYourOrder);
  return router
}