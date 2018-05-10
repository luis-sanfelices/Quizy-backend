const CategoryQuiz = require('../models/categoryquiz');

const categoryQuizController = {
  createCategoryQuiz(req, res, next) {
    CategoryQuiz.create({
      categoryName: req.body.name,
      categoryId: req.body.id,
      rateCount: 0,
      rateValue: 0,
    })
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch((err) => {
        next(err);
      });
  },

  getCategoryQuiz(req, res, next) {
    Quiz.findById(req.params.id)
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch(err => next(err));
  },
  getQuizStats(req, res, next) {
    next();
  },
};

module.exports = categoryQuizController;

