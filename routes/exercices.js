const express = require('express');
const router = express.Router();
const middleWare = require('../middleware');
const httpRequest = require('./httpRequests.js');
  
  router.get('/', middleWare.isLoggedIn, function(req,response){

    let options = httpRequest.options;
    options.path = '/exercise';
    options.method = 'GET';

    httpRequest.getRequest(options).then((exercices)=>{
      console.log(JSON.parse(exercices));
      response.render('exercices', {result: JSON.parse(exercices), info:''});
    });

  });
  
  
  router.post('/insrt', middleWare.isLoggedIn, function(req,response){
  
    let exerc = req.body.search;
    let user = {
      name : req.user.username,
    }
    let newExercise = {name: exerc, user:user};

    let options = httpRequest.options;
    httpRequest.options.path = '/exercise/add';
    httpRequest.options.method = 'POST';

    httpRequest.postRequest(options,'/exercices',newExercise,response);

  });
  
  
  router.get('/delete/:id', middleWare.isLoggedIn, function(req,response){
    
    let id = req.params.id;

    let options = httpRequest.options;
    httpRequest.options.path = '/exercise/delete/' + id;
    httpRequest.options.method = 'DELETE';

    httpRequest.deleteRequest(options,'/',response);

  });
  
module.exports = router;