const Challenge = require('../models/challenge');

const challengeController = {
  addChallenge(req, res, next) {
    Challenge.create(req.body)
      .then(challenge => res.status(200).json(challenge))
      .catch(err => next(err));
  },
  updateChallenge(req, res, next) {
    const { idChallenge } = req.params;
    const { userResult } = req.body;
    Challenge.findByIdAndUpdate(idChallenge, {
      $set: {
        userResult,
        finished: true,
      },
    })
      .then(challenge => res.status(200).json(challenge))
      .catch(err => next(err));
  },
};

module.exports = challengeController;
