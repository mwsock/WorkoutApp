const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');


//połączenie do mongodb
mongoose.connect('mongodb://localhost/WRKT_LOG',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false 
});

  const WRKTschema = new mongoose.Schema({
    Data: {type:Date}, 
    RodzajTreningu: {type:String}, 
    DzienTreningowy:{type:Number}, 
    NazwaCwiczenia:{type:String}, 
    IloscSerii:{type:Number}, 
    IloscPowtorzen:{type:Number}, 
    Objetosc: {type:Number}
  });
  const wrkt = mongoose.model('WRKT', WRKTschema);

  const exerciseSchema = new mongoose.Schema({
    dtype: {type:String}
  });
  const exercise = mongoose.model('exercice', exerciseSchema);

  const planSchema = new mongoose.Schema({
    _id: {type:String},
    wrktPlan: {type:String},
    cDATE: {type: Date}
  });
  const wrktPlan = mongoose.model('plan', planSchema);

  const templateSchema = new mongoose.Schema({
    WrktNameId: {type:String},
    WrktDay: {type:Number}, 
    exerciseId: [{}]
  });
  const wrktTemplate = mongoose.model('template', templateSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','ejs');


app.get('/', function(req, res) {

  var query = "select format(Data,'dd.MM.yyyy') as Data, RodzajTreningu, DzienTreningowy, NazwaCwiczenia, count(NumerSerii) as IloscSerii, count(IloscPowtorzen) as IloscPowtorzen, \
  sum(Ciezar*IloscPowtorzen) as Objetosc from WRKT_LOG where Data = (select MAX(Data) from WRKT_LOG) group by format(Data,'dd.MM.yyyy'), RodzajTreningu, DzienTreningowy, NazwaCwiczenia \
  order by Objetosc desc;"  //console.log(query);


      
      wrkt.find({}, function(err, wLog){
          if(err){
            console.log('error')
          }else{
            res.render('index' , {result: wLog});
          }
      });

});

app.get('/crrnt_wrkt',function(req,res){

    wrktPlan.find({},function(err,rows){
          if(err){
            console.log(error)
          }else{
            res.render('current_wrkt', {result: rows}); 
          }
        });
       
    });

  /*app.get('/:NazwaCwiczenia',function(req,res){

    let NazwaCwiczenia = req.params['NazwaCwiczenia'];

    query = "select NazwaCwiczenia, NumerSerii, IloscPowtorzen, Ciezar from WRKT_LOG\
             where Data = (select MAX(Data) from WRKT_LOG) and NazwaCwiczenia = '"+ NazwaCwiczenia +"' order by NumerSerii asc;"

    sql.query(connectionString, query, (err, rows) => {
      
      res.send(rows);   
      console.log(rows);
    });


  });  */



app.get('/addWrkt', function(req,res){

 // console.log(req.query);
   var WrktSchemaPlanId = req.query["WrktName"];
   var variantPlan = req.query["variant"];
   var query = "select p.DTYPE, ws.ID as SchemaId, ws.VARIANT as DzienTreningowy, ex.DTYPE as NazwaCwiczenia from WRKT_SCHEMA ws\
                inner join EXERCICES ex on ws.EXERCISE = ex.ID\
                inner join WRKT_PLAN p on p.ID = ws.ID_PLAN\
                where ws.ID_PLAN=" + WrktSchemaPlanId + " and ws.VARIANT= " + variantPlan +";";
    const values = req.query;
    const keys = Object.keys(values);

    sql.query(connectionString, query, (err, rows) => {
    //console.log(rows);
       res.render('new_wrkt', {result: rows, keys: keys, values: values});
    }); 
    
});

app.get("/addWrkt/:planId/:variantId", function(req,res){
console.log(req.params);
  var planId = req.params["planId"];
  var variantId = req.params["variantId"];
  var query = "select ws.ID as SchemaId, ws.VARIANT as DzienTreningowy, ex.DTYPE as NazwaCwiczenia from WRKT_SCHEMA ws\
               inner join EXERCICES ex on ws.EXERCISE = ex.ID\
               where ws.ID_PLAN=" + planId + " and ws.VARIANT= " + variantId +";";

  wrktTemplate.findOne({"WrktNameId" : planId, "WrktDay" : variantId}, "-_id exerciseId", function(err,rows){
      if(err){
        console.log(error)
      }else{
        console.log(rows);

      
          let id = rows['exerciseId'];
          console.log(Object.values(id));
        
        
        
        
         
          exercise.findOne({"_id": id},"-_id dtype", function(err,rows2){
            if(err){
              console.log(error)
            }else{
              console.log(rows2);
              res.send({rows,rows2});
             
          }}); 


        //res.send(rows);
      }
    });


               //console.log(query);
   /* sql.query(connectionString, query, (err, rows) => {
      //console.log(rows);
      res.send(rows);
    }); */
});


app.get('/addWrkt/:id', function(req,res){

  var id = (req.params["id"])
 
    wrktTemplate.find({"WrktNameId" : id}, "-_id WrktDay", function(err,rows){
      if(err){
        console.log(error)
      }else{
        console.log(rows);
        res.send(rows);
      }
    });

    /*sql.query(connectionString, query, (err, rows) => {
        //console.log(rows);
        res.send(rows);
    });*/
});


app.get('/newWrktPlan', function(req,res){
        
  wrktPlan.find({},function(err,rows){
    if(err){
       console.log('error');
    }else{
     // console.log(rows);
      exercise.find({},function(err,rows2){
        if(err){
          console.log('error')
        }else{
         // console.log(rows2);
          res.render('newWrktPlan', {result: rows,result2: rows2});
        }
      });
    }
  });

});


app.post('/insrtWrkt',function(req,res){

  const {WrktId, NumerSerii, IloscPowtorzen, Ciezar} = req.body;
  const body = {WrktId, NumerSerii, IloscPowtorzen, Ciezar};
 
  //console.log(bd[0]);
  var i;

  for(i=0;i<body['WrktId'].length;i++){
    
   //console.log(body['Ciezar'][i]);

    var insrt = 'Insert into SETS_REPS (ID_SCHEMA,SETNUMBER,REPNUMBER,WEIGHT) values (' + body['WrktId'][i] +','+ body['NumerSerii'][i] +','+ body['IloscPowtorzen'][i] +','+ body['Ciezar'][i] +');'
    
    //console.log(insrt);

        sql.query(connectionString, insrt, (err, results) => {
          if (err){
              res.send(err);
                  };
        
        }); 
     
      };
  
    
   
  res.redirect('/crrnt_wrkt');
});


app.post('/insrtWrktPlan',function(req,res){

     let name = req.body['WrktName']
     let day = req.body['DzienTreningowy']
     let exec = req.body['Cwiczenie']
      
      const newTemplate = {
        WrktNameId: name,
        WrktDay: day,
        exerciseId: exec
      };
    //console.log(newTemplate);
    wrktTemplate.create(newTemplate, function(err, newlyCreated){
        if(err){
          console.log(err)
        }else{
          console.log('OK!')
        }
      });

  res.redirect('/newWrktPlan');

});




app.get('/exercices',function(req,res){

    exercise.find({},function(err,rows){
      if(err){
        console.log('error')
      }else{
        res.render('exercices', {result: rows, info:''});
      }
    });
    
    
});


app.post('/insrt',function(req,res){
  //console.log(req.body.search);
  const exerc = req.body.search;
  let newExercise = {dtype: exerc};

  exercise.create(newExercise, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      
      exercise.find({},function(err,rows){
        if(err){
          console.log(err)
        }else{
          res.render('exercices', {result: rows, info:'Ćwiczenie zostało dodane!'});
        }
      });
    }
  });

});


app.get('/dlt',function(req,res){
  //console.log(req.query.search);
  const exerc = req.query.search;
  let newExercise = {dtype: exerc};

  exercise.findOneAndRemove(newExercise, function(err, crrntlyRemoved){
    if(err){
      console.log(err)
    }else{
      
      exercise.find({},function(err,rows){
        if(err){
          console.log(err)
        }else{
          res.render('exercices', {result: rows, info:'Ćwiczenie zostało usunięte!'});
        }
      });
    }
  });

});

    
    
    
    
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');