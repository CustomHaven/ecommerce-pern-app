const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const proxyquire = require('proxyquire');
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
    checkUniqueIndex,
    makeMockModels
} = require('sequelize-test-helpers');

chai.should();
chai.use(sinonChai)

// Cannot require from the index.js because that file is connected to the real sequelize DB so we need to require them individually what a pain but oh well
const UserModel = require('../../models/UserModel');
const DealerModel = require('../../models/DealerModel');
const DealerProductModel = require('../../models/DealerProductModel');
const CustomerModel = require('../../models/CustomerModel');
const StoreProductModel = require('../../models/StoreProductModel');
const OrderModel = require('../../models/OrderModel');
const OrderListModel = require('../../models/OrderListModel');

describe('server/models/all', async () => {
  // Users
  const User = UserModel(sequelize, dataTypes)
  const user = new User()
  // Dealers
  const Dealer = DealerModel(sequelize, dataTypes);
  const dealer = new Dealer();
  // DealerProducts
  const DealerProduct = DealerProductModel(sequelize, dataTypes);
  const dealerProduct = new DealerProduct();
  // StoreProducts
  const StoreProduct = StoreProductModel(sequelize, dataTypes);
  const storeProduct = new StoreProduct();
  // Customers
  const Customer = CustomerModel(sequelize, dataTypes);
  const customer = new Customer();
  // OrderLists
  const OrderList = OrderListModel(sequelize, dataTypes);
  const orderList = new OrderList();
  // Orders
  const Order = OrderModel(sequelize, dataTypes);
  const order = new Order();

  describe('server/models/UserModel', async () => {

    checkModelName(User)('User')

    describe('check all properties exist', () => {
      ['is_admin', 'first_name', 'last_name', 'email', 'google_id', 'facebook_id'].forEach(checkPropertyExists(user))
    }) 

    describe('check if unique constraint is working', () => {
      context('unique', () => {
        ['email'].forEach(checkUniqueIndex(user))
      });
    });
  });

  describe('server/models/DealerProductModel', async () => {

    checkModelName(DealerProduct)('DealerProduct');

    describe('check all properties exist', () => {
        ['dpid', 'product_name', 'type', 'description', 'price', 'quantity'].forEach(checkPropertyExists(dealerProduct))
    })

    describe('check associations FKEYs', () => {

      before(() => {
        DealerProduct.associate( { Dealer, StoreProduct }  )
      });
      it('defined a belongsTo association with Dealer', () => {
        chai.expect(DealerProduct.belongsTo).to.have.been.calledWith(Dealer)
      });
      it('defined a hasOne association with StoreProduct', () => {
        chai.expect(DealerProduct.hasOne).to.have.been.calledWith(StoreProduct)
      })
    })
  });

  describe('server/models/DealerModel', async () => {

    checkModelName(Dealer)('Dealer');

    describe('check all properties exist', () => {
        ['did', 'name', 'description'].forEach(checkPropertyExists(dealer))
    })

    describe('check associations Fkeys', () => {

      before(() => {
        Dealer.associate( { DealerProduct }  )
      });
      it('defined a hasOne association with Dealer', () => {
        chai.expect(Dealer.hasOne).to.have.been.calledWith(DealerProduct)
      });
    });
  });

  describe('server/models/StoreProductModel', async () => {

    checkModelName(StoreProduct)('StoreProduct');

    describe('check all properties exist', () => {
        ['spid', 'product_name', 'type', 'description', 'price', 'quantity'].forEach(checkPropertyExists(storeProduct))
    })

    describe('check associations Fkeys', () => {

      before(() => {
        StoreProduct.associate( { DealerProduct, Customer, OrderList }  )
      });
      it('defined a belongsTo association with DealerProduct', () => {
        chai.expect(StoreProduct.belongsTo).to.have.been.calledWith(DealerProduct)
      });
      it('defined a belongsToMany association with Customer through Orderlist', () => {
        chai.expect(StoreProduct.belongsToMany).to.have.been.calledWith(Customer, { 
          through: OrderList,
          unique: false,
          foreignKey: 'store_products_spid'
        })
      });
    });
  });

  describe('server/models/CustomerModel', async () => {

    checkModelName(Customer)('Customer');

    describe('check all properties exist', () => {
        ['cid', 'first_name', 'last_name', 'address', 'zip_code', 'city', 'country', 'email'].forEach(checkPropertyExists(customer))
    });

    describe('check if unique constraint is working', () => {
      context('unique', () => {
        ['email'].forEach(checkUniqueIndex(customer))
      });
    });

    describe('check associations Fkeys', () => {

      before(() => {
        Customer.associate( { StoreProduct, Order, OrderList }  )
      });
      it('defined a hasMany association with Order', () => {
        chai.expect(Customer.hasMany).to.have.been.calledWith(Order);
      });
      it('defined a belongsToMany association with StoreProduct through Orderlist', () => {
        chai.expect(Customer.belongsToMany).to.have.been.calledWith(StoreProduct, { 
          through: OrderList,
          unique: false,
          foreignKey: 'customers_cid',
        })
      });
    });
  });

  describe('server/models/OrderModel', async () => {

    checkModelName(Order)('Order');

    describe('check all properties exist', () => {
        ['oid', 'status_completed', 'final_price'].forEach(checkPropertyExists(order))
    })

    describe('check associations Fkeys', () => {

      before(() => {
        Order.associate( { Customer }  )
      });
      it('defined a belongsTo association with Order', () => {
        chai.expect(Order.belongsTo).to.have.been.calledWith(Customer);
      });

    });
  });

  describe('server/models/OrderListModel', async () => {

    checkModelName(OrderList)('OrderList')

    describe('check all properties exist', () => {
        ['quantity', 'price'].forEach(checkPropertyExists(orderList))
    });
  });
});