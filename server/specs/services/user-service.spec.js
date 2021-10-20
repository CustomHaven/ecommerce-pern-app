"use strict";
const { makeMockModels } = require('sequelize-test-helpers');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const path = require('path');
const servicePath = path.resolve('./services/userService.js')
const sinonChai = require("sinon-chai");
const createError = require('http-errors');
chai.should();
chai.use(sinonChai)

describe('/services/userService.js', function () {

  const id = '6a88e9b5-33a2-403f-ac3d-e86413ac101d'
  const userData = {
    email: 'testface@test.com',
    password: '123456',
    is_admin: false,
    first_name: 'Testy',
    last_name: 'McTestface',
  }

  const updatedUser = {
    uid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
    email: 'testface@test.com',
    password: '123456',
    is_admin: false,
    first_name: 'Testy',
    last_name: 'McTestface', 
    google_id: null,
    facebook_id: null,
    created_at: "2020-06-26T09:31:36.630Z",
    updated_at: "2020-06-26T09:31:49.627Z"
  }

  const UserModel = { 
    findOne: sinon.stub()
  }
  console.log(UserModel)
  const mockModels = makeMockModels( { UserModel } );  
  delete Object.assign(mockModels, {['User']: mockModels['UserModel'] })['UserModel']

  const UserService = proxyquire(servicePath, {
    "../models": mockModels
  });
  const userService = new UserService();
  const fakeUser = {  update: sinon.stub() }

  let userResult;
  describe('Update User', () => {
    describe('user does not exist', () => {
      before(async () => {
        mockModels.User.findOne.withArgs({ where: { uid: id } }).resolves(undefined || null);
        // mockModels.User.findOne.withArgs({ where: { uid: id } }).throws(function() {new Error('User Not Found')})
        userResult = await userService.updateUser(id, userData)
      })
 
      after(() => {
        sinon.reset()
      })
    
      it('called User.findOne', () => {
        expect(mockModels.User.findOne).to.have.been.calledWith({ where: { uid: id } })
      })
  
      it('did not call user update', () => {
        expect(fakeUser.update).not.to.have.been.called
      });
  
      it('should return null', () => {
        expect(userResult).to.be.null
      })
    });
  
    describe('User exists', () => {
      before(async () => {
        mockModels.User.findOne.withArgs({ where: { uid: id } }).resolves(fakeUser);
        fakeUser.update.resolves(updatedUser);
        userResult = await userService.updateUser(id, userData);
      });
      // after(resetStubs);
      after(() => {
        sinon.reset()
      })
  
      it('call user.findOne()', () => {
        expect(mockModels.User.findOne.calledWith({ where: { uid: id } })).to.equal(true);
      });
  
      it('call user.update to match sinon.match(userData)', () => {
        expect(fakeUser.update).to.have.been.calledWith(sinon.match(userData));
      });
  
      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser)
      })
    })
  })

})