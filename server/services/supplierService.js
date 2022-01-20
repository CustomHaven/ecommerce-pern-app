const Models = require('../models');
const { AliProduct, AliProductImage, SkuProduct } = Models;
const createError = require('http-errors');

module.exports = class AliService {

  static async findNewProduct(id) {
    try {
			const aliProduct = await AliProduct.findOne({
				where: {
					aid: id
				},
				include: [
					{
						model: SkuProduct
					},
					{
						model: AliProductImage
					}
				]
			})
      if (aliProduct) {
        return aliProduct
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findAllSupplier() {
    try {
      const supplier = await AliProduct.findAll({
				include: [
					{
						model: SkuProduct
					},
					{
						model: AliProductImage
					}
				]
			});
      if (supplier) {
        return supplier
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findAllSupplierImage(id) {
    try {
			const supplierImage = await AliProduct.findOne({
				where: {
					aid: id
				},
				include: [
					{
						model: SkuProduct
					},
					{
						model: AliProductImage
					}
				]
			})
      if (supplierImage) {
        return supplierImage
      }
      return null
    } catch (error) {
      throw error
    }
  }

	async createSupplier(data) {
    try {
      let count = 0
      for (let array of data[0].sku) {
        data[0].sku[count].type = parseInt( array.type )
        data[0].sku[count].skuPrice = parseFloat( array.skuPrice.replace(/[^\d\.]/gi, '') )
        data[0].sku[count].quantity = parseInt( array.quantity )
        
        count++
      }

      // console.log(data[0].sku.map(val => val.type))
      const aliProduct = await AliProduct.create({
        product_name: data[0].product_name,
        description: data[0].description,
      });
      console.log(aliProduct);
      if (!aliProduct) {
        throw createError(404, 'Product failed to create');
      }
      console.log("aliProduct.dataValues.aid")
      console.log(aliProduct.dataValues.aid)
      console.log("aliProduct.dataValues.aid")

      await Promise.all(data[0].media_url.map((val) => AliProductImage.create({
        media_url: val,
        aliproduct_aid: aliProduct.dataValues.aid
      })));

      await Promise.all(data[0].sku.map((val) => SkuProduct.create({
        type: val.type,
        sku_price: val.skuPrice,
        sku_title: val.skuTitle,
        quantity: val.quantity,
        sku_img: val.skuImg,
        magnified_img: val.magnifiedImg,
        aliproduct_aid: aliProduct.dataValues.aid
      })));

      return await AliService.findNewProduct(aliProduct.dataValues.aid);
    } catch (error) {
      throw error;
    }
	}

  async updateSupplier(id, data) {
    try {
      const product = await AliProduct.findByPk(id)
      if (!product) {
        return null;
      }
      await product.update(data);
      return await AliService.findNewProduct(product.dataValues.aid);
    } catch (error) {
      throw error
    }
  }

  async updateSupplierSKU(pid, fid, data) {
    try {
      const aliSku = await SkuProduct.findOne({ where: { skuid: pid, aliproduct_aid: fid } });
      if (!aliSku) {
        return null;
      }
      if (data.skuPrice !== undefined) {
        data.sku_price = parseFloat(data.skuPrice.replace(/[^\d\.]/g, ''));
        delete data.skuPrice;
      } 
      if (data.quantity !== undefined) {
        data.quantity = parseInt(data.quantity);
      } 
      if (data.skuTitle) {
        data.sku_title = data.skuTitle;
        delete data.skuTitle;
      }
      if (data.skuImg) {
        data.sku_img = data.skuImg;
        delete data.skuImg;
      }
      if (data.magnifiedImg) {
        data.magnified_img = data.magnifiedImg;
        delete data.magnifiedImg;
      }
      return await aliSku.update(data);
    } catch (error) {
      throw error
    }
  }

  async addSupplierImage(id, data) {
    try {
      const image = await AliProductImage.create({
        media_url: data,
        aliproduct_aid: id
      });
      if (!image) {
        return null;
      }
      return image;
    } catch (error) {
      throw error;
    }
  }

  async deleteSupplier(id) {
    try {
      const product = await AliProduct.findOne({ where: { aid: id } });
      if (!product) {
        return null
      }
      return await product.destroy();
    } catch (error) {
      throw error
    }
  }

  async deleteSupplierSku(id) {
    try {
      const sku = await SkuProduct.destroy({ where: { skuid: id } });
      if (!sku) {
        return null
      }
      return { message: 'Successfully removed the sku product' }
    } catch (error) {
      throw error
    }
  }

  async deleteSupplierImage(id) {
    try {
      const image = await AliProductImage.destroy({ where: { apiid: id } });
      if (!image) {
        return null
      }
      return { message: 'Successfully removed the image' }
    } catch (error) {
      throw error
    }
  }

};