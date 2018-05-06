const challengeController = require('../controllers/challenge');
const middlewares = require('../helpers/middlewares');

const ranteRouter = (app) => {
  app.post('/api/challenge', middlewares.isCorrectToken(), challengeController.addChallenge);
  app.put('/api/challenge/:idChallenge', middlewares.isCorrectToken(), challengeController.updateChallenge);
};

module.exports = ranteRouter;
