const User = require('../models/user');
const Ranking = require('../models/ranking');

const userController = {
  searchUsers(req, res, next) {
    User.find({ username: new RegExp(req.query.username, 'i') })
      .then((users) => {
        const userIds = users.map(user => user.id);
        return res.status(200).json(userIds);
      })
      .catch(err => next(err));
  },
  searchUserById(req, res, next) {
    const { idUser } = req.params;
    const response = {};
    User.findById(idUser, 'username email lastName firstName age friends avatar.pic_path')
      .then(user => user)
      .then((user) => {
        Ranking.count({ userId: idUser })
          .then(points => points)
          .then((points) => {
            Ranking.aggregate({ $match: { userId: idUser } }).group({
              _id: '$userId',
              markAvg: {
                $avg: '$result',
              },
            })
              .then((avg) => {
                response.username = user.username;
                response.firstName = user.firstName;
                response.lastName = user.lastName;
                response.age = user.age;
                response.email = user.email;
                response.avatar = user.avatar;
                response.markAvg = avg[0].markAvg;
                response.userPoints = points * 10;
                res.status(200).json(response);
              });
          });
      })
      .catch(err => next(err));
  },
  updateUser(req, res, next) {
    const { idUser } = req.params;
    const {
      email, firstName, lastName, age,
    } = req.body;
    User.findByIdAndUpdate(
      idUser,
      {
        $set: {
          email, firstName, lastName, age,
        },
      },
      { new: true },
    )
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
  uploadAvatar(req, res, next) {
    const { idUser } = req.params;
    const { filename } = req.file;
    const host = req.get('host');
    User.findByIdAndUpdate(
      idUser,
      { $set: { 'avatar.pic_name': filename, 'avatar.pic_path': `http://${host}/static/uploads/${filename}` } },
      { new: true },
    )
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
  deleteAvatar(req, res, next) {
    const { idUser } = req.params;
    User.findByIdAndUpdate(
      idUser,
      { $set: { avatar: null } },
    )
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
  getUserFriends(req, res, next) {
    const { idUser } = req.params;
    next();
  },
  addFriend(req, res, next) {
    const { idUser } = req.params;
    next();
  },
  deleteFriend(req, res, next) {
    const { idUser, idFriend } = req.params;
    next();
  },
};

module.exports = userController;

