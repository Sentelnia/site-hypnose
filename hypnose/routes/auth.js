const { Router } = require('express');
const router = new Router();
const User = require('../models/User.js')

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)

// Add passport
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');


////////////SIGNUP//////////////////////

router.get('/inscription', (req, res) => res.render('auth/inscription'));


//-----------1. créer la session -------------//
//-----------2. validation mdp (créer un nouveau champs) ----------------//
router.post('/inscription', (req, res, next) => {
  const { name, last_name, email, tel, password } = req.body;


  //si pas de mail, pas de password , pas de name et pas last_name, on rend le formulaire d'inscription
  if (!name || !last_name || !email || !tel || !password ) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, salt)
  console.log(`Password hash: ${hashedPassword}`);  

  User.create({
    name: name,
    last_name: last_name,
    email: email,
    tel: tel,
    password: hashedPassword
    })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
        res.redirect('/')
      })
      .catch(error => next(error));
});


////////////LOGIN//////////////////////

router.get('/login', (req, res, next) => {
  res.render('auth/login', { errorMessage: req.flash('error') }); // !!!
});


//-----------2. attention mail en minuscule à configurer -------------//
//-----------2. créer la session et les cookies -------------//
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
  })
);


////////////LOGOUT//////////////////////

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;