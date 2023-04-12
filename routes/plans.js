const express = require('express');
const router = express.Router();
const plan = require('../models/plan');
const exercise = require('../models/exercise');
const middleWare = require('../middleware');
const mongoose = require('mongoose');


router.get('/', middleWare.isLoggedIn, function(req,res){
  let user = req.user.username;

  plan.find({'User':user},function(error,rows){
    if(error){
       console.log(error);
    }else{
      exercise.find({'User':user},function(error,rows2){
        if(error){
          console.log(error)
        }else{
          res.render('new_plan', {result: rows,result2: rows2});
        }
      });
    }
  });

});




router.post('/insrt', middleWare.isLoggedIn, function(req,res){

    let planName = req.body.plan;
    let user = req.user.username;
    let newPlan = {_id: mongoose.Types.ObjectId(),wrktPlan: planName,cDATE: Date(),User:user};
                  
  
    plan.create(newPlan, function(error, newlyCreated){
      if(error){
        console.log(error)
      }else{
        
          plan.find({'User':user},function(error,rows){
            if(error){
              console.log(error);
            }else{
              exercise.find({'User':user},function(error,rows2){
                if(error){
                  console.log(error)
                }else{
                  res.render('new_plan', {result: rows,result2: rows2});
                }
              });
            }
          });
      }
    });
  
  });
  
  
router.get('/delete/:id', middleWare.isLoggedIn, function(req,res){
  
    let id = req.params.id;
  
    plan.findByIdAndDelete(id, function(error, crrntlyRemoved){
      if(error){
        console.log(error)
      }else{
        console.log('PlanDeleted!');
      };
    });

    res.redirect('/');

  });

module.exports = router;