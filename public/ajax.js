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
                
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + "<tr> <td class='text-left'>"+ rslt["NazwaCwiczenia"] + "</td> <td class='text-left'> \
                                                             <input type='number' name=" + rslt["SchemaId"] + " placeholder='Numer' min='1' max='10' required> </td> </tr>";
                
            });
            
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

};