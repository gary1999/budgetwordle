const testLetterDiv = document.createElement("div");

let currentLineValue = 0;
let currentBoxValue = 0;
let letterDivTestContent;
let testGuessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

function displayLetter(letter){

    //document.getElementById("").innerHTML = "";

    testGuessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

    if(currentBoxValue != 5){
        testGuessDiv.innerHTML = letter;
    }
}

function removeLetter(){
    testGuessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

    if(currentBoxValue != 5){
        testGuessDiv.innerHTML = "";
    }

}

window.addEventListener('keydown', function (e) {

    // console.log(e);
    // console.log(e.key);
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if(currentBoxValue != 5){
            displayLetter(e.key);
            //console.log(`letter${currentLineValue}${currentBoxValue}`);
            currentBoxValue += 1;
            
        }
    } else if (e.keyCode == 8){
        if(currentBoxValue != 6){
            currentBoxValue -= 1;
            console.log(currentBoxValue);
            removeLetter();
        }
    } else if (e.keyCode == 13){
        if(currentBoxValue == 5){

            currentLineValue += 1;
            currentBoxValue = 0;
        }
    }

});
    
    