const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server');

describe('/user', () => {
  let response;
  const request = supertest(app);
  // console.log(request)

  it('Encompasses All', async () => {
    const prime = await request.get('/user');
    // console.log(prime.body)
    const id = prime.body[0].uid

    describe('testing for /user get', () => {

      it('Should 200 OK when there are users', async () => {
        response = await request.get('/user')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      }).timeout(10000);
      it('returns an array', async () => {
        response = await request.get('/user')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });
  
    describe('/user POST', () => {
  
      const addUser = {
        email: "super@email.com",
        password: 123456,
        is_admin: false,
        first_name: "super",
        last_name: "test",
        google_id: null,
        facebook_id: null
      }
  
      it('New user POST REQ', async () => {
        response = await request.post('/user')
                                .send(addUser)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        // console.log(response.body)
        const uid = response.body.uid
        expect(response.body).to.be.an('object');
        expect(response.status).to.deep.equal(201);
        expect(response.body).to.have.all.keys(
          'email',
          'password',
          'is_admin',
          'first_name',
          'last_name',
          'google_id',
          'facebook_id',
          'uid',
          'updated_at',
          'created_at');
  
        describe('/user/:id PUT', () => {
    
          it('failed to update user', async () => {
            response = await request.put('/user/227f7843-03ef-49f8-b61c-7500c6be85e3'); // false id to test 404
            // console.log(response.body)
            expect(response.status).to.deep.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.deep.equal('Update was unsuccessful because user was not found')
          });
      
          it('update user', async () => {
            response = await request.put(`/user/${uid}`) // correct id from POST it block
                                    .send({last_name: 'some random change a new last name made'})
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/);
            // console.log(response.body)
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('last_name')
          });
        });
  
        describe('/user/:id DELETE', () => {
  
          it('failed to delete because user was not found', async () => {
            response = await request.delete('/user/9f309c1b-13ea-4932-9140-eac816a4ce98');
            expect(response.status).to.deep.equal(404);
          });
  
          it('delete user', async () => {
            response = await request.delete(`/user/${uid}`);
            expect(response.status).to.deep.equal(204);
          });
        });
      })
      after(done => done())
    });
  
    describe('/user/:id GET', () => {
      
      it('successfully fetched a user', async () => {
        response = await request.get(`/user/${id}`)
        // console.log(response.body)
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('object');
      });
  
      it('failed to fetch a user', async () => {
        response = await request.get('/user/1e06c54a-5591-4b1f-b2d4-b405d67619e1') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('User not found')
      });
    });

  })
  
}).timeout(100000);