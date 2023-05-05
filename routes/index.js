const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');
const middleWare = require('../server_scripts/middleware.js');


let options = httpRequest.options;

router.get('/', middleWare.isLoggedIn, function(req, res) {

  let workoutDay;
  let exercises;
  let workoutDate;
  let planName;
  let planId;
  let user = req.cookies.user;

  options.path = '/workout/last';
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((workout)=>{
  
    workout = JSON.parse(workout);
    workout.forEach(element => {
      planName = element.planName;
      planId = element.planId;
      exercises = typeof element.exercises !== "undefined" ? element.exercises : [];
      workoutDay = element.day;
      workoutDate = element.createDate;
    });

    res.render('index' , {result: workout, workoutDay:workoutDay, planId:planId, planName: planName, workoutDate:workoutDate, exercises:exercises, user:user});

  });

});


module.exports = router;