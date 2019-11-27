function ajaxVariant(type,element){

    var id = document.getElementById("WrktID").value;
    var url = "/addWrkt/"+id;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //alert('AJAX WORKS: ' + xhr.responseText);
            
            var ajaxObject = JSON.parse(xhr.responseText);
            //var ajaxObject = xhr.responseText;
            //console.log(ajaxObject);
            ajaxObject.forEach(function(arrayObj){
                Object.values(arrayObj).forEach(function(WrktDay){   
                //console.log( arrayObj['WrktDay']);
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + " <option class='WrktIDopt'> " + WrktDay + "</option>";
                
                });
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
    let planId = document.getElementById("WrktID").value;
    let variantId = document.getElementById("variantID").value;
    let url = "/addWrkt/"+ planId + '/' + variantId;
   // console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           // alert('AJAX WORKS: ' + xhr.responseText);
            
            let ajaxObject = JSON.parse(xhr.responseText);
            //console.log(ajaxObject);
            
            Object.values(ajaxObject).forEach(function(rslt){
               // console.log(rslt);
                rslt.forEach(function(arrayObj){
                   // console.log(arrayObj['dtype']);
                function optNmbr(){
                    var i = 0;
                    for(i; i<11; i++){
                    var oN = oN +  "<option>"+ i +"</option>"
                    //<select name='IloscSerii' placeholder='Numer' class='WrktSeriesOpt' required>   <!--+  optNmbr() +-->  </select></td> 
                    };
                    return oN;
                };
                
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + "<tr> <td class='text-left'>"+ arrayObj['dtype'] + "</td> <td class='text-left'> \
                                                            <input class='WrktSeriesOpt' type='number' name='IloscPowtorzen' placeholder='Ilość Powtórzeń' min='1' max='100' > \ </tr>"  
                                                            
                                                            /*
                                                            <td class='text-left'> <input type='number' name='IloscPowtorzen' placeholder='Ilość Powtórzeń' min='1' max='100' required></td> \
                                                            <td class='text-left'> <input type='number' name='Ciezar' placeholder='Ciężar' min='1' max='1000' step='0.25' required></td>*/
                                                            
                
                });
            });  
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

};


function ajaxDropDown(){
    let name = 'Dipsy'
    var url = "/"+name;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            let ajaxObject = JSON.parse(xhr.responseText);

            ajaxObject.forEach(function(rslt){
            alert('AJAX WORKS: ' + rslt['NazwaCwiczenia'] + ' ' + rslt['NumerSerii'] + ' ' + rslt['IloscPowtorzen'] + ' ' + rslt['Ciezar']);
            });

        }else{
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
};