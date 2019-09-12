const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');

var request = require('request');
const bodyParser = require('body-parser');
const sql = require("msnodesqlv8");
 
const connectionString = "server=LAPTOP-ACER-573;Database=Workout;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/crrnt_wrkt',function(req,res){

    var query = "select * from WRKT_LOG where Data = (select Max(Data) from WRKT_LOG);";
    console.log(query);
  
    sql.query(connectionString, query, (err, rows) => {
        console.log(rows);
    
        var query2 = "select * from WRKT_PLAN;";
        console.log(query2);

        sql.query(connectionString, query2, (err, rows2) => {
            console.log(rows2);
            res.render('current_wrkt', {result: rows,result2: rows2});
            /*var query3 = "select * from WRKT_PLAN;";
            console.log(query3);
    
            sql.query(connectionString, query2, (err, rows2) => {
                console.log(rows2);
                //res.render('current_wrkt', {result: rows,result2: rows2});   */

        });

       
    });
});




app.get('/query',function(req,res){
    console.log(req.query["selectbox"]);
    var table = req.query["selectbox"];

    var query = "select DTYPE from " + table +";";
    console.log(query);

    sql.query(connectionString, query, (err, rows) => {
      console.log(rows);
    res.render('exercices', {result: rows});
    });
});


app.post('/insrt',function(req,res){
  console.log(req.body.search);
  var exerc = req.body.search;

  var  query = "Insert into EXERCICES (DTYPE) values ('" + exerc + "');";
  console.log(query);

      sql.query(connectionString, query, (err, results) => {
            if (err){
              res.send(err);
            }else{
              res.send('Rekord dodany do bazy');
            };
        });
});


app.get('/dlt',function(req,res){
  console.log(req.query.search);
  var exerc = req.query.search;

  var  query = "delete from EXERCICES where DTYPE = '" + exerc + "';";
  console.log(query);

      sql.query(connectionString, query, (err, results) => {
            if (err){
              res.send(err);
            }else{
              res.send('Rekord usunięty z bazy');
            };
        });
});

    
    
    
    
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');