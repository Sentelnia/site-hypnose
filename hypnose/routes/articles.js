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

  Article.create({title, description, video, imageUrl: req.file.path })
  .then(() => res.redirect('/articles'))
  .catch(err => next(err))
})



////////////EDITER UN ARTICLE////////////////////

router.get('/articles/:articleId/edit', (req, res) =>{
  const { articleId } = req.params;

  Article.findById(articleId)
  .then(articleToEdit => {
    res.render('articles/edit',{article : articleToEdit})
  })
  .catch(err => next(err))
})

router.post('/articles/:articleId/edit', fileUploader.single('image'), (req, res,next) =>{
  const { articleId } = req.params;
  const { title, description, video } = req.body;
  console.log(req.body)

  Article.findByIdAndUpdate(articleId, {title, description, video, imageUrl: req.file.path }, { new: true })
    .then(updatedArticle => res.redirect(`/articles/${updatedArticle.id}`))
    .catch(err => next(err))
})



////////////SUPPRIMER UN ARTICLE////////////////////

router.post('/articles/:articleId/delete', (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndDelete(articleId)
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