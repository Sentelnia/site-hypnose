const express = require('express');
const router = express.Router();
const Temoignage = require("../models/Temoignage.js");
const Article = require("../models/Article.js");

// require slugify

const slugify = require("slugify");

//////////////////////////////// GET home page ///////////////////////////////////////////////

router.get('/', (req, res, next) => {


  Temoignage.find()
    .then(allTemoignagesFromDB => {
      Article.find().sort({
          createdAt: -1
        }).limit(3)
        .then((allArticleFromDB) => {
          allArticleFromDB.forEach((article) => {
            article.title2 = slugify(article.title);
            article.createdAt2 = formatDate(article.createdAt)
          });
          res.render('main/homepage', {
            temoignages: allTemoignagesFromDB,
            articles: allArticleFromDB,
            succesNotif: req.flash('subscribed')
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



function formatDate(date) {

  //1.recuperer createdat en parametre puis le couper sur les 10 premiers caractères
  let strDate = JSON.stringify(date)
  let cutDate = strDate.slice(1, 11)

  //2.inverse l'année et le jour
  let arrDate = cutDate.split('-')
  arrDate.reverse()
  //3. on remplace les '-' par des '/'
  return arrDate.join('/')

  //4.switch les mois
}

module.exports = router;