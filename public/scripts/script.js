
function checkWrkt(event){

    let x = 0;
    const inpt = document.getElementsByClassName('WrktSeriesOpt');

    Array.from(inpt).forEach(function(ss){
        if(ss.value != '0' && ss.value != ""){
            x += parseInt(ss.value);
        };
        
    });

   if( x == 0){
        alert("Podaj ilość serii, a następnie uzupełnij liczbę powtórzeń i ciężar.");
        event.preventDefault();
        return 1;
   }else{

    let wrktDate = document.getElementById('wrktDate').value;
    if(wrktDate===null || wrktDate === ''){
        return 1;
    }else{

    let detailsReps = document.getElementsByClassName('detailsReps');
    let detailsWeight = document.getElementsByClassName('detailsWeight');
        
        let z = 0;
        for(let i=0;i<detailsReps.length;i++){ 
           
            if(detailsReps[i].value!=''){
                z++;
            };
        };
       
        if(z!=detailsReps.length){return 1};
        
        let y = 0; 
        for(let i=0;i<detailsWeight.length;i++){ 
            
            if(detailsWeight[i].value!=''){
                y++;
            };
        };
      
        if(y!=detailsWeight.length){return 1};
   };

};

};




function addField() //adds new row to WrktPlan table
{
    var z = document.getElementById('tb').lastChild;
    var cln = z.cloneNode(true);
    document.getElementById('tb').appendChild(cln);

    let plusBttn = (z.firstChild.firstChild.nextSibling);
    let minusBttn = (z.firstChild.lastChild.previousSibling);

    plusBttn.classList.add('inputVisibility');
    minusBttn.classList.add('inputVisibility');


    document.getElementById('tb').lastChild.scrollIntoView();
};


function removeField(){//removes tr from WrktPlan table
    var z = document.getElementById('tb');
    
    var x = document.getElementsByTagName('td').length;
    
    if(x >= 2){
        z.removeChild(z.lastChild);
    };

    var z = document.getElementById('tb').lastChild;

    let plusBttn = (z.firstChild.firstChild.nextSibling);
    let minusBttn = (z.firstChild.lastChild.previousSibling);

    plusBttn.classList.remove('inputVisibility');
    minusBttn.classList.remove('inputVisibility');

};

function selectUnblock(){
    document.getElementById('variantID').innerHTML= "<option hidden disabled selected value>Dzień</option>";
    document.getElementById('variantID').removeAttribute('disabled');
};


function populateRows(event) //adds new rows to wrktDetails table
{
    let e = window.event;
    var et = e.target;

    const eN = document.getElementsByClassName('WrktSeriesOpt');
    const index = Array.from(eN).findIndex(item => 
        item.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute('name') 
        === 
        et.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute('name'));

    
    const z = document.getElementsByClassName('toFill');

    let i = index;

        let nSeries = eN[index].parentNode.parentNode.childNodes[1].nextElementSibling.childNodes[1];
       
        let nS = parseInt(nSeries.value);

        const repsNode = document.createElement("td");
        repsNode.setAttribute('data-label',"Ilość Powtórzeń"); 

        const weightNode = document.createElement("td");
        weightNode.setAttribute('data-label',"Ciężar"); 

        const liReps = document.createElement("li");
        const liWeight = document.createElement("li"); 

        const inpReps = document.createElement("input");
        const inpWeight = document.createElement("input"); 

        inpReps.className = 'detailsReps';
        inpWeight.className = 'detailsWeight';

        repsNode.appendChild(liReps); 
        liReps.appendChild(inpReps); 
        weightNode.appendChild(liWeight); 
        liWeight.appendChild(inpWeight); 

        let zFilledUp = eN[index].parentNode.parentNode.nextElementSibling; 
        let filledToRemove = zFilledUp.childNodes;

        Array.from(filledToRemove).forEach(remItem=>{
            zFilledUp.removeChild(remItem);
        });
         
            if(nS==1){
                zFilledUp.appendChild(repsNode);
                zFilledUp.appendChild(weightNode);
                blockDetail(i);
            }else{
                let x = 1
                for(x; x<nS;x++){
                    zFilledUp.appendChild(repsNode);
                    zFilledUp.appendChild(weightNode);

                    repsNode.appendChild(liReps.cloneNode(true));
                    weightNode.appendChild(liWeight.cloneNode(true));
                    blockDetail(i);
                }; 
            };

            
            eN[index].title="Naciśnij by zwinąć."
            zFilledUp.className='filledUp';

            i=i-1; //due to className change for z there was a problem with shrinking z.length and 
                   //growing i number what has caused problem with input multipling

    const DetailsVisibility = document.getElementsByClassName('execName');
    Array.from(DetailsVisibility).forEach(detail =>{
        detail.addEventListener("click", visibility, false);
    });

    styleDetails();
    
};

function styleDetails(){
    const inpReps = document.getElementsByClassName('detailsReps');
    const inpWeight = document.getElementsByClassName('detailsWeight');

    for(let i=0;i<inpReps.length;i++){
        inpReps[i].setAttribute('required','');
        inpReps[i].placeholder  = '0';
        inpReps[i].type = 'Number';
        inpReps[i].step ='1';
        inpReps[i].min='1'
        inpReps[i].name = 'Reps'
        inpReps[i].classList.add('WrktIDopt');
    };    

    
    for(let i=0;i<inpWeight.length;i++){
        inpWeight[i].setAttribute('data-label','Nazwa'); 
        inpWeight[i].setAttribute('required',''); 
        
        inpWeight[i].placeholder = '0';
        inpWeight[i].type = 'Number';
        inpWeight[i].step ='0.25';
        inpWeight[i].min='1';
        inpWeight[i].name = 'Weight';
        inpWeight[i].classList.add('WrktIDopt');
    };
};


//removes click event if series number is filled up
function blockDetail(i){
    
        const detailTd = document.getElementsByClassName('execName');
            detailTd[i].removeAttribute('onclick');
};


function hideDetail(i){
    const detail = document.getElementsByClassName(WrktSeriesOptFilled);
};


function expandDetails(event){
    populateRows(event);
};


function visibility(event){
    let e = window.event;
    let et = e.target;
    let zFilledUp = et.parentNode.parentNode.nextElementSibling;

    if(zFilledUp.classList.contains('hidden')){
        zFilledUp.classList.remove('hidden');
        et.title="Naciśnij by zwinąć."
    }else{
        zFilledUp.classList.add('hidden');
        et.title="Naciśnij by rozwinąć."

    };

};

const records = document.getElementsByClassName('selectedRecord');
Array.from(records).forEach(record =>{
    record.addEventListener("click", editWrkt, false); 
});


function editWrkt(event){

    let e = window.event;
    let et = e.target;

    let id = et.parentNode.getAttribute('id');

    getWrkt(id);


};


function getWrkt(id){
    window.location.href = '/wrkt/edit/'+id;
};



const editableDetails = document.getElementsByClassName('WrktSeriesOpt');
Array.from(editableDetails).forEach(detail =>{
    detail.addEventListener("change", editRows, false);
});

const editableDetailsVisibility = document.getElementsByClassName('execName');
Array.from(editableDetailsVisibility).forEach(detail =>{
    detail.addEventListener("click", visibility, false);
});


function editRows(event) //adds new rows to wrktDetails table
{
    let e = window.event;
    var et = e.target;

    const eN = document.getElementsByClassName('WrktSeriesOpt');
    const index = Array.from(eN).findIndex(item => 
        item.parentNode.parentNode.childNodes[1].childNodes[1].getAttribute('name') 
        === 
        et.parentNode.parentNode.childNodes[1].childNodes[1].getAttribute('name'));

    
    const z = document.getElementsByClassName('filledUp');

   let i = index;

        let nSeries = eN[index].parentNode.parentNode.childNodes[1].nextElementSibling.childNodes[1];
       
        let nS = parseInt(nSeries.value);

        const repsNode = document.createElement("td");
        repsNode.setAttribute('data-label',"Ilość Powtórzeń"); 

        const weightNode = document.createElement("td");
        weightNode.setAttribute('data-label',"Ciężar"); 

        const liReps = document.createElement("li");
        const liWeight = document.createElement("li"); 

        const inpReps = document.createElement("input");
        const inpWeight = document.createElement("input"); 

        inpReps.className = 'detailsReps';
        inpWeight.className = 'detailsWeight';

        repsNode.appendChild(liReps); 
        liReps.appendChild(inpReps); 
        weightNode.appendChild(liWeight); 
        liWeight.appendChild(inpWeight); 

        let zFilledUp = eN[index].parentNode.parentNode.nextElementSibling;  
        let filledToRemove = zFilledUp.childNodes;
        
        Array.from(filledToRemove).forEach(remItem=>{
            zFilledUp.removeChild(remItem);
        });
        
            if(nS==1){
                zFilledUp.appendChild(repsNode);
                zFilledUp.appendChild(weightNode);
                blockDetail(i);
            }else{
                let x = 1
                for(x; x<nS;x++){
                    zFilledUp.appendChild(repsNode);
                    zFilledUp.appendChild(weightNode);

                    repsNode.appendChild(liReps.cloneNode(true));
                    weightNode.appendChild(liWeight.cloneNode(true));
                    blockDetail(i);
                }; 
            };

            eN[index].title="Naciśnij by zwinąć."
            zFilledUp.className='filledUp';

            i=i-1; //due to className change for z there was a problem with shrinking z.length and 
                   //growing i number what has caused problem with input multipling
    
    styleDetails();
};

function logoutHide(){
    let lougout = document.getElementsByClassName('logout');
    for(let i = 0;i<lougout.length;i++){
        let hamburgerBttn = document.getElementById('menu-btn');
        if(hamburgerBttn.checked){
            lougout[i].classList.add('hiddenElem');
        }else{
            lougout[i].classList.remove('hiddenElem');
        };
        
    };
}

window.onload = function(){

    //calls ajax script to delete selected element
    let elemToDelete = document.getElementsByClassName('delete');
        for(let i = 0;i<elemToDelete.length;i++){
            let name = elemToDelete[i].getAttribute('name');
            let page = elemToDelete[i].getAttribute('page');
            elemToDelete[i].addEventListener('click',function(){deleteElem(event,name,page)}); 
        };


    let anchors = document.getElementsByTagName('a');   
        for(let i = 0;i<anchors.length;i++){
            let name = anchors[i].getAttribute('href');
            if(name===location.pathname){
                anchors[i].classList.add('active');
            };
        };

        if(location.pathname.substring(0,19)!='/wrkt/edit'){
            
            let validInput = document.getElementsByClassName('WrktIDopt');
            for(let i = 0;i<validInput.length;i++){
                validInput[i].addEventListener('invalid',function(){alert('Zaznaczone pole wymaga wprowadzenia conajmniej 3 znaków.')});
            };
        };

        let hamburgerBttn = document.getElementById('menu-btn');
        hamburgerBttn.addEventListener('click',logoutHide); 
        
    };   


