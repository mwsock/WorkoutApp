const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../public/user');



router.get('/register',function(req,res){
    res.render('register', {message: ''});
  });
  
  router.post('/register',function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(error, user){
      if(error){
        console.log(error);
        let message = 'Użytkownik o podanej nazwie jest już zarejestrowany.';
        return res.render('register', {message: message});
      };
      passport.authenticate('local')(req,res,function(){
        res.redirect('/login');
      });
    });
  });
  
  
  router.get('/login',function(req,res){
    res.render('login');
  });
  
  router.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/login');
  });
  
  router.post('/login',passport.authenticate('local',{
      successRedirect: '/',
      successMessage: 'Cześć!',
      failureRedirect: '/login'
    }),function(req,res){
  
  });

  module.exports = router;