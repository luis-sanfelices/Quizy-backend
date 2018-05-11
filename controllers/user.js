const fs = require('fs');
const User = require('../models/user');
const Ranking = require('../models/ranking');
const Notifications = require('../models/notifications');
const mongoose = require('mongoose');

const userController = {
  searchUsers(req, res, next) {
    User.find({ username: new RegExp(req.query.username, 'i') })
      .limit(10)
      .then(users => res.status(200).json(users))
      .catch(err => next(err));
  },
  searchUserById(req, res, next) {
    const { idUser } = req.params;
    const response = {};
    User.findById(idUser, 'username email lastName firstName age friends avatar.pic_path')
      .populate({
        path: 'friends',
        options: {
          limit: 10,
        },
      })
      .then(user => user)
      .then((user) => {
        Ranking.count({ userId: idUser })
          .then(points => points)
          .then((points) => {
            Ranking.aggregate().match({ userId: mongoose.Types.ObjectId(idUser) }).group({
              _id: '$userId',
              markAvg: {
                $avg: '$result',
              },
            })
              .then(avg => avg)
              .then((avg) => {
                Ranking.aggregate().match({ userId: mongoose.Types.ObjectId(idUser) }).group({
                  _id: '$category',
                  markAvg: {
                    $avg: '$result',
                  },
                  count: { $sum: 1 },
                })
                  .then((categoryPoints) => {
                    response.username = user.username;
                    response.firstName = user.firstName;
                    response.lastName = user.lastName;
                    response.friends = user.friends;
                    response.age = user.age;
                    response.email = user.email;
                    response.avatar = user.avatar;
                    response.markAvg = avg[0] ? avg[0].markAvg : 0;
                    response.userPoints = points;
                    response.categoryPoints = categoryPoints;
                    res.status(200).json(response);
                  });
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
    User.findById(idUser)
      .then((previousUser) => {
        fs.unlinkSync(`public/uploads/${previousUser.avatar.pic_name}`);
        User.findByIdAndUpdate(
          idUser,
          { $set: { 'avatar.pic_name': filename, 'avatar.pic_path': `http://${host}/static/uploads/${filename}` } },
          { new: true },
        )
          .then(user => res.status(200).json(user))
          .catch(error => next(error));
      })
      .catch(err => next(err));
  },
  searchUserFriends(req, res, next) {
    const { idUser } = req.params;
    const searchTerm = req.query.username;
    if (searchTerm) {
      User.findById(idUser)
        .then((user) => {
          User.find({ username: new RegExp(req.query.username, 'i'), _id: { $in: user.friends } })
            .limit(10)
            .then(users => res.status(200).json(users))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    } else {
      User.findById(idUser)
        .populate('friends')
        .limit(10)
        .then(friends => res.status(200).json(friends))
        .catch(err => next(err));
    }
  },
  addFriend(req, res, next) {
    const { idUser } = req.params;
    const { friend } = req.body;
    User.findByIdAndUpdate(
      idUser,
      {
        $addToSet: { friends: friend },
      },
      { new: true },
    )
      .then((user) => {
        Notifications.create({
          userId: friend,
          readed: false,
          notification: {
            notificationType: 'new friend',
            fromUser: idUser,
          },
        })
          .then((notification) => {
            console.log(notification);
            res.status(200).json(user);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  },
  deleteFriend(req, res, next) {
    const { idUser, idFriend } = req.params;
    User.findByIdAndUpdate(
      idUser,
      {
        $push: { idFriend },
      },
      { new: true },
    )
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  },
  getLastQuizesPlayed(req, res, next) {
    const { idUser } = req.params;
    Ranking.find({ userId: idUser })
      .sort({ created_at: -1 })
      .limit(10)
      .populate('quizId')
      .then(quizes => res.status(200).json(quizes))
      .catch(err => next(err));
  },
};

module.exports = userController;

