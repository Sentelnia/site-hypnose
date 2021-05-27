const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  name: String,
  last_name: String,
  email: String,
  tel:String,
  password: String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  articles_like: [{ type : Schema.Types.ObjectId, ref: 'Article'}]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;