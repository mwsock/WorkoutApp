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

    var query = "select format(Data,'dd.MM.yyyy') as Data,RodzajTreningu,DzienTreningowy,NazwaCwiczenia,NumerSerii,IloscPowtorzen,Ciezar from WRKT_LOG where Data = (select MAX(Data) from WRKT_LOG);";
    //console.log(query);
  
    sql.query(connectionString, query, (err, rows) => {
        //console.log(rows);
    
        var query2 = "select * from WRKT_PLAN;";
        //console.log(query2);

        sql.query(connectionString, query2, (err, rows2) => {
            //console.log(rows2);
            res.render('current_wrkt', {result: rows,result2: rows2});

        });

       
    });
});


app.get('/addWrkt', function(req,res){

   var WrktSchemaPlanId = req.query["WrktName"];
   var query = "select * from CUSTOM_WRKT_DESC where SchemaPlanID=" + WrktSchemaPlanId + ";";

   sql.query(connectionString, query, (err, rows) => {
    //console.log(rows);
    res.render('new_wrkt', {result3: rows});
    });
});


app.get('/newWrktPlan', function(req,res){

  var query = "select * from WRKT_PLAN;";
        

        sql.query(connectionString, query, (err, rows) => {

          var query2 = "select * from EXERCICES;";

          sql.query(connectionString, query2, (err, rows2) => {
            //console.log(rows2);
            res.render('newWrktPlan', {result: rows,result2: rows2});

          });
 
        });

});


app.post('/insrtWrkt',function(req,res){


  var i;
  for(i=0;i<req.body['WrktId'].length;i++){
    var insrt = 'Insert into SETS_REPS (ID_SCHEMA,SETNUMBER,REPNUMBER,WEIGHT) values (' +req.body['WrktId'][i]+','+req.body['NumerSerii'][i]+','+req.body['IloscPowtorzen'][i]+','+req.body['Ciezar'][i] +');'

      console.log(req.body['WrktId'].length, i);

        sql.query(connectionString, insrt, (err, results) => {
          if (err){
              res.send(err);
                  };
        
        });

  };
   
    res.redirect('/crrnt_wrkt');
});


app.post('/insrtWrktPlan',function(req,res){

var i;
  for(i=0;i<req.body['DzienTreningowy'].length;i++){
    var insrt = 'Insert into WRKT_SCHEMA (ID_PLAN,VARIANT,EXERCISE) values (' +req.body['WrktName']+','+req.body['DzienTreningowy'][i]+','+req.body['Cwiczenie'][i]+');'

      console.log(insrt);

        sql.query(connectionString, insrt, (err, results) => {
          if (err){
              res.send(err);
                  };
        
        });

  }; 

  res.send('Dodano trening');

});


app.get('/query',function(req,res){
    console.log(req.query["selectbox"]);
    var table = req.query["selectbox"];

    var query = "select DTYPE from " + table +";";
    //console.log(query);

    sql.query(connectionString, query, (err, rows) => {
      //console.log(rows);
    res.render('exercices', {result: rows});
    });
});


app.post('/insrt',function(req,res){
  //console.log(req.body.search);
  var exerc = req.body.search;

  var  query = "Insert into EXERCICES (DTYPE) values ('" + exerc + "');";
  //console.log(query);

      sql.query(connectionString, query, (err, results) => {
            if (err){
              res.send(err);
            }else{
              res.send('Rekord dodany do bazy');
            };
        });
});


app.get('/dlt',function(req,res){
  //console.log(req.query.search);
  var exerc = req.query.search;

  var  query = "delete from EXERCICES where DTYPE = '" + exerc + "';";
  //console.log(query);

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