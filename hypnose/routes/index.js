const express = require('express');
const router = express.Router();
const Temoignage = require("../models/Temoignage.js");

//////////////////////////////// GET home page ///////////////////////////////////////////////

router.get('/', (req, res, next) => {


  Temoignage.find()
    .then(allTemoignagesFromDB => {
      res.render('main/homepage', {
        temoignages: allTemoignagesFromDB
      })
    })
    .catch(err => next(err))


});


//////////////////////////////// GET page a propos ///////////////////////////////////////////////

router.get('/fabienne-ilic', (req, res, next) => {
  res.render('main/fabienne-ilic');
});



module.exports = router;