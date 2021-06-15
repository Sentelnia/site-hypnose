const {
  Router
} = require("express");
const router = new Router();

const Article = require("../models/Article.js");
const User = require("../models/User.js");
const fileUploader = require("../configs/cloudinary.config");

// require slugify

const slugify = require("slugify");



////////////LISTE DES ARTICLES////////////////////

router.get("/articles", (req, res, next) => {


  Article.find().sort({
      createdAt: -1
    })
    .then((allArticleFromDB) => {
      allArticleFromDB.forEach((article) => {
        article.title2 = slugify(article.title);
        article.createdAt2 = formatDate(article.createdAt)
      });
      if (!req.isAuthenticated()) {
        res.render("articles/All-articles", {
          articles: allArticleFromDB,

        });
        return;
      } else if (req.isAuthenticated() && req.user.role === "ADMIN") {
        res.render("articles/All-articles", {
          articles: allArticleFromDB,
          admin: "admin",

        });
        return;
      } else {
        res.render("articles/All-articles", {
          articles: allArticleFromDB,
        });
      }
    })
    .catch((err) => next(err));
});

////////////CREER UN ARTICLE////////////////////

router.get("/articles/create", checkRoles("ADMIN"), (req, res) => {
  res.render("articles/create");
});

router.post(
  "/articles/create",
  fileUploader.single("image"),
  (req, res, next) => {
    const {
      title,
      description,
      video
    } = req.body;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      // Condition sans image
      if (req.file === undefined) {
        Article.create({
            title,
            description,
            video,
            like: 0,
          })
          .then(() => res.redirect("/articles"))
          .catch((err) => next(err));
        return;
        // Condition avec image
      } else {
        Article.create({
            title,
            description,
            video,
            imageUrl: req.file.path,
            like: 0,
          })
          .then(() => res.redirect("/articles"))
          .catch((err) => next(err));
      }
    }
  }
);

////////////EDITER UN ARTICLE////////////////////

router.get(
  "/articles/:articleId/edit",
  checkRoles("ADMIN"),
  (req, res, next) => {
    const {
      articleId
    } = req.params;

    Article.findById(articleId)
      .then((articleToEdit) => {
        res.render("articles/edit", {
          article: articleToEdit,
        });
      })
      .catch((err) => next(err));
  }
);

router.post(
  "/articles/:articleId/edit",
  fileUploader.single("image"),
  (req, res, next) => {
    const {
      articleId
    } = req.params;
    const {
      title,
      description,
      video,
      like
    } = req.body;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      // Condition sans image
      if (req.file === undefined) {
        Article.findByIdAndUpdate(articleId, {
            title,
            description,
            video,
            like,
            imageUrl: "",
          })
          .then((updatedArticle) => {
            updatedArticle.title2 = slugify(updatedArticle.title);
            res.redirect(
              `/articles/${updatedArticle.title2}/${updatedArticle.id}`
            );
          })
          .catch((err) => next(err));
        return;
        // Condition avec image
      } else {
        Article.findByIdAndUpdate(articleId, {
            title,
            description,
            video,
            imageUrl: req.file.path,
            like,
          })
          .then((updatedArticle) => {
            updatedArticle.title2 = slugify(updatedArticle.title);
            res.redirect(
              `/articles/${updatedArticle.title2}/${updatedArticle.id}`
            );
          })
          .catch((err) => next(err));
      }
    }
  }
);

////////////SUPPRIMER UN ARTICLE EN LISTE////////////////////

router.post(
  "/articles/:articleId/delete",
  checkRoles("ADMIN"),
  (req, res, next) => {
    const {
      articleId
    } = req.params;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      Article.findByIdAndDelete(articleId)
        .then(() => res.redirect("/articles"))
        .catch((err) => next(err));
    }
  }
);

////////////AJOUTE UN ARTICLE LIKE DANS LE PROFIL DU USER ET INCREMENTE LE LIKE////////////////////

router.post("/articles/:articleId/like", (req, res, next) => {
  const {
    articleId
  } = req.params;

  if (!req.isAuthenticated()) {
    Article.findById(articleId)
      .then((article) => {
        article.like += 1
        console.log(article.like)
        article.save()
          .then(() => {
            res.redirect(`/articles`)
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
    return;

  } else {
    const {
      articles_like
    } = req.user;

    Article.findById(articleId)
      .then((article) => {
        article.like += 1
        article.save()
          .then((article) => {
            User.findById(req.user.id)
              .then((user) => {
                if (user.articles_like.includes(article._id)) {
                  res.redirect(`/articles`);
                  return;
                } else {
                  article.title2 = slugify(article.title);
                  articles_like.unshift(article);
                  User.findByIdAndUpdate(req.user.id, {
                      articles_like,
                    })
                    .then(() => {
                      res.redirect(`/articles`);
                    })
                    .catch((err) => next(err));
                }
              })
              .catch((err) => next(err));
          })
      })
      .catch((err) => next(err));
    return;
  }
});

////////////SUPPRIME UN ARTICLE LIKE DANS LE PROFIL DU USER////////////////////

router.post("/articles/:articleId/dislike", (req, res, next) => {
  const {
    articleId
  } = req.params;

  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  } else {
    const {
      articles_like
    } = req.user;

    Article.findById(articleId)
      .then((article) => {
        article.title2 = slugify(article.title);
        articles_like.splice((articles_like.indexOf(article._id)), 1);
        User.findByIdAndUpdate(req.user.id, {
            articles_like,
          })
          .then(() => {
            res.redirect(`/dashboard`);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
    return;
  }
});

////////////DETAIL POUR UN ARTICLE////////////////////

router.get("/articles/:articleName/:articleId", (req, res, next) => {
  const {
    articleId
  } = req.params;


  Article.findById(articleId)
    .then((article) => {
      res.render("articles/article-details", {
        article: article,
      });
    })

    .catch((err) => next(err));
});

////////////EDITER UN ARTICLE EN DETAIL////////////////////

router.get(
  "/articles/:articleName/:articleId/edit",
  checkRoles("ADMIN"),
  (req, res) => {
    const {
      articleId
    } = req.params;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      Article.findById(articleId)
        .then((articleToEdit) => {
          articleToEdit.title2 = slugify(articleToEdit.title);
          res.render("articles/edit", {
            article: articleToEdit,
          });
        })
        .catch((err) => next(err));
    }
  }
);

////////////SUPPRIMER UN ARTICLE EN DETAIL////////////////////

router.post(
  "/articles/:articleName/:articleId/delete",
  checkRoles("ADMIN"),
  (req, res, next) => {
    const {
      articleId
    } = req.params;

    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } else {
      Article.findByIdAndDelete(articleId)
        .then(() => res.redirect("/articles"))
        .catch((err) => next(err));
    }
  }
);

///////////////////////FONCTION POUR ENLEVER LES ESPACES DANS L'URL////////////////////

// function slugify(str){
//   // ex str : "test 2"
//   let result = str.replace(' ', '-')
//   return result
// }

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


///////////////////////FONCTION POUR LES DATES////////////////////

function formatDate(date) {

  //1.recuperer createdat en parametre puis le couper sur les 10 premiers caractères
  let strDate = JSON.stringify(date)
  let cutDate = strDate.slice(1, 11)

  //2.inverse l'année et le jour
  let arrDate = cutDate.split('-')
  arrDate.reverse()
  //----------------Version 2.0  switch les mois------------------
  //3. on remplace les '-' par des '/'
  return arrDate.join('/')


}


module.exports = router;