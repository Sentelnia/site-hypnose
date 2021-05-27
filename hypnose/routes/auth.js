const { Router } = require('express');
const router = new Router();
const User = require('../models/User.js')

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)


////////////SIGNUP//////////////////////

router.get('/inscription', (req, res) => res.render('auth/signup'));


//-----------1. créer la session -------------//
//-----------2. validation mdp (créer un nouveau champs) ----------------//
router.post('/signup', (req, res, next) => {
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
        // req.session.currentUser = userFromDB;
        res.redirect('/')
      })
      .catch(error => next(error));
});



module.exports = router;