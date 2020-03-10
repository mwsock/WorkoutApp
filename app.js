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


//połączenie do mongodb
mongoose.connect('mongodb://localhost/WRKT_LOG',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false 
});


  const WRKTschema = new mongoose.Schema({},{strict:false });

  const wrkt = mongoose.model('wrkt', WRKTschema);

  const exerciseSchema = new mongoose.Schema({
    dtype: {type:String},
    User :{type:String}
  });
  const exercise = mongoose.model('exercice', exerciseSchema);

  const planSchema = new mongoose.Schema({
    _id: {type:String},
    wrktPlan: {type:String},
    cDATE: {type: Date},
    User :{type:String}
  });
  const wrktPlan = mongoose.model('plan', planSchema);

  const templateSchema = new mongoose.Schema({
    WrktNameId: {type:String},
    WrktDay: {type:Number}, 
    exerciseId: [{}],
    User :{type:String}
  });
  const wrktTemplate = mongoose.model('template', templateSchema);

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

app.get('/', isLoggedIn , function(req, res) {

  let wrktObj = '';
  let cwiczenia = '';
  let wrktDate = '';
  let planName = '';
  let user = req.user.username;
  console.log(user);

                      //latest entry filter
      wrkt.find({'User' : user},{},{sort:{_id:-1}}, function(err, wLog){
          if(err){
            console.log('error');
          }else{
            let tstLog = wLog[0];
           if(typeof tstLog === 'undefined' || tstLog === null) {
            let user = '';
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
            //console.log(wLog);
           }else{
            //console.log(wLog);
            let wrktObj = JSON.parse(JSON.stringify(wLog[0]));

            let planName = wrktObj.wlog['RodzajTreningu'];
            let cwiczenia = wrktObj.wlog['Cwiczenia'];
            let user = req.user.username;

            let date = new Date(wrktObj.CDate);
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            let wrktDate = date.toLocaleDateString('pl-PL', options);
            console.log(user);
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
           };  
          };
      });
});

app.get('/crrnt_wrkt', isLoggedIn,function(req,res){

  let user = req.user.username;

    wrktPlan.find({'User' : user},function(err,rows){
          if(err){
            console.log(error)
          }else{
            res.render('current_wrkt', {result: rows}); 
          }
        });
       
    });


app.post('/addWrkt', isLoggedIn, function(req,res){

 console.log(req);
 const wrktLog = req.body;
 const user = req.user.username;

 wrktLog.User=user;

  wrkt.create(wrktLog, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      console.log('OK!')
    }
  });
 

});



app.get('/edit_wrkt', isLoggedIn, function(req,res){
  
  let wrktDay = '';
  let wrktDate = '';
  let planName = '';
  let user = req.user.username;

                      
      wrkt.find({'User' : user}, function(err, wLog){
          if(err){
            console.log('error');
          }else{
           if(typeof wLog[0] === 'undefined' || wLog === null) {
            res.render('edit_wrkt' , {wrktDay: wrktDay, planName: planName, wrktDate:wrktDate});
           }else{
            //console.log(wLog.length);

            let recordPlan = JSON.parse(JSON.stringify(wLog));
            res.render('edit_wrkt',{recordPlan: recordPlan});
           };  
          }; 
      });

});


app.get("/edit_selected_wrkt/:id", isLoggedIn, function(req,res){

  let id = req.params['id'];
  //console.log(id);

  wrkt.findById(id,function(err, wLog){

    let log = JSON.parse(JSON.stringify(wLog));
    //console.log(log.wlog['Cwiczenia']);
    res.render('edit_selected_wrkt', {wLog: log});
    //res.send(wLog);
  });

  
});


app.put("/edit_selected_wrkt/:id/update", isLoggedIn, function(req,res){

  let id = req.params['id'];
  // console.log("GOT IT:" + id);
  // console.log(req.body.wlog);

  let log = req.body.wlog;

  wrkt.findByIdAndUpdate(id, { wlog: log },function(err,result){
    if (err) { 
      res.send(err);
    } else {
     console.log('Updated!');
    }
  });
  
});


app.get('/deleteWrkt/:id',  isLoggedIn, function(req,res){
  //console.log(req.params.id);
  let id = req.params.id;


  wrkt.findByIdAndDelete(id, function(err, crrntlyRemoved){
    if(err){
      console.log(err)
    }else{
      console.log('succes');
    };
  });
});


app.get("/addWrkt/:planId/:variantId", isLoggedIn, function(req,res){
//console.log(req.params);
  let planId = req.params["planId"];
  let variantId = req.params["variantId"];
  let user = req.user.username;
  
  wrktTemplate.findOne({"WrktNameId" : planId, "WrktDay" : variantId, 'User':user}, "-_id exerciseId", function(err,rows){
      if(err){
        console.log(error)
      }else{
       // console.log(rows);

      
          let id = rows['exerciseId'];
          //console.log(Object.values(id));
     
          exercise.find({"_id": id, 'User':user},"-_id dtype", function(err,rows2){
            if(err){
              console.log(error)
            }else{
              //console.log(rows2);
            res.send({rows2});
             
            }}); 
          }
    });
});



app.get('/addWrkt/:id', isLoggedIn, function(req,res){

  let id = (req.params["id"])
  let user = req.user.username;

    wrktTemplate.find({"WrktNameId" : id, 'User':user}, "-_id WrktDay", function(err,rows){
      if(err){
        console.log(error)
      }else{
        //console.log(rows);
        res.send(rows);
      }
    });

});


app.get('/newWrktPlan', isLoggedIn, function(req,res){
  let user = req.user.username;

  wrktPlan.find({'User':user},function(err,rows){
    if(err){
       console.log('error');
    }else{
     // console.log(rows);
      exercise.find({'User':user},function(err,rows2){
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




app.post('/insrtWrktPlan', isLoggedIn, function(req,res){

     let name = req.body['WrktName']
     let day = req.body['DzienTreningowy']
     let exec = req.body['Cwiczenie']
     let user = req.user.username;
      
      const newTemplate = {
        WrktNameId: name,
        WrktDay: day,
        exerciseId: exec,
        User: user
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




app.get('/exercices', isLoggedIn, function(req,res){

  let user = req.user.username;

    exercise.find({'User':user},function(err,rows){
      if(err){
        console.log('error')
      }else{
        res.render('exercices', {result: rows, info:''});
      }
    });
    
    
});


app.post('/insrt', isLoggedIn, function(req,res){
  //console.log(req.body.search);
  const exerc = req.body.search;
  let user = req.user.username;
  let newExercise = {dtype: exerc, User:user};

  exercise.create(newExercise, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      
      exercise.find({'User':user},function(err,rows){
        if(err){
          console.log(err)
        }else{
          res.render('exercices', {result: rows, info:'Ćwiczenie zostało dodane!'});
        }
      });
    }
  });

});


app.get('/dlt',  isLoggedIn, function(req,res){
  //console.log(req.query.search);
  const exerc = req.query.search;
  let user = req.user.username;
  let newExercise = {dtype: exerc, User:user};

  exercise.findOneAndRemove(newExercise, function(err, crrntlyRemoved){
    if(err){
      console.log(err)
    }else{
      
      exercise.find({'User':user},function(err,rows){
        if(err){
          console.log(err)
        }else{
          res.render('exercices', {result: rows, info:'Ćwiczenie zostało usunięte!'});
        }
      });
    }
  });

});




app.post('/insrtPlan',  isLoggedIn, function(req,res){
  //console.log(req.body.search);
  let plan = req.body.plan;
  console.log(plan);
  let user = req.user.username;
  let newPlan = {_id: mongoose.Types.ObjectId(),wrktPlan: plan,cDATE: Date(),User:user};
                

  wrktPlan.create(newPlan, function(err, newlyCreated){
    if(err){
      console.log(err)
    }else{
      
        wrktPlan.find({'User':user},function(err,rows){
          if(err){
            console.log('error');
          }else{
          // console.log(rows);
            exercise.find({'User':user},function(err,rows2){
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


app.get('/deletePlan/:id',  isLoggedIn, function(req,res){
  //console.log(req.params.id);
  let id = req.params.id;


  wrktPlan.findByIdAndDelete(id, function(err, crrntlyRemoved){
    if(err){
      console.log(err)
    }else{
      console.log('succes');
    };
  });
});


app.get('/register',function(req,res){
  res.render('register', {message: ''});
});

app.post('/register',function(req,res){
  req.body.username;
  req.body.password;
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      let message = 'Użytkownik o podanej nazwie jest już zarejestrowany.';
      return res.render('register', {message: message});
    };
    passport.authenticate('local')(req,res,function(){
      res.redirect('/login');
    });
  });
});


app.get('/login',function(req,res){
  res.render('login');
  //console.log(res);
});

app.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/login');
});

app.post('/login',passport.authenticate('local',{
    successRedirect: '/', //middleware part checking if user + password matches - passport does the whole stuff
    successMessage: 'Cześć!',
    failureRedirect: '/login'
  }),function(req,res){

});
    
//login middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }

    res.redirect('/login');

}
    
    
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');