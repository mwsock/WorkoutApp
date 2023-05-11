const express = require('express');
const router = express.Router();
const httpRequest = require('../server_scripts/httpRequests.js');
const middleWare = require('../server_scripts/middleware.js');

let options = httpRequest.options;

router.get('/', middleWare.isLoggedIn, function(req,res){
options.path = '/plan';
  options.method = 'GET';
  if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
    options.headers.sessionId = req.cookies.sessionId;
  };

  httpRequest.getRequest(options).then((plans)=>{
    let rows;
    let rows2;
    
    rows = JSON.parse(plans);
    options.path = '/exercise';

    httpRequest.getRequest(options).then((exercices)=>{
      rows2 = JSON.parse(exercices);
      res.render('new_plan', {result: rows,result2: rows2});
    })
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  })
  .catch((error)=>{
    console.log('Error: ' + error);
    res.redirect('/login');
  });
});

router.post('/insrt', function(req,res){
    let user = {
      name : req.cookies.user
    }
    let plan = {name: req.body.plan,user:user};

    options.path = '/plan/add';
    options.method = 'POST';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.sessionId = req.cookies.sessionId;
    };

    httpRequest.postRequest(options,true,'/plan',plan,res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
});
  
router.get('/delete/:id', function(req,res){
    let id = req.params.id;

    options.path = '/plan/delete/' + id;
    options.method = 'DELETE';
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
      options.headers.sessionId = req.cookies.sessionId;
    };

    httpRequest.deleteRequest(options,'/',res)
    .catch((error)=>{
      console.log('Error: ' + error);
      res.redirect('/login');
    });
  });

module.exports = router;