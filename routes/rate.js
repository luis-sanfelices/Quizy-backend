const rateController = require('../controllers/rate');
const middlewares = require('../helpers/middlewares');

const ranteRouter = (app) => {
  app.post('/api/rate', middlewares.isCorrectToken(), rateController.addRate);
};

module.exports = ranteRouter;
