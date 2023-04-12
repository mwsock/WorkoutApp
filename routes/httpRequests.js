const http = require('http');

function getRequest(options,view,response){
    let rawData = '';
    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',  (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
                let parsedData = JSON.parse(rawData);
                console.log(rawData);
                response.render(view, {result: parsedData, info:''});
              } catch (e) {
                console.error(e.message);
              } 
        });
    });

    req.end();
  }


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

  module.exports = { getRequest, postRequest, deleteRequest };