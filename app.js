const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const indexRoute = require('./routes/index');
const exerciseRoutes = require('./routes/exercices');
const loginRoutes = require('./routes/login');
const templateRoutes = require('./routes/templates');
const planRoutes = require('./routes/plans');
const wrktRoutes = require('./routes/wrkt');
const editWrktRoutes = require('./routes/editWrkt');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(methodOverride('_method'));

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

