const Rate = require('../models/rate');
const Quiz = require('../models/quiz');

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
    const ratedBefore = Rate.find({ userId, quizId }).sort({ date: -1 }).limit(1);
    if (!ratedBefore) {
      Rate.create(rating)
        .then(() => {
          Quiz.findOneAndUpdate({ id: quizId }, { $inc: { rateCount: 1, rate } });
        })
        .catch(err => next(err));
    } else {
      const newRate = rate - ratedBefore.rate;
      Rate.create(rating)
        .then(() => {
          Quiz.findOneAndUpdate({ id: quizId }, { $inc: { rate: newRate } });
        })
        .catch(err => next(err));
    }
  },
};

module.exports = rateController;
