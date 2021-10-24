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

  const allUsers = [
    {
      uid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
      email: 'testface@test.com',
      password: '123456',
      is_admin: false,
      first_name: 'Testy',
      last_name: 'McTestface', 
      google_id: null,
      facebook_id: null,
      created_at: "2021-10-19T09:31:36.630Z",
      updated_at: "2021-10-19T09:31:49.627Z"
    },
    {
      uid: '18c805d6-a8a2-4437-9488-9bdf4e56061d',
      email: 'testface2@test.com',
      password: 'qwerty',
      is_admin: false,
      first_name: 'Testy2',
      last_name: 'McTestface2', 
      google_id: null,
      facebook_id: null,
      created_at: "2021-10-20T09:31:36.630Z",
      updated_at: "2021-10-20T09:31:49.627Z"
    }
  ]

  const UserModel = {
    findByPk: sinon.stub(),
    findOne: sinon.stub(),
    findAll: sinon.stub(),
    create: sinon.stub(),
    destroy: sinon.stub()
  }

  const mockModels = makeMockModels( { UserModel } );  
  delete Object.assign(mockModels, {['User']: mockModels['UserModel'] })['UserModel']

  const UserService = proxyquire(servicePath, {
    "../models": mockModels
  });
  const userService = new UserService();
  const fakeUser = {  update: sinon.stub() }

  let userResult;
  describe('Find all user', () => {
    describe('findAll()', () => {
      before(async () => {
        mockModels.User.findAll.resolves(allUsers);
        userResult = await userService.findAllUsers();
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findAll', () => {
        expect(mockModels.User.findAll).to.have.been.called
      });

      it('returns all user', () => {
        expect(userResult).to.deep.equal(allUsers)
      })
    })
  });

  describe('Add a new User', () => {
    describe('create(with args)', () => {
      before(async () => {
        mockModels.User.create.withArgs(userData).resolves(updatedUser);
        userResult = await userService.addUser(userData);
      });

      after(() => {
        sinon.reset();
      });

      it('call User.create(args)', () => {
        expect(mockModels.User.create).to.have.been.calledWith(userData)
      });

      it('call User.create(args)', () => {
        expect(userResult).to.equal(updatedUser)
      });
    });
  });

  describe('Find a single user', () => {
    describe('findOne() user exists', () => {
      before(async () => {
        mockModels.User.findOne.withArgs({ where: { uid: id } }).resolves(updatedUser)
        userResult = await userService.findOneUser(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findOne()', () => {
        expect(mockModels.User.findOne).to.have.been.calledWith({ where: { uid: id } })
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser)
      })
    })

    describe('findOne() user does not exists', () => {
      before(async () => {
        mockModels.User.findOne.withArgs({ where: { uid: id } }).resolves(undefined || null)
        userResult = await userService.findOneUser(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findOne()', () => {
        expect(mockModels.User.findOne).to.have.been.calledWith({ where: { uid: id } })
      })

      it('returns null or undefined user does not exist', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('Find by primary key', () => {
    describe('findByPk() user found', () => {
      before(async () => {
        mockModels.User.findByPk.withArgs(id).resolves(updatedUser)
        userResult = await userService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(id)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser)
      })
    })

    describe('findByPk() user cannot be found', () => {
      before(async () => {
        mockModels.User.findByPk.withArgs(id).resolves(undefined || null)
        userResult = await userService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(id)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('Update User', () => {
    describe('user does not exist', () => {
      before(async () => {
        mockModels.User.findByPk.withArgs(id).resolves(undefined || null);
        // mockModels.User.findOne.withArgs({ where: { uid: id } }).throws(function() {new Error('User Not Found')})
        userResult = await userService.updateUser(id, userData)
      })
 
      after(() => {
        sinon.reset()
      })
    
      it('called User.findOne', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(id)
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
        mockModels.User.findByPk.withArgs(id).resolves(fakeUser);
        fakeUser.update.resolves(updatedUser);
        userResult = await userService.updateUser(id, userData);
      });
      // after(resetStubs);
      after(() => {
        sinon.reset()
      })
  
      it('call user.findOne()', () => {
        expect(mockModels.User.findByPk.calledWith(id)).to.equal(true);
      });
  
      it('call user.update to match sinon.match(userData)', () => {
        expect(fakeUser.update).to.have.been.calledWith(sinon.match(userData));
      });
  
      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser)
      })
    })
  })

  describe('Remove a user', () => {
    describe('Successfully deleted a user', () => {
      before(async () => {
        mockModels.User.destroy.withArgs({ where: { uid: id }}).resolves({ message: 'Successfully removed the user' });
        userResult = await userService.deleteUser(id)
      });

      after(() => {
        sinon.restore()
      });

      it('call destroy(id)', () => {
        expect(mockModels.User.destroy).to.have.been.calledWith({ where: { uid: id } })
      });

      it('user is deleted', () => {
        expect(JSON.stringify(userResult)).to.be.equal(JSON.stringify({ message: 'Successfully removed the user' }))
      });
    });

    describe('Failed to delete a user', () => {
      before(async () => {
        mockModels.User.destroy.withArgs({ where: { uid: id }}).resolves(null);
        userResult = await userService.deleteUser(id)
      });

      after(() => {
        sinon.restore()
      });

      it('call destroy(id)', () => {
        expect(mockModels.User.destroy).to.have.been.calledWith({ where: { uid: id } })
      });

      it('user is deleted', () => {
        expect(userResult).to.be.equal(null)
      });
    });
  });

})