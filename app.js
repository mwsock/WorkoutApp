const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

const csp = require('helmet-csp');
app.use(csp({
directives: {
  defaultSrc: ["'self'", 'http://localhost:3000'],
  scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'"],
  frameSrc: ["'none'"],
},
setAllHeaders: false, // set to true if you want to set all headers
safari5: false // set to true if you want to force buggy CSP in Safari 5
}));


//połączenie do mongodb
mongoose.connect('mongodb://localhost/WRKT_LOG',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false 
});


  const WRKTschema = new mongoose.Schema({},{strict:false });

  const wrkt = mongoose.model('wrkt', WRKTschema);

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
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine','ejs');


app.get('/', function(req, res) {

  let wrktObj = '';
  let cwiczenia = '';
  let wrktDate = '';
  let planName = '';

                      //latest entry filter
      wrkt.find({},{},{sort:{_id:-1}}, function(err, wLog){
          if(err){
            console.log('error');
          }else{
           if(typeof wLog[0] === 'undefined' || wLog === null) {
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia});
           }else{
            //console.log(wLog);
            let wrktObj = JSON.parse(JSON.stringify(wLog[0]));

            let planName = wrktObj.wlog['RodzajTreningu'];
            let cwiczenia = wrktObj.wlog['Cwiczenia'];

            let date = new Date(wrktObj.CDate);
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            let wrktDate = date.toLocaleDateString('pl-PL', options);

            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia});
           };  
          };
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


app.post('/addWrkt', function(req,res){

 console.log(req.body);
 const wrktLog = req.body;

  wrkt.create(wrktLog, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      console.log('OK!')
    }
  });
 

});



app.get('/edit_wrkt',function(req,res){
  
  let wrktDay = '';
  let wrktDate = '';
  var planName = '';

                      
      wrkt.find({}, function(err, wLog){
          if(err){
            console.log('error');
          }else{
           if(typeof wLog[0] === 'undefined' || wLog === null) {
            res.render('edit_wrkt' , {wrktDay: wrktDay, planName: planName, wrktDate:wrktDate});
           }else{
            console.log(wLog.length);

            let recordPlan = JSON.parse(JSON.stringify(wLog));
            res.render('edit_wrkt',{recordPlan: recordPlan});
           };  
          }; 
      });
      
});


app.get("/addWrkt/:planId/:variantId", function(req,res){
//console.log(req.params);
  var planId = req.params["planId"];
  var variantId = req.params["variantId"];

  wrktTemplate.findOne({"WrktNameId" : planId, "WrktDay" : variantId}, "-_id exerciseId", function(err,rows){
      if(err){
        console.log(error)
      }else{
       // console.log(rows);

      
          let id = rows['exerciseId'];
          //console.log(Object.values(id));
     
          exercise.find({"_id": id},"-_id dtype", function(err,rows2){
            if(err){
              console.log(error)
            }else{
              //console.log(rows2);
            res.send({rows2});
             
            }}); 
          }
    });
});


app.get('/addWrkt/:id', function(req,res){

  var id = (req.params["id"])
 
    wrktTemplate.find({"WrktNameId" : id}, "-_id WrktDay", function(err,rows){
      if(err){
        console.log(error)
      }else{
        //console.log(rows);
        res.send(rows);
      }
    });

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




app.post('/insrtPlan',function(req,res){
  //console.log(req.body.search);
  let plan = req.body.plan;
  console.log(plan);
  let newPlan = {_id: mongoose.Types.ObjectId(),wrktPlan: plan,cDATE: Date()};
                

  wrktPlan.create(newPlan, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      
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
    }
  });

});


app.get('/deletePlan',function(req,res){
  //console.log(req.query.search);
  const plan = req.query.plan;
  console.log(plan);
  let removedPlan = {wrktPlan: plan};

  wrktPlan.findOneAndRemove(removedPlan, function(err, crrntlyRemoved){
    if(err){
      console.log(err)
    }else{
      
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
    }
  });

});

    
    
    
    
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');