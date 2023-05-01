const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');


let options = httpRequest.options;

  router.get('/', function(req,res){

    options.path = '/exercise';
    options.method = 'GET';

    httpRequest.getRequest(options).then((exercices)=>{
      res.render('exercices', {result: JSON.parse(exercices), info:''});
    });

  });
  
  
  router.post('/insrt', function(req,res){
  
    let exerc = req.body.search;
    let user = {
      name : req.user.username,
    }
    let newExercise = {name: exerc, user:user};

    httpRequest.options.path = '/exercise/add';
    httpRequest.options.method = 'POST';

    httpRequest.postRequest(options,true,'/exercices',newExercise,res);

  });
  
  
  router.get('/delete/:id', function(req,res){
    
    let id = req.params.id;

    httpRequest.options.path = '/exercise/delete/' + id;
    httpRequest.options.method = 'DELETE';

    httpRequest.deleteRequest(options,'/',res);

  });
  
module.exports = router;