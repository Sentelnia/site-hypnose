const {
  Router
} = require("express");
const router = new Router();
const User = require("../models/User.js");
const Article = require("../models/Article.js");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Add passport
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");




////////////SIGNUP//////////////////////

router.get("/inscription", (req, res) => res.render("auth/inscription"));

//-----------1. validation mdp (créer un nouveau champs) ----------------//
router.post("/inscription", (req, res, next) => {

  const {
    name,
    last_name,
    email,
    tel,
    password
  } = req.body;

  //si pas de mail, pas de password , pas de name et pas last_name, on rend le formulaire d'inscription
  if (!name || !last_name || !email || !password) {
    res.render("auth/inscription", {
      errorMessage: "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }
  let newMail = email.toLowerCase()

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/inscription', {
        errorMessage: 'Le mot de passe doit contenir au moins 6 charactères, au moins 1 chiffre et au moins une minuscule et une majuscule.'
      });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(`Password hash: ${hashedPassword}`);

  User.create({
      name: name,
      last_name: last_name,
      email: newMail,
      tel: tel,
      password: hashedPassword,
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      req.flash('subscribed', 'Votre compte a bien été crée ! Bienvenu')
      res.redirect("/");


    })
    .catch((error) => next(error));
});




////////////LOGIN//////////////////////

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    errorMessage: req.flash("error")
  });
});


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);



////////////LOGOUT//////////////////////

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});




////////////DASHBOARD - PRIVATE USER//////////////////////

router.get("/dashboard", (req, res) => {
  if (!req.user) {
    res.render("auth/login", {
      errorMessage: "Vous devez vous identifier pour acceder à ce contenu",
    });
    return;
  }
  User.findOne({
      _id: req.user.id
    })
    .populate('articles_like')
    .then((user) => {
      if (req.isAuthenticated() && req.user.role === "ADMIN") {
        res.render('auth/dashboard', {
          user: user,
          admin: "admin"
        })
        return;
      } else {
        res.render("auth/dashboard", {
          user: user
        })
      }
    })

    .catch(err => next(err))
});

//---------edit infos perso-------------//
router.post("/dashboard", (req, res, next) => {
  const password = req.body.password;

  //si le mdp est ok
  if (bcrypt.compareSync(password, req.user.password)) {
    User.update({
        _id: req.user.id
      }, {
        $set: {
          name: req.body.name,
          last_name: req.body.last_name,
          email: req.body.email,
          tel: req.body.tel,
        },
      })
      .then(() => res.redirect("/dashboard"))
      .catch((err) => next(err));

    //si mot de passe pas ok
  } else {
    res.render("auth/dashboard", {
      errorMessage: 'Mot de passe non valide',
      user: req.user
    })
  }
});



////////////SUPRESSION DE COMPTE//////////////////////

router.post("/dashboard/:userId/delete", (req, res, next) => {
  const {
    userId
  } = req.params
  console.log(userId)
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  } else {
    User.findByIdAndDelete(userId)
      .then(() => res.render('main/homepage', {
        deleteMessage: 'Votre compte a bien été supprimé'
      }))
      .catch(err => next(err))
  }
})




module.exports = router;