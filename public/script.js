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

