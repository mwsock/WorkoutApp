const http = require('http');

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

   
  //Dorobić drugą wersję getRequest, która zwraca dane i można je zapisać do obiektu. Zmienić logikę w exercices

  function postRequest(options,redirect,data,response){
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
        response.redirect(redirect); 
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
        console.log('Deleted!');
        response.redirect(redirect);
      });
    });

    req.end();
  }

  module.exports = { getRequest, postRequest, deleteRequest, options };