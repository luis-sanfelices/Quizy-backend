const quizController = require('../controllers/quiz');
const middlewares = require('../helpers/middlewares');
const upload = require('../helpers/multer');

const quizRouter = (app) => {
  app.post('/api/quiz', middlewares.isCorrectToken(), quizController.createQuiz);
  app.put('/api/quiz/:quizId', middlewares.isCorrectToken(), quizController.createQuestion);
  app.get('/api/quiz/:id', middlewares.isCorrectToken(), quizController.getQuiz);
  app.get('/api/quiz/', middlewares.isCorrectToken(), quizController.getAllQuizes);
  app.get('/api/quiz/:id/stats', middlewares.isCorrectToken(), quizController.getQuizStats);
  app.put('/api/quiz/:id/picture', middlewares.isCorrectToken(), upload.single('file'), quizController.uploadPicture);
};

module.exports = quizRouter;

