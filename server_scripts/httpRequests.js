const http = require('http');
const util = require('util')

let options = {  
  //host: '192.168.0.213',
  host:'localhost',
  port:80,
  path: '',
  method: '',
  headers: {
      'Content-type':'application/json',
      'sessionId':''
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


  async function postRequest(options,redirect,redirectUrl,data,response){
    let promiseData = new Promise((resolve, reject) => {
      var req = http.request(options, function(res){
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', () => {
          if(res.headers['set-cookie'] != undefined || res.headers['set-cookie'] != null){
            let responseCookies = res.headers['set-cookie'];
            responseCookies.forEach(element => {
              response.cookie(element);
            });
          }
          console.log(data);
          try {
            resolve(data);
          } catch (e) {
            console.error(e.message);
          }
          if(redirect) response.redirect(redirectUrl); 
        });
      });
      req.write(JSON.stringify(data));
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
  });

  return await promiseData;
  }

  async function deleteRequest(options,redirect,response){
    let promiseData = new Promise((resolve, reject) => {
      var req = http.request(options, function(res){
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', () => {
          console.log(data);
          try {
            resolve(data);
          } catch (e) {
            console.error(e.message);
          }
          response.redirect(redirect);
        });
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    });

    return await promiseData;
  }

  module.exports = { getRequest, postRequest, deleteRequest, options };