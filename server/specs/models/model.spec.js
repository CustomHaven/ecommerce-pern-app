const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
    checkUniqueIndex
} = require('sequelize-test-helpers');

// Cannot require it from index.js so need to require them individually what a pain but oh well
const UserModel = require('../../models/user-model');




describe('server/models/all', async () => {


  describe('server/models/user-model', async () => {

  const User = UserModel(sequelize, dataTypes)
  const user = new User()

  checkModelName(User)('User')

  context('properties', () => {
    ;['is_admin', 'first_name', 'last_name', 'email', 'google_id', 'facebook_id'].forEach(checkPropertyExists(user))
  })  

  context('indexes', () => {
    context('unique', () => {
      ;['email'].forEach(checkUniqueIndex(user))
    })
  })
})
})

/*
{
  User: User,
  Dealer: Dealer,
  DealerProduct: DealerProduct,
  StoreProduct: StoreProduct,
  Customer: Customer,
  Order: Order,
  OrderList: OrderList
}
*/