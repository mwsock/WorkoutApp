const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.get('/edit', function(req,res){
  
  let user = req.user.username;

  options.path = '/workout/' + user;
  options.method = 'GET';

  httpRequest.getRequest(options).then((workout)=>{
    console.log(workout);
    if(typeof workout[0] === 'undefined' || workout === null){
      workout = {
        planId:'',
        createDate:'',
        planName:'',
        day:''
      }
    }
    res.render('edit_wrkt', {result: JSON.parse(workout)}); 
  });

});


router.get("/edit/:planId/:createDate", function(req,res){

  let planId = req.params['planId'];
  let createDate = req.params['createDate'];


  let user = req.user.username;

  options.path = '/workout/' + planId + '/' + createDate;
  options.method = 'GET';

  httpRequest.getRequest(options).then((workout)=>{
    res.render('edit_selected_wrkt', {result: JSON.parse(workout)}); 
  });

});


router.put("/edit/:id/update", function(req,res){

  let workout = req.body;
  let user = {
    name : req.user.username,
  }
  workout.forEach(log => {
    log.user = user;
  });

  console.log(workout);

  options.path = '/workout';
  options.method = 'PUT';

  httpRequest.postRequest(options,false,'',workout,res);

  // wrkt.findByIdAndUpdate(id, { wlog: log },function(error,result){
  //   if (error) { 
  //     res.send(error);
  //   } else {
  //    console.log('WrktUpdated!');
  //   }
  // });
  
});


router.get('/delete/:id', function(req,res){

  let id = req.params.id;

  httpRequest.options.path = '/workout/' + id;
  httpRequest.options.method = 'DELETE';

  httpRequest.deleteRequest(options,'/',res);

});


module.exports = router;