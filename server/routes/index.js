'use strict';

const controllers = require('../controllers');

module.exports = (app) => {
  /**
   * Business routes
   */
  app.get('/api/v1/businesses', controllers.businessController.index);
  app.post('/api/v1/businesses', controllers.businessController.create);
  app.get('/api/v1/businesses/:id', controllers.businessController.find);
  app.put('/api/v1/businesses/:id', controllers.businessController.update);
  app.delete('/api/v1/businesses/:id', controllers.businessController.destroy);


  /**
   * Users routes
   */
  app.get('/api/v1/users', controllers.userController.index);
  app.post('/api/v1/users', controllers.userController.create);
  app.get('/api/v1/users/:id', controllers.userController.find);
  app.put('/api/v1/users/:id', controllers.userController.update);
  app.delete('/api/v1/users/:id', controllers.userController.destroy);


}
