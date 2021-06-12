const { Router } = require("express");
const router = new Router();

const Temoignage = require("../models/Temoignage.js");

////////////LISTE DES TEMOIGNAGES//////////////////

router.get("/temoignages", (req, res, next) => {
  Temoignage.find()
    .then((allTemoignagesFromDB) => {
      if (req.isAuthenticated() && req.user.role === "ADMIN") {
        res.render("temoignages/All-temoignages", {
          temoignages: allTemoignagesFromDB,
          admin : "admin",
        });
        return;
      } else {
        res.render("temoignages/All-temoignages", {
          temoignages: allTemoignagesFromDB,
        });
      }
    })
    .catch((err) => next(err));
});

////////////CREER UN TEMOIGNAGE////////////////////

router.get("/temoignages/create", checkRoles("ADMIN"), (req, res) => {
  res.render("temoignages/create");
});

router.post("/temoignages/create", (req, res, next) => {
  const { type_seance, message, signature } = req.body;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  } else {
    Temoignage.create({ type_seance, message, signature })
      .then(() => res.redirect("/temoignages"))
      .catch((err) => next(err));
  }
});

////////////EDITER UN TEMOIGNAGE////////////////////

router.get(
  "/temoignages/:temoignageId/edit",
  checkRoles("ADMIN"),
  (req, res) => {
    const { temoignageId } = req.params;

    Temoignage.findById(temoignageId)
      .then((temoignageToEdit) => {
        res.render("temoignages/edit", { temoignage: temoignageToEdit });
      })
      .catch((err) => next(err));
  }
);

router.post("/temoignages/:temoignageId/edit", (req, res, next) => {
  const { temoignageId } = req.params;
  const { type_seance, message, signature } = req.body;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  } else {
    Temoignage.findByIdAndUpdate(temoignageId, {
      type_seance,
      message,
      signature,
    })
      .then(() => {
        console.log("yop");
        res.redirect(`/temoignages`);
      })
      .catch((err) => next(err));
  }
});

////////////SUPPRIMER UN TEMOIGNAGE////////////////////

router.post(
  "/temoignages/:temoignageId/delete",
  checkRoles("ADMIN"),
  (req, res, next) => {
    const { temoignageId } = req.params;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      Temoignage.findByIdAndDelete(temoignageId)
        .then(() => res.redirect("/temoignages"))
        .catch((err) => next(err));
    }
  }
);

///////////////////////FONCTION POUR LES ROLES////////////////////

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
      return next();
    } else {
      res.redirect("/login");
    }
  };
}

module.exports = router;
