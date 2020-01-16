
function checkWrkt(event){
    ///alert('works');
    let x = 0;
    const inpt = document.getElementsByClassName('WrktSeriesOpt');
    const hidTbl = document.getElementsByClassName('wrktDetails');

    Array.from(inpt).forEach(function(ss){
        if(ss.value != '0' && ss.value != ""){
           // console.log(ss.value);
            x += parseInt(ss.value);
        };
        
    });
   // console.log(x);
   if( x == 0){
    alert("Musisz wprowadzić co najmniej 1 serię by przejść dalej.");
    event.preventDefault();
   }else{
    for(i;i<hidTbl.length;i++){ 
        hidTbl[i].removeAttribute('hidden')
        //tutaj trzeba dodać zbieranie wartości z selectboxa, a następnie populację wedle tej wartości 
    };
    window.location.href = '#wrktDetails';
   };


};
function sample(){
    alert('ok');
};

//calls ajax script to show praticular info 'bout exercise's series and reps
let clickableTd = document.getElementsByClassName('wrktInfo');
let i = 0;
for(i;i<clickableTd.length;i++){
    let name = clickableTd[i].innerHTML;
    clickableTd[i].addEventListener('click',ajaxDropDown); 
};



function addField() //adds new row to WrktPlan table
{
    var z = document.getElementById('tb').lastChild;
    var cln = z.cloneNode(true);
    document.getElementById('tb').appendChild(cln);
};


function removeField(){//removes tr from WrktPlan table
    var z = document.getElementById('tb');
    var x = document.getElementsByTagName('td').length;
    
    if(x > 2){
        z.removeChild(z.lastChild);
    };
};

function selectUnblock(){
    document.getElementById('variantID').innerHTML= "<option hidden disabled selected value>Dzień Treningowy</option>";
    document.getElementById('variantID').removeAttribute('disabled');
};


function populateRows() //adds new rows to wrktDetails table
{
    const z = document.getElementsByClassName('toFill');
    const nSeries = document.getElementsByClassName('WrktSeriesOpt');
    let i = 0;
        //console.log(z.length);
       for(i;i<z.length;i++){
       // console.log(z.length+'_z');
        let nS = parseInt(nSeries[i].value);
        //console.log(nSeries.length); //helps to populate inputs
        
        if(isNaN(nS)){
           // console.log('stop');
           nSeries[i].setAttribute('disabled','');
            continue;
        };

        const repsNode = document.createElement("td");
        const weightNode = document.createElement("td");

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
            
            if(nS==1){
                z[i].appendChild(repsNode);
                z[i].appendChild(weightNode);
                blockDetail(i);
            }else{
                let x = 1
                for(x; x<nS;x++){
                    z[i].appendChild(repsNode);
                    z[i].appendChild(weightNode);

                    repsNode.appendChild(liReps.cloneNode(true));
                    weightNode.appendChild(liWeight.cloneNode(true));
                    blockDetail(i);
                }; 
            };
            //nSeries[i].setAttribute('disabled',''); //blocks series insert
            nSeries[i].className = 'WrktSeriesOptFilled';
            z[i].className='filledUp';
            //console.log(nS+"_nS");
            i=i-1; //due to className change for z there was a problem with shrinking z.length and 
                   //growing i number what has caused problem with input multipling
        };
    //console.log(i+"_i");
    
};

function styleDetails(){
    const inpReps = document.getElementsByClassName('detailsReps');
    const inpWeight = document.getElementsByClassName('detailsWeight');

    for(let i=0;i<inpReps.length;i++){
        inpReps[i].setAttribute('required','');
        inpReps[i].placeholder  = 'Ilość Powtórzeń';
        inpReps[i].type = 'Number';
        inpReps[i].step ='1';
        inpReps[i].min='1'
        inpReps[i].name = 'Reps'
    };    

    
    for(let i=0;i<inpWeight.length;i++){
        inpWeight[i].setAttribute('required','');
        inpWeight[i].placeholder = 'Ciężar';
        inpWeight[i].type = 'Number';
        inpWeight[i].step ='0.25';
        inpWeight[i].min='1';
        inpWeight[i].name = 'Weight';
    };//min='1' max='1000' step='0.25'
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
    checkWrkt(event);
    populateRows();
    styleDetails();
};



/*function hidDetail(event){
    let e = window.event;
    let name = e.target.clientX;
    console.log(name);
    let next =  document.getElementsByClassName(name);
    console.log(next);

    var xPosition = e.clientX;
    var yPosition = e.clientY;
  console.log(xPosition);  
}; */