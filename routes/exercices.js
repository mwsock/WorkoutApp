const express = require('express');
const router = express.Router();
const exercise = require('../models/exercise');
const middleWare = require('../middleware');

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
    let newExercise = {dtype: exerc, User:user};
  
    exercise.create(newExercise, function(error, newlyCreated){
      if(error){
        console.log(error)
      }else{
        res.redirect('/exercices');
      };
    });
  
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