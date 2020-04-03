const express = require('express');
const router = express.Router();
const template = require('../models/template');

    
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
      res.redirect('/login');
  }

router.get('/addWrkt/:id', isLoggedIn, function(req,res){

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
  

router.post('/insrtWrktPlan', isLoggedIn, function(req,res){

    let name = req.body['WrktName']
    let day = req.body['DzienTreningowy']
    let exec = req.body['Cwiczenie']
    let user = req.user.username;
     
     const newTemplate = {
       WrktNameId: name,
       WrktDay: day,
       exerciseId: exec,
       User: user
     };

   template.create(newTemplate, function(error, newlyCreated){
       if(error){
         console.log(error)
       }else{
         console.log('WrktTemplateCreated!')
       }
     });

 res.redirect('/newWrktPlan');

});

module.exports = router;