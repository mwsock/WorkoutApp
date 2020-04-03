const express = require('express');
const router = express.Router();
const wrkt = require('../models/wrkt');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
      res.redirect('/login');
  }


router.get('/edit_wrkt', isLoggedIn, function(req,res){
  
  let wrktDay = '';
  let wrktDate = '';
  let planName = '';
  let user = req.user.username;

                      
      wrkt.find({'User' : user},{},{sort:{CDate: -1}}, function(error, wLog){
          if(error){
            console.log(error);
          }else{
           if(typeof wLog[0] === 'undefined' || wLog === null) {
            res.render('edit_wrkt' , {wrktDay: wrktDay, planName: planName, wrktDate:wrktDate});
           }else{
            let recordPlan = JSON.parse(JSON.stringify(wLog));
            res.render('edit_wrkt',{recordPlan: recordPlan});
           };  
          }; 
      });

});


router.get("/edit_selected_wrkt/:id", isLoggedIn, function(req,res){

  let id = req.params['id'];

  wrkt.findById(id,function(error, wLog){
    let log = JSON.parse(JSON.stringify(wLog));
    res.render('edit_selected_wrkt', {wLog: log});
  });

  
});


router.put("/edit_selected_wrkt/:id/update", isLoggedIn, function(req,res){

  let id = req.params['id'];

  let log = req.body.wlog;

  wrkt.findByIdAndUpdate(id, { wlog: log },function(error,result){
    if (error) { 
      res.send(error);
    } else {
     console.log('WrktUpdated!');
    }
  });
  
});


router.get('/delete/Wrkt/:id',  isLoggedIn, function(req,res){

  let id = req.params.id;

  wrkt.findByIdAndDelete(id, function(error, crrntlyRemoved){
    if(error){
      console.log(error)
    }else{
      console.log('WrktDeleted!');
    };
  });
});


module.exports = router;