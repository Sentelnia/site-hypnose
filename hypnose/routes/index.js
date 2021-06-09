const express = require('express');
const router = express.Router();
const Temoignage = require("../models/Temoignage.js");
const Article = require("../models/Article.js");

//////////////////////////////// GET home page ///////////////////////////////////////////////

router.get('/', (req, res, next) => {


  Temoignage.find()
    .then(allTemoignagesFromDB => {
      Article.find().sort({
          createdAt: -1
        }).limit(3)
        .then((article) => {
          console.log(article)
          res.render('main/homepage', {
            temoignages: allTemoignagesFromDB,
            article: article
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
});


//////////////////////////////// GET page a propos ///////////////////////////////////////////////

router.get('/fabienne-ilic', (req, res, next) => {
  res.render('main/fabienne-ilic');
});



module.exports = router;