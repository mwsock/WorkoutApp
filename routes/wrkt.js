const express = require('express');
const router = express.Router();
const plan = require('../models/plan');
const wrkt = require('../models/wrkt');
const exercise = require('../models/exercise');
const template = require('../models/template');
const middleWare = require('../middleware');


router.get('/new', middleWare.isLoggedIn,function(req,res){

    let user = req.user.username;
  
      plan.find({'User' : user},function(error,rows){
            if(error){
              console.log(error)
            }else{
              res.render('new_wrkt', {result: rows}); 
            }
          });
         
      });



router.get('/new/:id', middleWare.isLoggedIn, function(req,res){

    let id = (req.params["id"])
    let user = req.user.username;
  
      template.find({"WrktNameId" : id, 'User':user}, "-_id WrktDay", function(error,rows){
        if(error){
          console.log(error)
        }else{
          res.send(rows);
        }
      });
  
});
        


router.get("/new/:planId/:variantId", middleWare.isLoggedIn, function(req,res){

  let planId = req.params["planId"];
  let variantId = req.params["variantId"];
  let user = req.user.username;
  
  template.findOne({"WrktNameId" : planId, "WrktDay" : variantId, 'User':user}, "-_id exerciseId", function(error,rows){
      if(error){
        console.log(error)
      }else{
  
          let id = rows['exerciseId'];
     
          exercise.find({"_id": id, 'User':user},"-_id dtype", function(error,rows2){
            if(error){
              console.log(error)
            }else{
              res.send({rows2});
            }}); 
          }
    });
});


router.post('/new/insrt', middleWare.isLoggedIn, function(req,res){

 const wrktLog = req.body;
 const user = req.user.username;

 wrktLog.User=user;

  wrkt.create(wrktLog, function(error, newlyCreated){
    if(error){
      console.log(error)
    }else{
      console.log('WrktAdded!')
    }
  });
 

});


module.exports = router;

