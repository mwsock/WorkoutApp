

function checkWrkt(event){
    ///alert('works');
    let x = 0;
    const inpt = document.getElementsByClassName('WrktSeriesOpt');

    Array.from(inpt).forEach(function(ss){
        if(ss.value != '0'){
            x += parseInt(ss.value);
        };
        
    });
    
   if(x<2){
    alert("Musisz wskazać conajmniej dwie serie by móc zapisać trening.");
    event.preventDefault();
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


