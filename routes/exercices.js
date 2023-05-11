const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

  router.get('/', function(req,res){
    options.path = '/exercise';
    options.method = 'GET';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.sessionId = req.cookies.sessionId;
    };

    httpRequest.getRequest(options).then((exercices)=>{
      res.render('exercices', {result: JSON.parse(exercices), info:''})
    })
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  });
  
  router.post('/insrt', function(req,res){
    let exerc = req.body.search;
    let user = {
      name : req.cookies.user,
    }
    let newExercise = {name: exerc, user:user};

    options.path = '/exercise/add';
    options.method = 'POST';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.sessionId = req.cookies.sessionId;
    };

    httpRequest.postRequest(options,true,'/exercices',newExercise,res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  });
  
  router.get('/delete/:id', function(req,res){
    let id = req.params.id;

    options.path = '/exercise/delete/' + id;
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