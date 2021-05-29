require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const flash = require('connect-flash');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User.js')


mongoose
.connect('mongodb://localhost/hypnose', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();

app.use(flash())
//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: false // <== false if you don't want to save empty session object to the store
  })
);

passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
 
passport.use(new LocalStrategy(
  {
    usernameField: 'username', 
    passwordField: 'password' 
  },
   function(email, password, done) {
    User.findOne({ email })
    .then(user => {
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Email incorrect' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }

      done(null, user);
    })
    .catch(err => done(err));
}
)
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Les routes

////////routes homepages et a propos//////////////////
const index = require('./routes/index');
app.use('/', index);

/////////////routes auth//////////////////////
const authRouter = require('./routes/auth');
app.use('/', authRouter);

/////////////routes metiers//////////////////////
const metierRouter = require('./routes/metiers');
app.use('/', metierRouter);

/////////////routes articles//////////////////////
const articleRouter = require('./routes/articles');
app.use('/', articleRouter);


module.exports = app;
