const mongoose = require('mongoose');
const {Schema} = mongoose;


const rdvSchema = new Schema({
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
  tel:{
    type: Number,
    unique: true,  
  },
  type_seance: String,
  message: {
    type: String,
    required: [true, 'Le message est obligatoire.']
  },
}, {
  timestamps: true
});

const Rdv = mongoose.model('Rdv', rdvSchema);

module.exports = Rdv;