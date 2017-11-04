'use strict';

const controllers = require('../../../server/controllers');
const httpMocks = require('node-mocks-http');
const should = require('should');
const models = require('../../../server/models');

const businessController = controllers.businessController;

let res, error, success, id, mockBusiness;

describe('Business controller', () => {
	mockBusiness = {
    name: 'TestOne Co',
    imageUrl: 'http://imageurl.im',
    owner: 'Test user',
	};

  error = { message: 'An error occured'};

  success = { message: 'Business deleted'};

  beforeEach(done => {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    models.Business.create(mockBusiness).then(business => {
      id = business.id;
      done();
    }).catch(err => {
      throw err;
    });
  });

  afterEach(done => {
    models.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

	describe('#index', () => {
		it('should fetch all businesses', done => {
			const req = httpMocks.createRequest();
      businessController.index(req, res);

			res.on('end', () => {
        const data = JSON.parse(res._getData());
        res.statusCode.should.equal(200);
        data.should.be.instanceOf(Array);
        data.length.should.equal(1);
				done();
			});
		});
  });

  describe('#create', () => {
    it('should create a business', done => {
      mockBusiness.name = 'TestOne Inc'
      const req = httpMocks.createRequest({
        body: mockBusiness
      });
      businessController.create(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(201);
        const data = JSON.parse(res._getData())
        data.name.should.equal(mockBusiness.name)
        done();
      })
    });
  });

  describe('#find', () => {
    it('should find a business with the specified id', done => {
      const req = httpMocks.createRequest({
        params: {
          id,
        }
      });
      businessController.find(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.id.should.equal(id);
        done();
      });
    });

    it('should return 404 for an inexistent business', done => {
      const req = httpMocks.createRequest({
        params: {
          id: 345,
        }
      });
      businessController.find(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(404);
        done();
      })
    })
  })

  describe('#update', () => {
    it('should update a bussiness record', done => {
      mockBusiness.name = 'Cyberdyne Inc ';
      const req = httpMocks.createRequest({
        params: {
          id,
        },
        body: mockBusiness
      });
      businessController.update(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.name.should.equal(mockBusiness.name);
        done();
      });
    });

    it('should return 404 for a business that does not exist', done => {
      const req = httpMocks.createRequest({
        params: {
          id: 345,
        },
        body: mockBusiness,
      });

      businessController.update(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(404);
        done();
      });
    });

    it('should')
  });

  describe('#destroy', () => {
    it('should delete a business record with the specified id', done => {
      const req = httpMocks.createRequest({
        params: {
          id,
        }
      });

      businessController.destroy(req, res);
      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.message.should.equal(success.message);
        done();
      });
    });
  });
});
