const mongoose = require('mongoose');
const {Schema} = mongoose;


const rdvSchema = new Schema({
  name: String,
  last_name: String,
  email: String,
  tel:String,
  type_seance: String,
  message: String
}, {
  timestamps: true
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;