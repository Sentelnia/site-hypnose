const {
  Router
} = require("express");
const router = new Router();

/////////////////////NODEMAILER///////////////////

const nodemailer = require('nodemailer');


//---------transformer avec un if (pour prod ou mail dev)------------
let transporter = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true,
}, );

// let transporter = nodemailer.createTransport(process.env.SMTP_URI)



////////////HYPNOTHERAPIE//////////////////

router.get('/hypnotherapeute', (req, res) => {
  res.render('metiers/hypno')
})



////////////SOPHROLOGIE//////////////////

router.get('/sophrologue', (req, res) => {
  res.render('metiers/sophro')
})



////////////MAGNETISME//////////////////

router.get('/magnetiseur', (req, res) => {
  res.render('metiers/magne')
})



////////////FORMULAIRE DE RDV//////////////////

router.get("/prendre-rdv", (req, res) => {
  if (!req.user) {
    res.render("metiers/rdv");
    return;
  }
  res.render("metiers/rdv", {
    user: req.user
  });
});


//-----------recupération du formulaire de rdv----------------//

router.post("/prendre-rdv", (req, res, next) => {
  transporter.sendMail({
      from: req.body.email, // sender address
      to: "alexandre.capaldi@hotmail.fr", // list of receivers
      subject: req.body.type_seance, // Subject line
      text: req.body.message
    })
    .then(() => {
      req.flash('rdv', 'Votre demande de rendez-vous a été transmise à la practicienne')
      res.redirect('/')
    })
    .catch(err => next(err))
})



module.exports = router;