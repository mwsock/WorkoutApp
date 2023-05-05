const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/register',function(req,res){
    res.render('register', {message: ''});
  });
  
  router.post('/register',function(req,res){

    let user = {
      username : req.body.username,
      password: req.body.password
    }

    options.path = '/user/register';
    options.method = 'POST';

    httpRequest.postRequest(options,true,'/login',user,res);
  });
  
  
  router.get('/login',function(req,res){
    res.render('login');
  });
  
  router.get('/logout',function(req,res){
    options.path = '/user/logout';
    options.method = 'POST';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.Authorization = req.cookies.sessionId;
    };

    httpRequest.postRequest(options,true,'/',{},res);
  });

  router.post('/login',function(req,res){
    let user = {
      username : req.body.username,
      password: req.body.password
    }

    options.path = '/user/login';
    options.method = 'POST';
    options.headers.Authorization = '';

    httpRequest.postRequest(options,true,'/',user,res);


});


  module.exports = router;