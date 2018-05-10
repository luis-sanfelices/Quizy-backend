const categoryQuizController = require('../controllers/categoryquiz');

const categoryQuizRouter = (app) => {
  app.post('/api/categoryquiz', categoryQuizController.createCategoryQuiz);
  // app.put('/api/quiz/:quizId', middlewares.isCorrectToken(), quizController.createQuestion);
  // app.get('/api/quiz/:id', middlewares.isCorrectToken(), quizController.getQuiz);
  // app.get('/api/quiz/', middlewares.isCorrectToken(), quizController.getAllQuizes);
  // app.get('/api/quiz/:id/stats', middlewares.isCorrectToken(), quizController.getQuizStats);
  // app.put('/api/quiz/:id/picture', middlewares.isCorrectToken(), upload.single('file'), quizController.uploadPicture);
};

module.exports = categoryQuizRouter;

