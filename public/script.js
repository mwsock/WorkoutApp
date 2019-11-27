
function checkWrkt(event){
    ///alert('works');
    let x = 0;
    const inpt = document.getElementsByClassName('WrktSeriesOpt');
    const hidTbl = document.getElementById('wrktDetails');

    Array.from(inpt).forEach(function(ss){
        if(ss.value != '0' && ss.value != ""){
           // console.log(ss.value);
            x += parseInt(ss.value);
        };
        
    });
    console.log(x);
   if( x == 0){
    alert("Musisz wprowadzić conajmniej 1 serię by móc zapisać trening.");
    event.preventDefault();
   }else{
    hidTbl.removeAttribute('hidden')
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


function selectMenuBttn(){
    
};


