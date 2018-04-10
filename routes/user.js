const userController = require('../controllers/user');
const middlewares = require('../helpers/middlewares');

const userRouter = (app) => {
  app.get('/api/user', middlewares.isCorrectToken(), userController.searchUsers);
  app.get('/api/user/:id', middlewares.isCorrectToken(), userController.searchUserById);
  app.put('/api/user/:id', middlewares.isCorrectToken(), userController.updateUser);
};

module.exports = userRouter;
