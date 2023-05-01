const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');

router.post('/insrt', function(req,res){

  let name = req.body['WrktName']
  let day = req.body['DzienTreningowy']
  let exec = req.body['Cwiczenie']
  let user = {
    name : req.user.username,
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

  let options = httpRequest.options;
  httpRequest.options.path = '/template/add';
  httpRequest.options.method = 'POST';

  httpRequest.postRequest(options,true,'/plan',template,res);
});

module.exports = router;