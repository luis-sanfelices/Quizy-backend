const quizController = require('../controllers/quiz');
const middlewares = require('../helpers/middlewares');

const quizRouter = (app) => {
  app.post('/api/quiz', middlewares.isCorrectToken(), quizController.createQuiz);

  app.put('/api/quiz/:quizId', middlewares.isCorrectToken(), quizController.createQuestion);

  app.get('/api/quiz', middlewares.isCorrectToken(), quizController.getAllQuizes);
};

module.exports = quizRouter;

