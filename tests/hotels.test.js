const mongoose = require('mongoose');
const Hotel = require('../src/models/hotel');

describe('/hotels', () => {
  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /hotels', () => {
    it('creates a database entry for a hotel', (done) => {
      chai.request(server)
        .post('/hotels')
        .send({
          name: 'Hilton',
          address: '1 Park Lane, London',
          email: 'hilton@hilton.com',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(200);
          Hotel.findById(res.body._id, (err, hotel) => {
            expect(err).to.equal(null);
            expect(hotel.name).to.equal('Hilton');
            expect(hotel.address).to.equal('1 Park Lane, London');
            expect(hotel.email).to.equal('hilton@hilton.com');
            done();
          });
        });
    });
  });

});
