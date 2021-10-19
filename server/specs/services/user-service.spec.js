"use strict";
const { makeMockModels } = require('sequelize-test-helpers');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const path = require('path');
const servicePath = path.resolve('./services/userService.js')
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai)

describe('UserService Root', function () {
  const mockModels = makeMockModels( { UserModel: { findOne: sinon.stub() } } );  
  delete Object.assign(mockModels, {['User']: mockModels['UserModel'] })['UserModel']

  const UserServices = proxyquire(servicePath, {
    "../models": mockModels
  });
  const User = new UserServices();
  const dummyUser = { update: sinon.stub() }
  const uid = '6a88e9b5-33a2-403f-ac3d-e86413ac101d' // Not needed?
  const data = {
    // id: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
    email: 'testface@test.com',
    password: '123456',
    is_admin: false,
    first_name: 'Testy',
    last_name: 'McTestface', 
    google_id: null,
    facebook_id: null
  }
  const resetStubs = () => {
    mockModels.User.findOne.resetHistory()
    dummyUser.update.resetHistory()
  }

  describe('user does not exist', () => {
    before(async () => {
      mockModels.User.findOne.resolves(undefined)
      await User.updateUser(data)
    })

    after(resetStubs)
  
    it('called UserModel.findOne', () => {
      expect(mockModels.User.findOne).to.have.been.called
    })

    it('did not call user update', () => {
      
    });
  })

})