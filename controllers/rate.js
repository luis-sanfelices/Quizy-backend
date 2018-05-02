const Rate = require('../models/rate');
const Quiz = require('../models/quiz');

const UpdateQuizRate = (quizId, rateCountInc, newRate, res, next) => {
  Quiz.findOneAndUpdate({ _id: quizId }, { $inc: { rateCount: rateCountInc, rateValue: newRate } })
    .then(updatedQuiz => res.status(200).json(updatedQuiz))
    .catch(err => next(err));
};

const rateController = {
  addRate(req, res, next) {
    const { userId, quizId, rate } = req.body;
    const rating =
      {
        userId,
        quizId,
        rate,
        date: new Date(),
      };
    Rate.find({ userId, quizId }).sort({ date: -1 }).limit(1)
      .then((result) => {
        if (!result[0]) {
          Rate.create(rating)
            .then((newRating) => {
              if (quizId) {
                UpdateQuizRate(quizId, 1, rate, res, next);
              } else {
                res.status(200).json(newRating);
              }
            })
            .catch(err => next(err));
        } else {
          const previousRate = result[0].rate ? result[0].rate : 0;
          const rateCountInc = result[0].rate ? 0 : 1;
          const newRate = rate - previousRate;
          Rate.create(rating)
            .then((newRating) => {
              if (quizId) {
                UpdateQuizRate(quizId, rateCountInc, newRate, res, next);
              } else {
                res.status(200).json(newRating);
              }
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  },
};

module.exports = rateController;
