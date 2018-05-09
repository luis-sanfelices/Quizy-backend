const notificationsController = require('../controllers/notifications');
const middlewares = require('../helpers/middlewares');

const notificationsRouter = (app) => {
  app.get('/api/notifications/:idUser', middlewares.isCorrectToken(), notificationsController.getNotifications);
  app.put('/api/notifications/:idNotification', middlewares.isCorrectToken(), notificationsController.notificationReaded);
};

module.exports = notificationsRouter;
