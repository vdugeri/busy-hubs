'use strict';

const controllers = require('../../../server/controllers');
const httpMocks = require('node-mocks-http');
const should = require('should');
const models = require('../../../server/models');


let res, error, mockBusiness, req;

describe('Business controller', () => {
	mockBusiness = {
	name: 'TestOne Co',
	imageUrl: 'http://imageurl.im',
	owner: 'Test user',
	};

	error = { message: 'An error occured'};

	beforeEach(done => {
		res = httpMocks.createResponse({
			eventEmitter: require('events').EventEmitter
		});
		models.sequelize.sync({ force: true}).then(() => {
			done();
		});
	});

	afterEach(done => {
		models.sequelize.sync({ force: true}).then(() => {
      return done();
		});
	});

	describe('#index', () => {
		it('should fetch all businesses', done => {
			req = httpMocks.createRequest();
			controllers.businessController.index(req, res);

			res.on('end', () => {
				const data = JSON.parse(res._getData());
				data.should.be.instanceOf(Array);
				done();
			});
		});
	});
});
