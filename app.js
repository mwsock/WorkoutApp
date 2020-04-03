const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./public/user');
const methodOverride = require('method-override');
const expressSession = require('express-session');

mongoose.connect('mongodb+srv://tstUser1:tstUser1@cluster0-miupn.mongodb.net/test?retryWrites=true&w=majority',{
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
app.use(templateRoutes);
app.use(planRoutes);
app.use(wrktRoutes);
app.use(editWrktRoutes);
app.use(indexRoute);



app.use('/', router);
// app.listen(process.env.port || 3000);
app.listen(3000, '0.0.0.0');

console.log(process.env.port);
