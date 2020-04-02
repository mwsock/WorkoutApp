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


      wrkt.find({'User' : user},{},{sort:{CDate:-1}}, function(error, wLog){
          if(error){
            console.log(error);
          }else{
            let tstLog = wLog[0];
           if(typeof tstLog === 'undefined' || tstLog === null) {
            let user = req.user.username;
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
         
           }else{
           
            let wrktObj = JSON.parse(JSON.stringify(wLog[0]));

            let planName = wrktObj.wlog['RodzajTreningu'];
            let cwiczenia = wrktObj.wlog['Cwiczenia'];
            let user = req.user.username;

            let date = new Date(wrktObj.CDate);
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            let wrktDate = date.toLocaleDateString('pl-PL', options);
       
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
           };  
          };
      });
});

app.get('/crrnt_wrkt', isLoggedIn,function(req,res){

  let user = req.user.username;

    wrktPlan.find({'User' : user},function(error,rows){
          if(error){
            console.log(error)
          }else{
            res.render('current_wrkt', {result: rows}); 
          }
        });
       
    });


app.post('/addWrkt', isLoggedIn, function(req,res){

 const wrktLog = req.body;
 const user = req.user.username;

 wrktLog.User=user;

  wrkt.create(wrktLog, function(error, newlyCreated){
    if(error){
      console.log(error)
    }else{
      console.log('WrktAdded!')
    }
  });
 

});



app.get('/edit_wrkt', isLoggedIn, function(req,res){
  
  let wrktDay = '';
  let wrktDate = '';
  let planName = '';
  let user = req.user.username;

                      
      wrkt.find({'User' : user},{},{sort:{CDate: -1}}, function(error, wLog){
          if(error){
            console.log(error);
          }else{
           if(typeof wLog[0] === 'undefined' || wLog === null) {
            res.render('edit_wrkt' , {wrktDay: wrktDay, planName: planName, wrktDate:wrktDate});
           }else{
            let recordPlan = JSON.parse(JSON.stringify(wLog));
            res.render('edit_wrkt',{recordPlan: recordPlan});
           };  
          }; 
      });

});


app.get("/edit_selected_wrkt/:id", isLoggedIn, function(req,res){

  let id = req.params['id'];

  wrkt.findById(id,function(error, wLog){
    let log = JSON.parse(JSON.stringify(wLog));
    res.render('edit_selected_wrkt', {wLog: log});
  });

  
});


app.put("/edit_selected_wrkt/:id/update", isLoggedIn, function(req,res){

  let id = req.params['id'];

  let log = req.body.wlog;

  wrkt.findByIdAndUpdate(id, { wlog: log },function(error,result){
    if (error) { 
      res.send(error);
    } else {
     console.log('WrktUpdated!');
    }
  });
  
});


app.get('/delete/Wrkt/:id',  isLoggedIn, function(req,res){

  let id = req.params.id;

  wrkt.findByIdAndDelete(id, function(error, crrntlyRemoved){
    if(error){
      console.log(error)
    }else{
      console.log('WrktDeleted!');
    };
  });
});


app.get("/addWrkt/:planId/:variantId", isLoggedIn, function(req,res){

  let planId = req.params["planId"];
  let variantId = req.params["variantId"];
  let user = req.user.username;
  
  wrktTemplate.findOne({"WrktNameId" : planId, "WrktDay" : variantId, 'User':user}, "-_id exerciseId", function(error,rows){
      if(error){
        console.log(error)
      }else{
  
          let id = rows['exerciseId'];
     
          exercise.find({"_id": id, 'User':user},"-_id dtype", function(error,rows2){
            if(error){
              console.log(error)
            }else{
              res.send({rows2});
            }}); 
          }
    });
});



app.get('/addWrkt/:id', isLoggedIn, function(req,res){

  let id = (req.params["id"])
  let user = req.user.username;

    wrktTemplate.find({"WrktNameId" : id, 'User':user}, "-_id WrktDay", function(error,rows){
      if(error){
        console.log(error)
      }else{
        res.send(rows);
      }
    });

});


app.get('/newWrktPlan', isLoggedIn, function(req,res){
  let user = req.user.username;

  wrktPlan.find({'User':user},function(error,rows){
    if(error){
       console.log(error);
    }else{
      exercise.find({'User':user},function(error,rows2){
        if(error){
          console.log(error)
        }else{
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
    wrktTemplate.create(newTemplate, function(error, newlyCreated){
        if(error){
          console.log(error)
        }else{
          console.log('WrktTemplateCreated!')
        }
      });

  res.redirect('/newWrktPlan');

});




app.get('/exercices', isLoggedIn, function(req,res){

  let user = req.user.username;

    exercise.find({'User':user},function(error,rows){
      if(error){
        console.log(error)
      }else{
        res.render('exercices', {result: rows, info:''});
      }
    });
    
    
});


app.post('/insrt', isLoggedIn, function(req,res){

  const exerc = req.body.search;
  let user = req.user.username;
  let newExercise = {dtype: exerc, User:user};

  exercise.create(newExercise, function(error, newlyCreated){
    if(error){
      console.log(error)
    }else{
      res.redirect('/exercices');
    };
  });

});


app.get('/delete/Exercise/:id',  isLoggedIn, function(req,res){
  
  let id = req.params.id;

  exercise.findByIdAndDelete(id, function(error, crrntlyRemoved){
    if(error){
      console.log(error)
    }else{
      console.log('ExerciseDeleted!');
    };
  });
});




app.post('/insrtPlan',  isLoggedIn, function(req,res){

  let plan = req.body.plan;
  let user = req.user.username;
  let newPlan = {_id: mongoose.Types.ObjectId(),wrktPlan: plan,cDATE: Date(),User:user};
                

  wrktPlan.create(newPlan, function(error, newlyCreated){
    if(error){
      console.log(error)
    }else{
      
        wrktPlan.find({'User':user},function(error,rows){
          if(error){
            console.log(error);
          }else{
            exercise.find({'User':user},function(error,rows2){
              if(error){
                console.log(error)
              }else{
                res.render('newWrktPlan', {result: rows,result2: rows2});
              }
            });
          }
        });
    }
  });

});


app.get('/delete/Plan/:id',  isLoggedIn, function(req,res){

  let id = req.params.id;

  wrktPlan.findByIdAndDelete(id, function(error, crrntlyRemoved){
    if(error){
      console.log(error)
    }else{
      console.log('PlanDeleted!');
    };
  });
});


app.get('/register',function(req,res){
  res.render('register', {message: ''});
});

app.post('/register',function(req,res){
  req.body.username;
  req.body.password;
  User.register(new User({username: req.body.username}), req.body.password, function(error, user){
    if(error){
      console.log(error);
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
});

app.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/login');
});

app.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    successMessage: 'Cześć!',
    failureRedirect: '/login'
  }),function(req,res){

});
    
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }

    res.redirect('/login');

}
    
app.use('/', router);
// app.listen(process.env.port || 3000);
app.listen(3000, '0.0.0.0');

console.log('Running at Port 3000');