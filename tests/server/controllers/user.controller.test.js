const Q = require('q');
const httpMocks = require('node-mocks-http')
const models = require('../../../server/models');
const controllers = require('../../../server/controllers');

const userController = controllers.userController;

let res, mockUser, id, notFound, deleted;

describe('UserController', () => {
  mockUser = {
    emailAddress: 'user@example.com',
    password: 'password',
  }

  notFound = { message: 'User not found' };
  deleted = { message: 'User deleted'};
  alreadyDeleted = { error: 'User already deleted' }

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
        const data = JSON.parse(res._getData());
        data.should.be.instanceOf(Array);
        data.length.should.equal(1);
        done();
      });
    });
  });

  describe('#create', () => {
    it('should create a user', done => {
      const user = {
        emailAddress: 'test@example.com',
        password: 'password',
      };

      const req = httpMocks.createRequest({
        body: user
      });

      userController.create(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.emailAddress.should.equal(user.emailAddress);
        done();
      });
    });
  });

  describe('#find', () => {
    it('should find a user with the given id', done => {
      const req = httpMocks.createRequest({
        params: {
          id,
        }
      });

      userController.find(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.id.should.equal(id);
        data.emailAddress.should.equal(mockUser.emailAddress);
        done();
      });
    });

    it('should return 404 for a wrong id', done => {
      const req = httpMocks.createRequest({
        params: {
          id: 1234
        }
      });

      userController.find(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(404);
        const data = JSON.parse(res._getData());
        data.message.should.equal(notFound.message);
        done();
      });
    });
  });

  describe('#update', () => {
    it('should update a user matching the specified id', done => {
      mockUser.emailAddress = 'example@user.com';

      const req = httpMocks.createRequest({
        params: {
          id,
        },
        body: mockUser,
      });

      userController.update(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.emailAddress.should.equal(mockUser.emailAddress);
        done();
      });
    });

    it('should return 404 for an inexisited id', done => {
      const req = httpMocks.createRequest({
        params: {
          id: 1234,
        },
        body: mockUser,
      });

      userController.update(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(404);
        const data = JSON.parse(res._getData());
        data.message.should.equal(notFound.message);
        done();
      });
    });
  });

  describe('#delete', () => {
    it('should succesfully delete a user', done => {
      const req = httpMocks.createRequest({
        params: {
          id,
        }
      });

      userController.destroy(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(200);
        const data = JSON.parse(res._getData());
        data.message.should.equal('User deleted');
        done();
      });
    });

    it('should return 404 for an already deleted user', done => {
      const req = httpMocks.createRequest({
        params: {
          id: 1234,
        },
      });

      userController.destroy(req, res);

      res.on('end', () => {
        res.statusCode.should.equal(404);
        const data = JSON.parse(res._getData());
        data.error.should.equal(alreadyDeleted.error);
        done();
      })
    })
  });
});
