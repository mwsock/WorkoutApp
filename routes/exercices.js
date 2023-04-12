const express = require('express');
const router = express.Router();
const middleWare = require('../middleware');
const httpRequest = require('./httpRequests.js');

let options = {  
  //host: '192.168.0.213',
  host:'localhost',
  port:80,
  path: '',
  method: '',
  headers: {
      'Content-type': 'application/json'
  }
}

  router.get('/', middleWare.isLoggedIn, function(req,response){

    options.path = '/exercise';
    options.method = 'GET';

    httpRequest.getRequest(options,'exercices',response);
  });
  

  
  router.post('/insrt', middleWare.isLoggedIn, function(req,response){
  
    let exerc = req.body.search;
    let user = {
      name : req.user.username,
    }
    let newExercise = {name: exerc, user:user};

    options.path = '/exercise/add';
    options.method = 'POST';

    httpRequest.postRequest(options,'/exercices',newExercise,response);

  });
  
  
  router.get('/delete/:id', middleWare.isLoggedIn, function(req,response){
    
    let id = req.params.id;

    options.path = '/exercise/delete/' + id;
    options.method = 'DELETE';

    httpRequest.deleteRequest(options,'/',response);

  });
  
module.exports = router;