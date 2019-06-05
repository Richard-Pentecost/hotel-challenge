const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('/users', () => {
  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          name: 'Richard',
          email: 'richard@hotmail.com',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(200);
          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.name).to.equal('Richard');
            expect(user.email).to.equal('richard@hotmail.com');
            done();
          })
        })
    })
  })
})
