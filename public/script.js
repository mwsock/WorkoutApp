function checkWrkt(){
    ///alert('works');

    var inpt = document.getElementsByTagName('input');
    Array.from(inpt).forEach(ss => {
        if(ss.innerHTML != ""){
            alert('mozna insertować');
        }else{
            alert('nie mozna insertowac');
        };
    });
    
   

};


//document.getElementById('wrktAddbttn').addEventListener('click',checkWrkt); /*zastąpione atrybutem 'required' w htmlu*/

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


function matchVariant(){
   var planID = document.getElementsByClassName('WrktIDopt')[1].getAttribute('value');
   var varID = document.getElementById('variantID').getAttribute('value');

   console.log(planID);
}
