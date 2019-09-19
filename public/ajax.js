window.onload = ajaxInit();

function ajaxInit(){
    var XHR = null;
    
    
try {

   

    XHR = new XMLHttpRequest();

  
} catch (error) {
    alert(error.description)
};

return XHR;

};

function fileToDiv(id, URL){

    XHR = ajaxInit();

    if (XHR != null){
        XHR.open("GET",URL, true);


        XHR.onreadystatechange = function (){

            if (XHR.readyState == 4){
              
                console.log(XHR.responseJSON);
                
            }
        }

        XHR.send(null);


    }

};