const Q = require('q');
const httpMocks = require('node-mocks-http')
const models = require('../../../server/models');
const controllers = require('../../../server/controllers');

const userController = controllers.userController;

let res, mockUser, id;

describe('UserController', () => {
  mockUser = {
    emailAdress: 'user@example.com',
    password: 'password',
  }

  beforeEach(done => {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    models.sequelize.sync({ force: true }).then(() => {
      models.User.create(mockUser).then(user => {
        id = user.id;
        done();
      });
    });
  });

  afterEach(done => {
    models.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });


  describe('#index', () => {
    it('should fetch all users', done => {
      const req = httpMocks.createRequest();

      userController.index(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        // const data = JSON.parse(res._getData());
        // data.should.be.instanceOf(Array);
        // data.length.should.equal(1);
        // done();
      });
    });
  });

  // describe('#create', () => {
  //   it('should create a user', done => {
  //     const user = {
  //       emailAddress: 'test@example.com',
  //       password: 'password',
  //     };

  //     const req = httpMocks.createRequest({
  //       body: user
  //     });

  //     userController.create(req, res);

  //     res.on('end', () => {
  //       res.statusCode.should.equal(200);
  //       const data = JSON.parse(res._getData());
  //       data.emailAddress.should.equal(user.emailAddress);
  //       done();
  //     });
  //   });
  // });
});
