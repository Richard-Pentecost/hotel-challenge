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
          });
        });
    });

    it('Errors if an email is not a string', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          name: 'Richard',
          email: 1234,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('User information invalid!');
          done();
        });
    });

    it('Errors if a name is not a string', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          name: 1234,
          email: 'richard@hotmail.com',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('User information invalid!');
          done();
        });
    });
  });

  describe('with users in the database', () => {
    let users;
    beforeEach((done) => {
      Promise.all([
        User.create({ name: 'Richard', email: 'richard@hotmail.com' }),
        User.create({ name: 'Tom', email: 'tom@hotmail.com' }),
        User.create({ name: 'Sophie', email: 'sophie@gmail.com' }),
      ]).then((documents) => {
        users = documents;
        done();
      });
    });

    describe('GET /users', () => {
      it('gets all users records', (done) => {
        chai.request(server)
          .get('/users')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(3);

            res.body.forEach(user => {
              const expected = users.find(u => u._id.toString() === user._id);
              expect(user.name).to.equal(expected.name);
              expect(user.email).to.equal(expected.email);
            });
            done();
          });
      });
    });
    
    describe('GET /users/userId', () => {
      it('get a users info from id', (done) => {
        const user = users[0];
        chai.request(server)
          .get(`/users/${user._id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(user.name);
            expect(res.body.email).to.equal(user.email);
            done();
          });
      });

      it('returns a 400 if the user is not found', (done) => {
        chai.request(server)
          .get('/users/2345')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('The user could not be found.');
            done();
          });
      });
    });
  });
});
