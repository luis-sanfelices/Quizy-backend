const Ranking = require('../models/ranking');

const rankingController = {
  addRanking(req, res, next) {
    Ranking.create(req.body)
      .then(ranking => res.status(200).json(ranking))
      .catch(err => next(err));
  },
};

module.exports = rankingController;
