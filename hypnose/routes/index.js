const express = require('express');
const router  = express.Router();


//////////////////////////////// GET home page ///////////////////////////////////////////////

router.get('/', (req, res, next) => {
  res.render('main/homepage');
});


//////////////////////////////// GET page a propos ///////////////////////////////////////////////

router.get('/fabienne-ilic', (req, res, next) => {
  res.render('main/fabienne-ilic');
});



module.exports = router;
