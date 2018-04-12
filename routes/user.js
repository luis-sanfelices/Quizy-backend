const userController = require('../controllers/user');
const middlewares = require('../helpers/middlewares');

const userRouter = (app) => {
  app.get('/api/user', middlewares.isCorrectToken(), userController.searchUsers);
  app.get('/api/user/:idUser', middlewares.isCorrectToken(), userController.searchUserById);
  app.put('/api/user/:idUser', middlewares.isCorrectToken(), userController.updateUser);
  app.get('/api/user/:idUser/friends', middlewares.isCorrectToken(), userController.getUserFriends);
  app.put('/api/user/:idUser/friends', middlewares.isCorrectToken(), userController.addFriend);
  app.delete('/api/user/:idUser/friends/:idFriend', middlewares.isCorrectToken(), userController.deleteFriend);
};

module.exports = userRouter;
