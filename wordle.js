function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Testing purposes
let rightWords = [
    // "CRANE",
    // "RIGHT",
    "GAINS",
];

let playerGuessValue;
let randomWordSelector;
let currentWord;

let playerWinStreak = localStorage.getItem("playerWinStreak");
let playerMaxWinStreak = localStorage.getItem("playerMaxWinStreak");


if (playerWinStreak != null){
    playerWinStreak = parseInt(playerWinStreak);
}
else{
    playerWinStreak = 0;
}

let currentLineValue = 0;
let currentBoxValue = 0;
let playerWordGuess = "";
let letterDivTestContent;
let testGuessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

function displayLetter(letter){

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
    //Check if the player inputted a letter
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if(currentBoxValue != 5){
            displayLetter(e.key);
            playerWordGuess = playerWordGuess + (e.key);
            //console.log(`letter${currentLineValue}${currentBoxValue}`);
            currentBoxValue += 1;
            
        }
    //Check if player pressed backspace
    } else if (e.keyCode == 8){
        if(currentBoxValue == 0){
            //Placeholder
            currentBoxValue = 0;
        } else if(currentBoxValue != 6){
            currentBoxValue -= 1;
            console.log(currentBoxValue);
            removeLetter();
        }
    //Check if player pressed enter
    } else if (e.keyCode == 13){
        if(currentBoxValue == 5){
            validWord(playerWordGuess);
            playerWordGuess = "";
            currentLineValue += 1;
            currentBoxValue = 0;
        }
    }

});


function update(){
    localStorage.setItem("playerWinStreak", playerWinStreak);
    localStorage.setItem("playerMaxWinStreak", playerMaxWinStreak);
    
    document.getElementById("currentStreak").innerHTML = playerWinStreak;
    document.getElementById("highestStreak").innerHTML = playerMaxWinStreak;
}


setUp();

//const guessButton = document.getElementById("submitGuessButton");
const retryButton = document.getElementById("retryButton");

//guessButton.addEventListener('click', guessClick);
retryButton.addEventListener('click', setUp);

// Testing Purposes
// const fullResetButton = document.getElementById("fullResetButton");
// fullResetButton.addEventListener('click', fullReset);

function fullReset(){

    playerWinStreak = 0;
    playerMaxWinStreak = 0;

    localStorage.setItem("playerWinStreak", playerWinStreak);
    localStorage.setItem("playerMaxWinStreak", playerMaxWinStreak);
    
    update();
}

// function guessEnter(){
//     if(event.key === 'Enter'){
//         playerWordGuess = (document.getElementById('userGuess').value).toUpperCase();
//         validWord(playerWordGuess);
//     }
// }

// function guessClick(){
//     playerWordGuess = (document.getElementById('userGuess').value).toUpperCase();
//     validWord(playerWordGuess);

// }

function endGameCondition(){
    while (playerGuessValue != 6){
        if(playerWordGuess == currentWord){
            playerGuessValue = 6;

            playerWinStreak = parseInt(playerWinStreak) + parseInt(1);
            if (playerWinStreak > playerMaxWinStreak){
                playerMaxWinStreak = playerWinStreak;
            }

            //alert("You won\nPress Retry for another word");

            update();
        }
        else{
            break;
        };
    }

    if (playerGuessValue == 6 && playerWordGuess != currentWord){
        playerWinStreak = 0;
        update();
    }
}

function validWord(playerWordGuess){
    if(playerWordGuess.length == 5){
        if(/^[a-zA-Z]+$/.test(playerWordGuess)){
            wordCheck(playerWordGuess);
            playerGuessValue += 1;
        }
        else{
            console.log("invalid");
        }
    }
    else{
        console.log("invalid");
    }
    endGameCondition();
}

function wordCheck(playerWordGuess){

    const currentWordArray = currentWord.split("");
    const playerWordGuessArray = playerWordGuess.split("");

    for(i=0;i<5;i++){

        let letterString = ("" + playerGuessValue + i)
        // const letterDiv = document.getElementById(`letter${letterString}`);
        // const letterDivContent = document.createTextNode(`${playerWordGuess[i]}`);
        // letterDiv.appendChild(letterDivContent);

        const letterDivChange = document.getElementById(`letter${letterString}`);

        if(currentWordArray[i] === playerWordGuessArray[i]){
            letterDivChange.style.border = "thick solid blue";
        }
        else if(currentWordArray.indexOf(playerWordGuessArray[i]) == -1){
            letterDivChange.style.border = "thick solid red";
        }
        else{
            letterDivChange.style.border = "thick solid yellow";
        }
    }


    console.log(currentWordArray);
    console.log(playerWordGuessArray);
}

function setUp(){
    

    if(playerGuessValue != 6){
        playerWinStreak = 0;
    }

    update();

    // Initialise values
    playerGuessValue = 0;
    randomWordSelector = getRandomInt(0, rightWords.length);
    currentWord = chooseWord(randomWordSelector);

    // Reset the page
    document.getElementById("guessContainerDiv").innerHTML = "";

    // Set up boxes
    for (let i=0;i<6; i++){
        const guessDisplayDiv = document.createElement("div");
        guessDisplayDiv.setAttribute("id", `guessDiv${i}`);
        guessDisplayDiv.setAttribute("class", "guessDiv");

        guessDisplayDiv.style.display = "flex";

        const guessContainerDiv = document.getElementById("guessContainerDiv");
        guessContainerDiv.appendChild(guessDisplayDiv);

        for (let j=0;j < 5; j++){
            const letterDiv = document.createElement("div");
            
            let letterString = "" + i + j;

            letterDiv.setAttribute("id", `letter${letterString}`);
            letterDiv.setAttribute("class", "letter");
            
            letterDiv.style.width = "75px";
            letterDiv.style.height = "75px";
            letterDiv.style.fontSize = "50px";
            letterDiv.style.border = "thick solid black";
            letterDiv.style.margin = "5px"
            
            letterDiv.style.display = "flex";
            letterDiv.style.alignItems = "center";
            letterDiv.style.justifyContent = "center";
            

            
            const guessDiv = document.getElementById(`guessDiv${i}`);
            guessDiv.appendChild(letterDiv);
        }
    }
}




function chooseWord(randomWordSelector){
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}
