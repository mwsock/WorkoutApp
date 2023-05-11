const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

  router.get('/register',function(req,res){
    res.render('register', {message: ''});
  });
  
  router.post('/register',function(req,res){
    let user = {
      name : req.body.username,
      password: req.body.password
    }

    options.path = '/user/register';
    options.method = 'POST';

    httpRequest.postRequest(options,true,'/login',user,res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  });
  
  
  router.get('/login',function(req,res){
    res.render('login');
  });
  
  router.get('/logout',function(req,res){
    options.path = '/user/logout';
    options.method = 'POST';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.sessionId = req.cookies.sessionId;
    };

    httpRequest.postRequest(options,true,'/',{},res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  });

  router.post('/login',function(req,res){
    let user = {
      name : req.body.username,
      password: req.body.password
    }

    options.path = '/user/login';
    options.method = 'POST';
    options.headers.sessionId = '';

    httpRequest.postRequest(options,true,'/',user,res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
});


  module.exports = router;