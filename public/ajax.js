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

                var details = "";
                let x = 0;
                for(x; x<3; x++){
                    var details = details + "<tr class='wrktDetails' hidden> \
                    <td class='text-left'> <input type='number' name='IloscPowtorzen' placeholder='Ilość Powtórzeń' min='1' max='100' required></td> \
                    <td class='text-left'> <input type='number' name='Ciezar' placeholder='Ciężar' min='1' max='1000' step='0.25' required></td> \
                    </tr>" 
                };  
                                                                                                                                                             
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + "<tr class='execRow'><td class='text-left'><div class='execName' name='"+ arrayObj['dtype'] +"' title='Naciśnij by rozwinąć.' onclick ='expandDetails()'>"+ arrayObj['dtype'] + "</div>\
                                                            <input readonly='readonly' hidden name='exec' value='"+ arrayObj['dtype'] + "'></td> <td class='text-left'> \
                                                            <input class='WrktSeriesOpt' type='number' name='IloscSerii' title='Naciśnij by rozwinąć.' placeholder='0' min='1' max='100' ></tr><tr class='toFill'></tr>" //+ details;  
                                                            
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


function sendWrkt(){


    var log = getValues();
    console.log(log);

    var url = "/addWrkt";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(log));

    let hdr = document.getElementById('saveWrktHdr');
    hdr.textContent = 'Trening zapisany!';

    let dtlRps = document.getElementsByClassName('detailsReps');
    let dtlWgth = document.getElementsByClassName('detailsWeight');

    for(var i=0;i<dtlRps.length;i++){
        dtlRps[i].setAttribute('disabled','');
        dtlWgth[i].setAttribute('disabled','');
    };

}; 

function getValues(){

    var e = document.getElementById('WrktID');
    var wrkt = e.options[e.selectedIndex].text;

    var variant = document.getElementById('variantID').value;
    
    var wrktDate = document.getElementById('wrktDate').value
    
    
    var z = document.getElementsByClassName('execRow');

    var exercices = [];
    

    for(i=0;i<z.length;i++){

        if(z[i].children[1].children[0].hasAttribute('disabled')){
            //console.log('NEXT!');
        }else{
            var execName = z[i].children[0].children[0].textContent;
            //console.log('ExerciseName: '+execName);

            var seriesNum = z[i].children[1].children[0].value;
            //console.log('SeriesNumber: '+seriesNum);

            var execTD = z[i].nextSibling.children[0];
            var weigthTD = z[i].nextSibling.children[1];

            var info = [];

                for(ii=0;ii<seriesNum;ii++){
                    var repNum = execTD.children[ii].children[0].value;
                    var weigthNum = weigthTD.children[ii].children[0].value;

                    
                    var infoEXT = {
                        "NumerSerii": ii+1,
                        "IloscPowtorzen": repNum,
                        "Ciezar": weigthNum
                        };
                    info.push(infoEXT);

                    //console.log('RepNumber: '+repNum+' Weight: '+weigthNum);
                };
                //console.log(info);
                var exercise =  {
                    "Nazwa": execName,
                    "Info": info
                    };

                exercices.push(exercise);
                //console.log(exercices);
        };


    };
            var wrkt_log =  {"CDate": wrktDate,
                             "wlog": 
                                {"RodzajTreningu": wrkt,
                                "DzienTreningowy": variant,
                                "Cwiczenia": exercices
                                }
                            };

            //console.log(wrkt_log);
            return wrkt_log;
};


function ajaxTST(){
    alert('yea');
};