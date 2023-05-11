const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

let options = httpRequest.options;

router.post('/insrt', function(req,res){
  let name = req.body['WrktName']
  let day = req.body['DzienTreningowy']
  let exec = req.body['Cwiczenie']
  let user = {
    name : req.cookies.user,
  }
  let exercises = [];

  if(!Array.isArray(exec)){
    exercises[0]={id:exec};
  }else{
    exec.forEach(element => {
      exercises.push({id:element})
    });
  }

  let template = {
    plan: {id: name},
    day: day,
    exercises: exercises,
    user: user
  };

  options.path = '/template/add';
  options.method = 'POST';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.postRequest(options,true,'/plan',template,res)
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
  });
});

module.exports = router;