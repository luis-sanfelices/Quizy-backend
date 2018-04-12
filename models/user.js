const mongoose = require('mongoose');

const { Schema } = mongoose;

const pictureSchema = new Schema({
  pic_path: String,
  pic_name: String,
});

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firsName: String,
  lastName: String,
  avatar: pictureSchema,
  friends: {
    user: { type: [Schema.Types.ObjectId], ref: 'user' },
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
