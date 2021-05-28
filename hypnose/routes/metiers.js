const { Router } = require("express");
const router = new Router();


////////////HYPNOTHERAPIE//////////////////

router.get('/hypnotherapeute', (req, res) =>{
  res.render('metiers/hypno')
})



////////////SOPHROLOGIE//////////////////

router.get('/sophrologue', (req, res) =>{
  res.render('metiers/sophro')
})



////////////HYPNOTHERAPIE//////////////////

router.get('/magnetiseur', (req, res) =>{
  res.render('metiers/magne')
})



module.exports = router;