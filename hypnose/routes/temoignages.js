const { Router } = require("express");
const router = new Router();


const Temoignage = require("../models/Temoignage.js");


////////////LISTE DES TEMOIGNAGES//////////////////

router.get('/temoignages', (req , res, next) => {
  Temoignage.find()
  .then(allTemoignagesFromDB => {
    res.render('temoignages/All-temoignages', {temoignages : allTemoignagesFromDB})
  })
  .catch(err => next(err))
})



////////////CREER UN TEMOIGNAGE////////////////////

router.get('/temoignages/create', (req, res) => {
  res.render('temoignages/create')
})

router.post('/temoignages/create', (req, res, next) => {
  const { type_seance, message, signature } = req.body;

  Temoignage.create({type_seance, message, signature})
  .then(() => res.redirect('/temoignages'))
  .catch(err => next(err))
})



////////////EDITER UN TEMOIGNAGE////////////////////

router.get('/temoignages/:temoignageId/edit', (req, res) =>{
  const { temoignageId } = req.params;

  Temoignage.findById(temoignageId)
  .then(temoignageToEdit => {
    res.render('temoignages/edit',{temoignage : temoignageToEdit})
  })
  .catch(err => next(err))
})

router.post('/temoignages/:temoignageId/edit', (req, res,next) =>{
  const { temoignageId } = req.params;
  const { type_seance, message, signature } = req.body;
  console.log(req.body)

  Temoignage.findByIdAndUpdate(temoignageId, {type_seance, message, signature})
    .then(()=> {
      console.log('yop')
      res.redirect(`/temoignages`)})
    .catch(err => next(err))
})



////////////SUPPRIMER UN TEMOIGNAGE////////////////////

router.post('/temoignages/:temoignageId/delete', (req, res, next) => {
  const { temoignageId } = req.params;

  Temoignage.findByIdAndDelete(temoignageId)
    .then(() => res.redirect('/temoignages'))
    .catch(err => next(err))
})




module.exports = router