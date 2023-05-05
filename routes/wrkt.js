const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/new',function(req,res){
  let user = req.cookies.user;

  options.path = '/plan';
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((plans)=>{
    let rows = JSON.parse(plans);
    res.render('new_wrkt', {result: rows}); 
  });
});



router.get('/new/:id', function(req,res){

  let planId = (req.params["id"])
  let user = req.cookies.user;

  options.path = '/template/' + planId;
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((templates)=>{
    console.log(templates);
    res.send(templates);
  });

});
        


router.get("/new/:planId/:variantId", function(req,res){

  let planId = req.params["planId"];
  let day = req.params["variantId"];
  let user = req.cookies.user;

  options.path = '/template/' + planId + "/" + day;
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((exercices)=>{
    res.send(exercices);
  });

});


router.post('/new/insrt', function(req,res){

  let workout = req.body;
  let user = {
    name : req.cookies.user,
  }
  workout.forEach(log => {
    log.user = user;
  });

  console.log(workout);

  options.path = '/workout/add';
  options.method = 'POST';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.postRequest(options,false,'',workout,res);
  
});


module.exports = router;

