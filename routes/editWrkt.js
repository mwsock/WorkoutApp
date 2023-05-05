const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/edit', function(req,res){
  
  let user = req.cookies.user;

  options.path = '/workout';
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((workout)=>{
    console.log(workout);
    if(typeof workout[0] === 'undefined' || workout === null){
      workout = {
        planId:'',
        createDate:'',
        planName:'',
        day:''
      }
    }
    res.render('edit_wrkt', {result: JSON.parse(workout)}); 
  });

});


router.get("/edit/:planId/:createDate", function(req,res){

  let planId = req.params['planId'];
  let createDate = req.params['createDate'];


  let user = req.cookies.user;

  options.path = '/workout/' + planId + '/' + createDate;
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.getRequest(options).then((workout)=>{
    res.render('edit_selected_wrkt', {result: JSON.parse(workout)}); 
  });

});


router.put("/edit/:id/update", function(req,res){

  let workout = req.body;
  let user = {
    name : req.cookies.user,
  }
  workout.forEach(log => {
    log.user = user;
  });
  console.log(workout);

  options.path = '/workout';
  options.method = 'PUT';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.postRequest(options,false,'',workout,res);
  
});


router.get('/delete/:templateId/:createDate', function(req,res){

  let templateId = req.params.templateId;
  let createDate = req.params.createDate;

  options.path = '/workout/' + templateId + '/' + createDate;
  options.method = 'DELETE';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.deleteRequest(options,'/',res);

});


module.exports = router;