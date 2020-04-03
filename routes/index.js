const express = require('express');
const router = express.Router();
const wrkt = require('../models/wrkt');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
      res.redirect('/login');
  }


router.get('/', isLoggedIn , function(req, res) {

  let wrktObj = '';
  let cwiczenia = '';
  let wrktDate = '';
  let planName = '';
  let user = req.user.username;


      wrkt.find({'User' : user},{},{sort:{CDate:-1}}, function(error, wLog){
          if(error){
            console.log(error);
          }else{
            let tstLog = wLog[0];
           if(typeof tstLog === 'undefined' || tstLog === null) {
            let user = req.user.username;
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
         
           }else{
           
            let wrktObj = JSON.parse(JSON.stringify(wLog[0]));

            let planName = wrktObj.wlog['RodzajTreningu'];
            let cwiczenia = wrktObj.wlog['Cwiczenia'];
            let user = req.user.username;

            let date = new Date(wrktObj.CDate);
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            let wrktDate = date.toLocaleDateString('pl-PL', options);
       
            res.render('index' , {result: wrktObj, planName: planName, wrktDate:wrktDate, cwiczenia:cwiczenia, user:user});
           };  
          };
      });
});


module.exports = router;