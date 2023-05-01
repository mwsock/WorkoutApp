const http = require('http');
const util = require('util')

let options = {  
  //host: '192.168.0.213',
  host:'localhost',
  port:80,
  path: '',
  method: '',
  headers: {
      'Content-type': 'application/json'
  }
}


async function getRequest(options) {

  let promiseData = new Promise((resolve, reject) => {
      let rawData = '';
      var req = http.request(options, function(res){
          res.setEncoding('utf8');
          res.on('data',  (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              resolve(rawData);
            } catch (e) {
              console.error(e.message);
            } 
          });
      });

      req.on('error', (err) => {
          reject(err);
      });

      req.end();
  });

  return await promiseData;
}


  function postRequest(options,redirect,redirectUrl,data,response){
    var req = http.request(options, function(res){
      res.setEncoding('utf8');
      res.on('data', function (error,chunk) {
          console.log("body: " + chunk);
          if(error!=null){
            console.log('error: ' + error);
          };
      });
      res.on('end', () => {
        console.log('No more data in response.');
        //console.log(util.inspect(res.headers['set-cookie'], {showHidden: false, depth: 2, colors: true}));
        let responseCookies = res.headers['set-cookie'];
        responseCookies.forEach(element => {
          console.log(element);
          response.cookie(element);
        });
        if(redirect) response.redirect(redirectUrl); 
      });
    });

    req.write(JSON.stringify(data));
    req.end();

  }

  function deleteRequest(options,redirect,response){
    var req = http.request(options, function(res){
      res.setEncoding('utf8');
      res.on('data', function (error,chunk) {
          console.log("body: " + chunk);
          if(error!=null){
            console.log('error: ' + error);
          };
      });
      res.on('end', () => {
        let responseCookies = res.headers['set-cookie'];
        responseCookies.forEach(element => {
          console.log(element);
          response.cookie(element);
        });
        console.log('Deleted!');
        response.redirect(redirect);
      });
    });

    req.end();
  }

  module.exports = { getRequest, postRequest, deleteRequest, options };