const Q = require('q');
const httpMocks = require('node-mocks-http')
const models = require('../../../server/models');
const controllers = require('../../../server/controllers');

const res, mockUser;

describe('UserController', () => {
  mockUser = {
    emailAdress: 'user@example.com',
    password: 'password',
  }

  beforeEach(done => {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    models.User.create(mockUser).then(user => {
      id = user.id;
      done();
    });
  });

  afterEach(done => {
    models.sequelize.sync().then(() => {
      done();
    });
  });
});
