function ajax(type,element){

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