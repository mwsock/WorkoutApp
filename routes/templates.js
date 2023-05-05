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
  for (let index = 0; index < exec.length; index++) {
    exercises[index] = {id : exec[index]};
  }

  let template = {
    plan: {id: name},
    day: day,
    exercises: exercises,
    user: user
  };


  console.log(template);

  options.path = '/template/add';
  options.method = 'POST';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.Authorization = req.cookies.sessionId;
  };


  httpRequest.postRequest(options,true,'/plan',template,res);
});

module.exports = router;