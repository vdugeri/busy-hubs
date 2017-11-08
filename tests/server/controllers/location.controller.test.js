'use strict';

const controllers = require('../../../server/controllers');
const httpMocks = require('node-mocks-http');
const should = require('should');
const models = require('../../../server/models');
const Q = require('q');


const locationController = controllers.locationController;

let res, mockLocation, mockBusiness, id, bid;

describe('location controller test', () => {
  mockLocation = {
    value: '123, Sawyer street',
    long: '-23',
    lat: 165,
  };

  mockBusiness = {
    name: 'TestOne Co',
    imageUrl: 'http://imageurl.im',
    owner: 'Test user',
  }

  beforeEach(done => {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    models.Business.create(mockBusiness).then(business => {
      bid = business.id;
      mockLocation.business_id = bid;
      models.Location.create(mockLocation).then(location => {
        id = location.id;
        done();
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    });
  });

  afterEach(done => {
    models.sequelize.sync({ force: true }).then(() => {
      done();
    }).catch(err => {
      throw err;
    });
  });

  describe('#index', () => {
    it('should find all location records', done => {
      const req = httpMocks.createRequest({
        params: {
          bid,
        },
      });

      locationController.index(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.should.be.instanceOf(Array);
        data.length.should.equal(1);
        done();
      });
    });
  });

  describe('#create', () => {
    it('should create a location record', done => {
      const location = {
        value: '33 K & West, DC',
        long: 22,
        lat: 123,
        business_id: bid,
      };
      const req = httpMocks.createRequest({
        body: location,
      });

      locationController.create(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.value.should.equal(location.value);
        done();
      });
    });
  });

  describe('#find', () => {
    it('should find a location for a business', done => {
      const req = httpMocks.createRequest({
        params: {
          bid,
          id,
        },
      });

      locationController.find(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.business_id.should.equal(bid);
        data.id.should.equal(id);
        done();
      });
    });
  })

  describe('#update', () => {
    it('should update a location record', done => {
      mockLocation.value = '65 Dunning Close';

      const req = httpMocks.createRequest({
        params: {
          id,
          bid,
        },
        body: mockLocation
      });

      locationController.update(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.value.should.equal('65 Dunning Close');
        done();
      });
    });

    it('should return a 404 for an inexistent business location', done => {
      const req = httpMocks.createRequest({
        params:{
          id,
          bid: 1,
        },
      });

      locationController.update(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(404);
        const data = JSON.parse(res._getData());
        data.message.should.equal('Invalid business location')
        done();
      });
    });
  });

  describe('#delete', () => {
    it('should delete a location record with the specified id', done => {
      const req = httpMocks.createRequest({
        params: {
          bid,
          id,
        }
      });

      locationController.destroy(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.message.should.equal('Location successfuly deleted');
        done();
      });
    });

    it('should return a 404 when a location is not found', done => {
      const req = httpMocks.createRequest({
        param: {
          bid,
          id: 1,
        },
      });

      locationController.destroy(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(404);
        const data = JSON.parse(res._getData());
        data.message.should.equal('Location already deleted');
        done();
      });
    });
  });
});
