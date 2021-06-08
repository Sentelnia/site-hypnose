const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le prénom est obligatoire.']
  },
  last_name: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire.']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    lowercase: true
  },
  tel: {
    type: Number,
    unique: true,  
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    minlength: 6,
    // maxlength: 16,
  },
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