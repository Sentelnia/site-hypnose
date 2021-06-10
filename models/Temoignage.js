const mongoose = require('mongoose');
const {
  Schema
} = mongoose;


const temoignageSchema = new Schema({
  type_seance: String,
  message: String,
  signature: String,
}, {
  timestamps: true
});

const Temoignage = mongoose.model('Temoignage', temoignageSchema);

module.exports = Temoignage;