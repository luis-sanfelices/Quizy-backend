const rateController = require('../controllers/rate');
const middlewares = require('../helpers/middlewares');

const ranteRouter = (app) => {
  app.get('/api/rate/category', middlewares.isCorrectToken(), rateController.getCategoryRate);
  app.post('/api/rate', middlewares.isCorrectToken(), rateController.addRate);
};

module.exports = ranteRouter;
