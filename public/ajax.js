function ajaxVariant(type,element){

    var id = document.getElementById("WrktID").value;
    var url = "/addWrkt/"+id;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            var ajaxObject = JSON.parse(xhr.responseText);

            ajaxObject.forEach(function(arrayObj){
                Object.values(arrayObj).forEach(function(WrktDay){   
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

    const xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            let ajaxObject = JSON.parse(xhr.responseText);
            
            Object.values(ajaxObject).forEach(function(rslt){

                rslt.forEach(function(arrayObj){
                   
                function optNmbr(){
                    var i = 0;
                    for(i; i<11; i++){
                        var oN = oN +  "<option>"+ i +"</option>"
                    };
                    return oN;
                };

                var details = "";
                let x = 0;
                for(x; x<3; x++){
                    var details = details + "<tr class='wrktDetails' hidden> \
                    <td class='text-left'> <input class='WrktIDopt'> type='number' name='IloscPowtorzen' placeholder='Ilość Powtórzeń' min='1' max='100' required></td> \
                    <td class='text-left'> <input class='WrktIDopt'> type='number' name='Ciezar' placeholder='Ciężar' min='1' max='1000' step='0.25' required></td> \
                    </tr>" 
                };  
                                                                                                                                                             
                document.getElementById(element).innerHTML = document.getElementById(element).innerHTML + "<tr class='execRow'><td data-label='Nazwa Ćwiczenia' class='text-left'><div class='execName' name='"+ arrayObj['dtype'] +"' title='Naciśnij by rozwinąć.'>"+ arrayObj['dtype'] + "</div>\
                                                            <input readonly='readonly' hidden name='exec' value='"+ arrayObj['dtype'] + "'></td> <td data-label='Ilość Serii' class='text-left'> \
                                                            <input class='WrktIDopt WrktSeriesOpt' type='number' name='IloscSerii' title='Naciśnij by rozwinąć.' placeholder='0' min='1' max='100'  onchange ='expandDetails()' ></tr><tr class='toFill'></tr>" //+ details;  
                                                                                                  
                
                });
            });  
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

    let hiddenElem = document.getElementsByClassName('hiddenElem');
   
        hiddenElem[0].classList.remove('hiddenElem');
    
        hiddenElem[0].classList.remove('hiddenElem');
 

};



function sendWrkt(){

    let check = checkWrkt(event);

    if(check!=1){

        var log = getValues();

        var url = "/addWrkt";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(log));

       alert('Trening zapisany!');

    };

}; 

function getValues(){

    var e = document.getElementById('WrktID');
    var wrkt = e.options[e.selectedIndex].text;

    var variant = document.getElementById('variantID').value;
    
    var wrktDate = document.getElementById('wrktDate').value;
    if(wrktDate===null || wrktDate === ''){
        wrktDate = Date.now();
    };
    
    
    var z = document.getElementsByClassName('execRow');

    var exercices = [];
    

    for(i=0;i<z.length;i++){

        if(z[i].children[1].children[0].hasAttribute('disabled')){
           
        }else{
            var execName = z[i].children[0].children[0].textContent;
            var seriesNum = z[i].children[1].children[0].value;
   
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

                };

                var exercise =  {
                    "Nazwa": execName,
                    "Info": info
                    };

                exercices.push(exercise);
        };


    };
            var wrkt_log =  {"CDate": wrktDate,
                             "wlog": 
                                {"RodzajTreningu": wrkt,
                                "DzienTreningowy": variant,
                                "Cwiczenia": exercices
                                }
                            };

            return wrkt_log;
};


function updateWrkt(){


    var log = getUpdatedValues();
    console.log(log);
    let id = document.getElementById('WrktID').getAttribute('wrktid');
    console.log(id);
    var url = "/edit_selected_wrkt/"+id+"/update?_method=PUT";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(log));

    alert('Trening zaktualizowany!');

    let dtlRps = document.getElementsByClassName('detailsReps');
    let dtlWgth = document.getElementsByClassName('detailsWeight');

    for(var i=0;i<dtlRps.length;i++){
        dtlRps[i].setAttribute('disabled','');
        dtlWgth[i].setAttribute('disabled','');
    };

}; 

function getUpdatedValues(){

    var e = document.getElementById('WrktID');
    var wrkt = e.options[e.selectedIndex].text;

    var e = document.getElementById('variantID');
    var variant = e.options[e.selectedIndex].text;

    var wrktDate = document.getElementById('wrktDate').value;
    
    
    var z = document.getElementsByClassName('execRow');

    var exercices = [];
    

    for(i=0;i<z.length;i++){

        if(z[i].children[1].children[0].hasAttribute('disabled')){
          
        }else{
            var execName = z[i].children[0].children[0].textContent;
            var seriesNum = z[i].children[1].children[0].value;
         
            var execTD = z[i].nextSibling.nextSibling.children[0];
            var weigthTD = z[i].nextSibling.nextSibling.children[1];

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

                };
         
                var exercise =  {
                    "Nazwa": execName,
                    "Info": info
                    };

                exercices.push(exercise);
        };


    };
            var wrkt_log =  {"CDate": wrktDate,
                             "wlog": 
                                {"RodzajTreningu": wrkt,
                                "DzienTreningowy": variant,
                                "Cwiczenia": exercices
                                }
                            };

            return wrkt_log;
};



function deleteElem(event,name,page){

    let e = window.event;
    var et = e.target;
 
    const eN = document.getElementsByClassName('delete');
   
    let id = et.parentNode.getAttribute('id');
    console.log(name);
    
    
    var url = "/delete/"+name+"/"+id;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
          console.log('succes')
        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        };
    };
    xhr.send();

    window.location.href = '/'+page;

};