const authController = require('../controllers/auth');
const middlewares = require('../helpers/middlewares');

const authRouter = (app) => {
  app.post('/api/signup', authController.signup);
  app.post('/api/login', authController.login);
  app.get('/api/me', middlewares.isCorrectToken(), authController.me);
};

module.exports = authRouter;
