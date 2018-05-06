const rankingController = require('../controllers/ranking');
const middlewares = require('../helpers/middlewares');

const rankingRouter = (app) => {
  app.post('/api/ranking', middlewares.isCorrectToken(), rankingController.addRanking);
  app.get('/api/ranking', rankingController.getRanking);
};

module.exports = rankingRouter;
