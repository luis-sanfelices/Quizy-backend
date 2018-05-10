const Notifications = require('../models/notifications');

const notificationsController = {
  getNotifications(req, res, next) {
    Notifications.find({ userId: req.params.idUser, readed: false })
      .populate('notification.fromUser')
      .populate('notification.challengeId')
      .then(nots => res.status(200).json(nots.map(not => not.notification)))
      .catch(err => next(err));
  },
  notificationReaded(req, res, next) {
    Notifications.findByIdAndUpdate(req.params.idNotification, { readed: true })
      .then(notification => res.status(200).json(notification))
      .catch(err => next(err));
  },
};

module.exports = notificationsController;
