const rankingController = require('../controllers/ranking');
const middlewares = require('../helpers/middlewares');

const rankingRouter = (app) => {
  app.post('/api/ranking', middlewares.isCorrectToken(), rankingController.addRanking);
};

module.exports = rankingRouter;
