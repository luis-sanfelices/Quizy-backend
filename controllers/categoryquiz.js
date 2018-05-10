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

  // getAllQuizes(req, res, next) {
  //   const { offset = 0 } = req.query;
  //   const findQuiz = Quiz.find({}, 'name user category rateCount rateValue picture')
  //     .sort({ rateCount: -1 })
  //     .skip(parseInt(offset, 10) * 2)
  //     .limit(2)
  //     .then(quizes => quizes)
  //     .catch((err) => {
  //       next(err);
  //     });
  //   const countQuery = Quiz
  //     .count({})
  //     .then(count => count)
  //     .catch(err => next(err));
  //   return Promise.all([findQuiz, countQuery])
  //     .then(result => res.status(200).json({
  //       quizes: result[0],
  //       count: result[1],
  //       offset,
  //       limit: 2,
  //     }));
  // },
  // getQuiz(req, res, next) {
  //   Quiz.findById(req.params.id)
  //     .populate('user')
  //     .then((quiz) => {
  //       res.status(200).json(quiz);
  //     })
  //     .catch(err => next(err));
  // },
  // getQuizStats(req, res, next) {
  //   next();
  // },
  // uploadPicture(req, res, next) {
  //   const { id } = req.params;
  //   const { filename } = req.file;
  //   const host = req.get('host');
  //   Quiz.findByIdAndUpdate(
  //     id,
  //     { $set: { 'picture.pic_name': filename, 'picture.pic_path': `http://${host}/static/uploads/${filename}` } },
  //     { new: true }
  //   )
  //     .then(quiz => res.status(200).json(quiz))
  //     .catch(err => next(err));
  // },
};

module.exports = categoryQuizController;

