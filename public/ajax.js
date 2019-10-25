function ajaxVariant(type,element){

    var id = document.getElementById("WrktID").value;
    var url = "/addWrkt/"+id;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //alert('AJAX WORKS: ' + xhr.responseText);
            
            var ajaxObject = JSON.parse(xhr.responseText);
            ajaxObject.forEach(function(rslt){
                
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + " <option class='WrktIDopt'> " + rslt["VARIANT"] + "</option>";
                
            });
            
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

};


function ajaxSeries(type,element){

    document.getElementById(element).innerHTML = "" //reset table
    var planId = document.getElementById("WrktID").value;
    var variantId = document.getElementById("variantID").value;
    var url = "/addWrkt/"+ planId + '/' + variantId;
   // console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           // alert('AJAX WORKS: ' + xhr.responseText);
            
            var ajaxObject = JSON.parse(xhr.responseText);
            ajaxObject.forEach(function(rslt){

                function optNmbr(){
                    var i = 0;
                    for(i; i<11; i++){
                    var oN = oN +  "<option>"+ i +"</option>"
                    
                    };
                    return oN;
                };
                
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + "<tr> <td class='text-left'>"+ rslt["NazwaCwiczenia"] + "</td> <td class='text-left'> \
                                                             <select name="+ rslt["SchemaId"] + " placeholder='Numer' class='WrktSeriesOpt' required>" +  optNmbr() + " </select></td> </tr>"  
                                                            
                                                            
                
            });
            
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

};