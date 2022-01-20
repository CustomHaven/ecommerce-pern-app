const supplierController = require('../controllers/supplierController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/api/v2/suppliers', router);

/**
  * @swagger
  * components:
  *   schemas:
  *     Aliexpress Supplier:
  *       type: array
  *       properties:
  *         product_name: string  
  *         description: string          
  *         sku:
  *         - type: string
  *           skuPrice: string
  *           skuTitle: string
  *           quantity: string
  *           skuImg: string
  *           magnifiedImg: string
  *         media_url: []
  *       example:
  *       - product_name: "Myopia Swimming Goggles Earplug"
  *         description: "Swimming Cap Women Silicone Long Hair Extra Large Big Waterproof Swim Hat for Lady with Ear Cup Protect Elastic Swimming Caps"
  *         sku: 
  *         - type: "3"
  *           skuPrice: "US $2.84"
  *           skuTitle: "Red"
  *           quantity: "505"
  *           skuImg: "https://ae01.alicdn.com/kf/HTB1MNu5a1H2gK0jSZJnq6yT1FXa7/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_50x50.jpg_.webp"
  *           magnifiedImg: "https://ae01.alicdn.com/kf/HTB1MNu5a1H2gK0jSZJnq6yT1FXa7/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_640x640.jpg"
  *         - type: "4"
  *           skuPrice: "US $3.74"
  *           skuTitle: "Gray"
  *           quantity: "434"
  *           skuImg: "https://ae01.alicdn.com/kf/HTB1N4m5a1H2gK0jSZJnq6yT1FXaJ/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_50x50.jpg_.webp"
  *           magnifiedImg: "https://ae01.alicdn.com/kf/HTB1N4m5a1H2gK0jSZJnq6yT1FXaJ/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_640x640.jpg"
  *         media_url: [
  *           "https://ae01.alicdn.com/kf/H61ed3b0281984de08d0ceaa52e2e18b66.jpg",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H902c53de7a174d538f59abe65f63779bK.png?width=233&height=312&hash=545",
  *           "https://ae01.alicdn.com/kf/H5aa38d72ee01434ba272a7ae1edf876cp.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/H5bdb0e2bd03540a1aa7d7f48767d84a3M.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/HTB1cL9fLpXXXXbTXpXXq6xXFXXXM.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/H5fd1ff806a2f4a66b6fae0fbe4ae7bfdq.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/H5f05beac896e4bacb077d54b2468c5dbA.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/Hfc4198fa13474cccbd06610d9e467d1dQ.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/H25ac76d5e1bc478d8b7489a0012b3c4dF.jpg_120x120.jpg",
  *           "https://ae01.alicdn.com/kf/H010059c0bdb042149eaca666a67839e8z.jpg_120x120.jpg",
  *         ]
  */

/**
  * @swagger
  * components:
  *    schemas:
  *      Aliexpress product:
  *        type: object
  *        properties:
  *          product_name:
  *            type: string
  *          description:
  *            type: string
  *        example:
  *          product_name: "NEW MADE UP PRODUCT NAME FOR TESTING"
  *          description: "a brand new description..."
  */

/**
  * @swagger
  * components:
  *    schemas:
  *      Aliexpress SKU:
  *        type: object
  *        properties:
  *          skuPrice:
  *            type: string   
  *          skuTitle:
  *            type: string   
  *          quantity:
  *            type: string   
  *          skuImg:
  *            type: string
  *          magnifiedImg:
  *            type: string
  *        example:
  *          skuPrice: "US $23.00"   
  *          skuTitle: "New made up title"  
  *          quantity: "7543"
  *          skuImg: "https://ae01.alicdn.com/kf/HTB1MNu5a1H2gK0jSZJnq6yT1FXa7/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_50x50.jpg_.webp"
  *          magnifiedImg: "https://ae01.alicdn.com/kf/HTB1MNu5a1H2gK0jSZJnq6yT1FXa7/Myopia-Swimming-Goggles-Earplug-Professional-Adult-Silicone-Swim-Cap-Pool-Glasses-anti-fog-Men-Women-Optical.jpg_640x640.jpg"
  */


/**
  * @swagger
  * components:
  *    schemas:
  *      Aliexpress img:
  *        type: object
  *        properties:
  *          media_url:
  *            type: string
  *        example:
  *          media_url: "https://images.unsplash.com/photo-1544389250-92138f3872d1"
  */

/**
  * @swagger
  * tags:
  *    name: Aliexpress Supplier
  *    description: Supplier_List API
  */

/**
  * @swagger
  * /api/v2/suppliers:
  *    get:
  *      tags: [Aliexpress Supplier]
  *      summary: All products available
  *      produces:
  *        - application/json
  *      responses:
  *        200:
  *          description: All products from Aliexpress
  *          content: {}
  *        404:
  *          description: Not products found 
  *          content: {} 
  *        500:
  *          description: Internal Server Error 
  *          content: {}
  */
  router.get('/', supplierController.findAllAliProducts);

/**
  * @swagger
  * /api/v2/suppliers:
  *     post:
  *       tags: [Aliexpress Supplier]
  *       summary: Create a new order
  *       produces:
  *         - application/json
  *       requestBody:
  *         description: fill in the fields to add an order
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Aliexpress Supplier'
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
  router.post('/', supplierController.addSupplier);

/**
  * @swagger
  * /api/v2/suppliers/{id}:
  *     get:
  *       tags: [Aliexpress Supplier]
  *       summary: Fetch a single product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the products ID
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
  router.get('/:id', supplierController.findTheProduct);

/**
  * @swagger
  * /api/v2/suppliers/{id}:
  *     put:
  *       tags: [Aliexpress Supplier]
  *       summary: Fetch a single product to update
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the products ID
  *       requestBody:
  *         description: fill in the fields to update the product
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Aliexpress product'
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
  router.put('/:id', supplierController.updateProduct);

/**
  * @swagger
  * /api/v2/suppliers/{id}:
  *     delete:
  *       tags: [Aliexpress Supplier]
  *       summary: Delete a product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the products ID
  *       responses:
  *         204:
  *           description: The product was deleted
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.delete('/:id', supplierController.deleteProduct);


/**
  * @swagger
  * /api/v2/suppliers/{id}/img:
  *     post:
  *       tags: [Aliexpress Supplier]
  *       summary: Add a new Image
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the foreign key
  *       requestBody:
  *         description: fill in the fields to add an order
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Aliexpress img'
  *       responses:
  *         200:
  *           description: The new image
  *           content: {}
  *         404:
  *           description: Not found
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.post('/:id/img', supplierController.addImage);


/**
  * @swagger
  * /api/v2/suppliers/{id}/img:
  *     delete:
  *       tags: [Aliexpress Supplier]
  *       summary: Delete an image off the product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the image ID
  *       responses:
  *         204:
  *           description: The product was deleted
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.delete('/:id/img', supplierController.deleteImage);

/**
  * @swagger
  * /api/v2/suppliers/{id}/sku:
  *     delete:
  *       tags: [Aliexpress Supplier]
  *       summary: Delete a SKU off the product
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: id
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the SKU ID
  *       responses:
  *         204:
  *           description: The product was deleted
  *           content: {}
  *         404:
  *           description: Not found 
  *           content: {} 
  *         500:
  *           description: Internal Server Error 
  *           content: {}
  */
  router.delete('/:id/sku', supplierController.deleteSku);

/**
  * @swagger
  * /api/v2/suppliers/{pid}/sku/{fid}:
  *     put:
  *       tags: [Aliexpress Supplier]
  *       summary: Update the SKU
  *       produces:
  *         - application/json
  *       parameters:
  *         - in: path
  *           name: pid
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the primary key
  *         - in: path
  *           name: fid
  *           schema:
  *             type: string
  *           required: true
  *           description: uuid4 string off the foreign key
  *       requestBody:
  *         description: fill in the fields to add an order
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Aliexpress SKU'
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
  router.put('/:pid/sku/:fid', supplierController.updateSku);

  return router;
}