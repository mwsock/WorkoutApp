const express = require('express');
const router = express.Router();
const exercise = require('../models/exercise');
const middleWare = require('../middleware');
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require("http");

router.get('/', middleWare.isLoggedIn, function(req,res){

    let user = req.user.username;
  
      exercise.find({'User':user},function(error,rows){
        if(error){
          console.log(error)
        }else{
          res.render('exercices', {result: rows, info:''});
        }
      });
      
      
  });
  

  
  router.post('/insrt', middleWare.isLoggedIn, function(req,res){
  
    const exerc = req.body.search;
    let user = req.user.username;
    let newExercise = {dtype: exerc, user:user};
    const options = {  
      host: '192.168.0.213',
      port:80,
      path: '/insrt',
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      }
  };

    console.log(JSON.stringify(options))

    var req = http.request(options, function(res)
    {
        res.setEncoding('utf8');
        res.on('data', function (error,chunk) {
            console.log("body: " + chunk);
            if(error!=null){
              console.log(error);};
        });
    });
    req.write(JSON.stringify(newExercise));
    req.end();
  
  });
  
  
  router.get('/delete/:id', middleWare.isLoggedIn, function(req,res){
    
    let id = req.params.id;
  
    exercise.findByIdAndDelete(id, function(error, crrntlyRemoved){
      if(error){
        console.log(error)
      }else{
        console.log('ExerciseDeleted!');
      };
    });
  });
  
module.exports = router;