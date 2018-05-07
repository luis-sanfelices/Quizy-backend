const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageNotificationSchema = new Schema({
  notificationType: String,
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  quizID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  category: String,
});

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      index: true,
    },
    notification: messageNotificationSchema,
    readed: { type: Boolean, default: false },
    date: Date,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);


const Notifications = mongoose.model('notifications', notificationSchema);

module.exports = Notifications;
