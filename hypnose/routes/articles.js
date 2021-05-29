const { Router } = require("express");
const router = new Router();

const Article = require("../models/Article.js");
const fileUploader = require('../configs/cloudinary.config');



////////////LISTE DES ARTICLES////////////////////

router.get('/articles', (req , res, next) => {
  Article.find()
  .then(allArticleFromDB => {
    res.render('articles/All-articles', {articles : allArticleFromDB})
  })
  .catch(err => next(err))
})



////////////CREER UN ARTICLE////////////////////

router.get('/articles/create', (req, res) => {
  res.render('articles/create')
})

router.post('/articles/create', fileUploader.single('image'), (req, res, next) => {
  const { title, description, video } = req.body;
  console.log(req.body)

  Article.create({title, description, video, imageUrl: req.file.path })
  .then(() => res.redirect('/articles'))
  .catch(err => next(err))
})



////////////DETAIL POUR UN ARTICLE////////////////////

router.get('/articles/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  

  Article.findById(articleId)
  .then(article => {
    console.log(article)
    res.render('articles/article-details', {article : article})})
  
  .catch(err => next(err))
})



module.exports = router