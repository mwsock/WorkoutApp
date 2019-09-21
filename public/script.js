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


