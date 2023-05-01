const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');
const middleWare = require('../server_scripts/middleware.js');

let options = httpRequest.options;

router.get('/', middleWare.isLoggedIn, function(req,res){
  let user = req.cookies.user;


  options.path = '/plan';
  options.method = 'GET';

  httpRequest.getRequest(options).then((plans)=>{
    let rows;
    let rows2;
    
    rows = JSON.parse(plans);
    options.path = '/exercise';

    httpRequest.getRequest(options).then((exercices)=>{
      rows2 = JSON.parse(exercices);
      res.render('new_plan', {result: rows,result2: rows2});
    });

  });
});

router.post('/insrt', function(req,res){

    let user = {
      name : req.cookies.user
    }
    let plan = {name: req.body.plan,user:user};

    httpRequest.options.path = '/plan/add';
    httpRequest.options.method = 'POST';

    httpRequest.postRequest(options,true,'/plan',plan,res);
  });
  
  
router.get('/delete/:id', function(req,res){
  
    let id = req.params.id;

    httpRequest.options.path = '/plan/delete/' + id;
    httpRequest.options.method = 'DELETE';

    httpRequest.deleteRequest(options,'/',res);

  });

module.exports = router;