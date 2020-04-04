const express = require('express');
const router = express.Router();
const template = require('../models/template');
const middleWare = require('../middleware');

router.post('/insrt', middleWare.isLoggedIn, function(req,res){

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

 res.redirect('/plan');

});

module.exports = router;