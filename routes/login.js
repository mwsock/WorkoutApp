const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/register',function(req,res){
    res.render('register', {message: ''});
  });
  
  router.post('/register',function(req,res){

    let user = {
      name : req.user.username,
      password: req.body.password
    }

    httpRequest.options.path = '/user/register';
    httpRequest.options.method = 'POST';

    httpRequest.postRequest(options,true,'/login',user,res);


    // User.register(new User({username: req.body.username}), req.body.password, function(error, user){
    //   if(error){
    //     console.log(error);
    //     let message = 'Użytkownik o podanej nazwie jest już zarejestrowany.';
    //     return res.render('register', {message: message});
    //   };
    //   passport.authenticate('local')(req,res,function(){
    //     res.redirect('/login');
    //   });
    // });
  });
  
  
  router.get('/login',function(req,res){
    res.render('login');
  });
  
  router.get('/logout',function(req,res){
    res.writeHead(200, {
      "Set-Cookie": 'user=; HttpOnly; path=/; max-age=0',
    });
    res.end();
  });

  router.post('/login',function(req,res){
    let user = {
      name : req.body.username,
      password: req.body.password
    }

    httpRequest.options.path = '/user/login';
    httpRequest.options.method = 'POST';

    httpRequest.postRequest(options,true,'/',user,res);


});
  
  // router.post('/login',passport.authenticate('local',{
  //     successRedirect: '/',
  //     successMessage: 'Cześć!',
  //     failureRedirect: '/login'
  //   }),function(req,res){
  
  // });

  module.exports = router;