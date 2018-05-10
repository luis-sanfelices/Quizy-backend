const Challenge = require('../models/challenge');
const Notifications = require('../models/notifications');

const challengeController = {
  addChallenge(req, res, next) {
    Challenge.create(req.body)
      .then((challenge) => {
        Notifications.create({
          userId: req.body.userId,
          readed: false,
          notification: {
            notificationType: 'challenge',
            fromUser: req.body.challenger,
            challengeId: challenge.id,
          },
        })
          .then((notification) => {
            console.log(notification);
            res.status(200).json(challenge);
          })
          .catch(err => next(err));
      })
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
