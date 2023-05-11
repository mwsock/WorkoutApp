const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/edit', function(req,res){
  options.path = '/workout';
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.getRequest(options).then((workout)=>{
    if(typeof workout[0] === 'undefined' || workout === null){
      workout = {
        planId:'',
        createDate:'',
        planName:'',
        day:''
      }
    }
    res.render('edit_wrkt', {result: JSON.parse(workout)}); 
  })
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
  });
});

router.get("/edit/:planId/:createDate", function(req,res){
  let planId = req.params['planId'];
  let createDate = req.params['createDate'];

  options.path = '/workout/' + planId + '/' + createDate;
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.getRequest(options).then((workout)=>{
    res.render('edit_selected_wrkt', {result: JSON.parse(workout)}); 
  })
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
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

  options.path = '/workout';
  options.method = 'PUT';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.postRequest(options,false,'',workout,res)
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
  });

});

router.get('/delete/:templateId/:createDate', function(req,res){
  let templateId = req.params.templateId;
  let createDate = req.params.createDate;

  options.path = '/workout/' + templateId + '/' + createDate;
  options.method = 'DELETE';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.deleteRequest(options,'/',res)
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
  });
});

module.exports = router;