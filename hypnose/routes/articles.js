const { Router } = require("express");
const router = new Router();

const Article = require("../models/Article.js");
const fileUploader = require('../configs/cloudinary.config');

// require slugify

const slugify = require('slugify')


////////////LISTE DES ARTICLES////////////////////

router.get('/articles', (req , res, next) => {
  Article.find()
  .then(allArticleFromDB => {
    allArticleFromDB.forEach((article) => {
      article.title2 = slugify(article.title)
    })
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
  

  // Condition sans image
  if (req.file === undefined){
    Article.create({title, description, video, like : 0 })
  .then(() => res.redirect('/articles'))
  .catch(err => next(err))
  return
  // Condition avec image
  } else {
    Article.create({title, description, video, imageUrl: req.file.path, like : 0})
  .then(() => res.redirect('/articles'))
  .catch(err => next(err))
  }
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
  const { title, description, video, like } = req.body;
  console.log(req.file)


  // Condition sans image
  if (req.file === undefined){
    Article.findByIdAndUpdate(articleId, {title, description, video, like, imageUrl : '' })
    .then((updatedArticle ) =>{
      updatedArticle.title2 = slugify(updatedArticle.title)
      res.redirect(`/articles/${updatedArticle.title2}/${updatedArticle.id}`)
    })
    .catch(err => next(err))
  return
  // Condition avec image
  } else {
    Article.findByIdAndUpdate(articleId, {title, description, video, imageUrl: req.file.path, like })
    .then((updatedArticle ) =>{
      updatedArticle.title2 = slugify(updatedArticle.title)
      res.redirect(`/articles/${updatedArticle.title2}/${updatedArticle.id}`)
    })
    .catch(err => next(err))
  }
})



////////////EDITER LES LIKES////////////////////


router.post('/articles/:articleId/like', (req, res, next) => {
  const { like } = req.body;
  res.send(like)
})




////////////SUPPRIMER UN ARTICLE EN LISTE////////////////////

router.post('/articles/:articleId/delete', (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndDelete(articleId)
    .then(() => res.redirect('/articles'))
    .catch(err => next(err))
})


////////////DETAIL POUR UN ARTICLE////////////////////

router.get('/articles/:articleName/:articleId', (req, res, next) => {
  const { articleId } = req.params;
  

  Article.findById(articleId)
  .then(article => {
    res.render('articles/article-details', {article : article})})
  
  .catch(err => next(err))
})


////////////EDITER UN ARTICLE EN DETAIL////////////////////

router.get('/articles/:articleName/:articleId/edit', (req, res) =>{
  const { articleId } = req.params;

  Article.findById(articleId)
  .then(articleToEdit => {
    articleToEdit.title2 = slugify(articleToEdit.title)
    res.render('articles/edit',{article : articleToEdit})
  })
  .catch(err => next(err))
})



////////////SUPPRIMER UN ARTICLE EN DETAIL////////////////////

router.post('/articles/:articleName/:articleId/delete', (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndDelete(articleId)
    .then(() => res.redirect('/articles'))
    .catch(err => next(err))
})






///////////////////////FONCTION POUR ENLEVER LES ESPACES DANS L'URL////////////////////

// function slugify(str){
//   // ex str : "test 2"
//   let result = str.replace(' ', '-')
//   return result
// } 


module.exports = router