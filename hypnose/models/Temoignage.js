const mongoose = require('mongoose');
const {
  Schema
} = mongoose;


const temoignageSchema = new Schema({
  name: String,
  last_name: String,
  email: String,
  tel: String,
  type_seance: String,
  message: String
}, {
  timestamps: true
});

const Temoignage = mongoose.model('Temoignage', temoignageSchema);

module.exports = Temoignage;