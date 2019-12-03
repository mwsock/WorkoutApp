
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
    console.log(x);
   if( x == 0){
    alert("Musisz wprowadzić co najmniej 1 serię by móc zapisać trening.");
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

  
        let z = document.getElementsByClassName('tst')
        let nSeries = document.getElementsByName('IloscSerii')
        let i = 0;
        console.log(z);
       for(i;i<z.length;i++){
        //var node1 = document.createElement("tr");  
        
        let nS = parseInt(nSeries[i].value);
        console.log(nS); //za pomocą tej zmiennej musisz populować inputy

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
            }else if (nS>1){
                let x = 1
                for(x; x<nS;x++){
                    z[i].appendChild(repsNode);
                    z[i].appendChild(weightNode);

                    repsNode.appendChild(liReps.cloneNode(true));
                    weightNode.appendChild(liWeight.cloneNode(true));
                   
                }; 
            };
            nSeries[i].setAttribute('disabled',''); //blocks series insert
        };
    
};

function styleDetails(){
    const inpReps = document.getElementsByClassName('detailsReps');
    const inpWeight = document.getElementsByClassName('detailsWeight')

    for(let i=0;i<inpReps.length;i++){
        inpReps[i].setAttribute('required','');
        inpReps[i].placeholder  = 'Ilość Powtórzeń';
        inpReps[i].type = 'Number';
        inpWeight[i].step ='1';
    };    

    
    for(let i=0;i<inpWeight.length;i++){
        inpWeight[i].setAttribute('required','');
        inpWeight[i].placeholder = 'Ciężar'
        inpWeight[i].type = 'Number';
        inpWeight[i].step ='0.25';
    };//min='1' max='1000' step='0.25'
};

function expandDetails(event){
    checkWrkt(event);
    populateRows();
    styleDetails();
};