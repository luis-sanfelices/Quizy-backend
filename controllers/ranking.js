const Ranking = require('../models/ranking');

const rankingController = {
  addRanking(req, res, next) {
    Ranking.create(req.body)
      .then(ranking => res.status(200).json(ranking))
      .catch(err => next(err));
  },
  getRanking(req, res, next) {
    const {quizId} = req.query; 
    Ranking.find( {quizId} )
      .sort({result: -1, date: -1})
      .limit(10)
      .populate('userId')
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(error => next(error));
  },
};

module.exports = rankingController;
       