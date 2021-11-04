const dealerController = require('../controllers/dealerController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v1/dealers', router);

  /**
   * @swagger
   * components:
   *    schemas:
   *      Supplier:
   *        type: Object
   *        properties:   
   *          name:
   *            type: string   
   *          description:
   *            type: string 
   *        example:
   *          name: neo   
   *          description: andersson  
   */

  /**
   * @swagger
   * tags:
   *    name: Suppliers
   *    description: Suppliers API
   */

  
/**
  * @swagger
  * /api/v1/dealers:
  *    get:
  *      tags: [Suppliers]
  *      summary: Login as an administrator to view all suppliers before you attempted this
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All suppliers
  *          content: {}
  *        404:
  *          description: Not found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', dealerController.findAll);
  
/**
  * @swagger
  * /api/v1/dealers:
  *     post:
  *       tags: [Suppliers]
  *       summary: Create a new supplier
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add a supplier
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Supplier'
  *       responses:
  *         201:
  *           description: New supplier added
  *           content: {}
  *         400:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/', dealerController.addDealer);


/**
  * @swagger
  * /api/v1/dealers/{id}:
  *     get:
  *       tags: [Suppliers]
  *       summary: Fetch a supplier
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a supplier
  *       responses:
  *         200:
  *           description: The supplier
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.get('/:id', dealerController.findADealer);

/**
  * @swagger
  * /api/v1/dealers/{id}:
  *     put:
  *       tags: [Suppliers]
  *       summary: Fetch a supplier to update
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string to get a supplier
  *       requestBody:
  *         description: fill in what you want to update
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Supplier'
  *       responses:
  *         200:
  *           description: The supplier
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.put('/:id', dealerController.updateDealer);

/**
  * @swagger
  * /api/v1/dealers/{id}:
  *     delete:
  *       tags: [Suppliers]
  *       summary: Delete supplier
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: The uuid4 string to delete the supplier
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
  router.delete('/:id', dealerController.removeDealer);

  return router;
}