const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./public/scripts/user');
const methodOverride = require('method-override');
const expressSession = require('express-session');

//proces.env.DATABASEURL
mongoose.connect('mongodb://localhost/WRKT_LOG',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false 
});

const indexRoute = require('./routes/index');
const exerciseRoutes = require('./routes/exercices');
const loginRoutes = require('./routes/login');
const templateRoutes = require('./routes/templates');
const planRoutes = require('./routes/plans');
const wrktRoutes = require('./routes/wrkt');
const editWrktRoutes = require('./routes/editWrkt');


app.use(express.static(path.join(__dirname, 'public')));


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(methodOverride('_method'));
app.use(expressSession({
  secret: "WorkoutApp",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine','ejs');


app.use(loginRoutes);
app.use('/exercices',exerciseRoutes);
app.use('/template',templateRoutes);
app.use('/plan',planRoutes);
app.use('/wrkt',wrktRoutes);
app.use('/wrkt',editWrktRoutes);
app.use(indexRoute);



app.use('/', router);
app.listen(process.env.PORT || 3000);

console.log('PORT' + (process.env.PORT || '3000'));

