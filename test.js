// import { Word } from "./word"

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

let playerGuessValue; // How many times the player has guessed 
let randomWordSelector; // Selects a random word from an array
let currentWord; // The word selected for the round

let currentLineValue; // x0
let currentBoxValue; // 0x
let guessDiv; // The division the guess is in
let playerWordGuess; // The player's guess

let currentWordArray; // Array used to compare player's words
let playerWordGuessArray; // Array used to compare player's words

const retryButton = document.getElementById("retryButton");
retryButton.addEventListener('click', setUp);

// Display letters in the box as capitals
let displayLetter = (letter) => {
    guessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);
    if(currentBoxValue != 5){
        guessDiv.innerHTML = letter.toUpperCase();
    }
}

// Removes letter from the current box
let removeLetter = () =>{
    guessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);
    if(currentBoxValue != 5){
        guessDiv.innerHTML = "";
    }
}

// Pressing the keyboard
let keyDown = (e) => {
    //Check if the player inputted a letter
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if(currentBoxValue != 5){
            displayLetter(e.key);
            playerWordGuess = playerWordGuess + (e.key);
            console.log(playerWordGuess);
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
            removeLetter();
            playerWordGuess = playerWordGuess.slice(0, -1);
            console.log(playerWordGuess);
        }
    //Check if player pressed enter
    } else if (e.keyCode == 13){
        if(currentBoxValue == 5){
            //validWord(playerWordGuess.toUpperCase());
            validWord();
            playerWordGuess = "";
            currentLineValue += 1;
            currentBoxValue = 0;
        }
    }
};

let wordCheck = () => {

    for(i=0;i<5;i++){

        let letterString = ("" + currentLineValue + i)
        let letterDivChange = document.getElementById(`letter${letterString}`);


        if(currentWordArray[i] == playerWordGuessArray[i]){
            letterDivChange.style.border = "thick solid blue";
            console.log(letterDivChange);
            console.log("working here");
        }
        else if(currentWordArray.indexOf(playerWordGuessArray[i]) == -1){
            letterDivChange.style.border = "thick solid red";
        }
        else{
            letterDivChange.style.border = "thick solid yellow";
        }
    }

    // console.log(currentWordArray);
    // console.log(playerWordGuessArray);
}

let chooseWord = (randomWordSelector) => {
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}

let validWord = () => {
    if(playerWordGuess.length == 5){
        if(/^[a-zA-Z]+$/.test(playerWordGuess)){
            playerWordGuess = playerWordGuess.toUpperCase();

            currentWordArray = currentWord.split("");
            playerWordGuessArray = playerWordGuess.split("");
            
            wordCheck();
            playerGuessValue += 1;
        }
        else{
            console.log("Word doesn't have letters - invalid");
        }
    }
    else{
        console.log("Word is not 5 letters long - invalid");
    }
    endGameCondition();
}

let endGameCondition = () => {
    while (playerGuessValue != 6){
        if(playerWordGuess === currentWord){
            playerGuessValue = 6;

            window.removeEventListener('keydown', keyDown);

            //alert("You won\nPress Retry for another word");
        }
        else{
            break;
        };
    }
}

function setUp(){
    
    window.addEventListener('keydown', keyDown);
    // Initialise values
    playerGuessValue = 0;
    randomWordSelector = getRandomInt(0, rightWords.length);
    currentWord = chooseWord(randomWordSelector);

    currentLineValue = 0;
    currentBoxValue = 0;
    guessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);
    playerWordGuess = "";

    currentWordArray = [];
    playerWordGuessArray = [];

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
            
            const guessDiv = document.getElementById(`guessDiv${i}`);
            guessDiv.appendChild(letterDiv);
        }
    }
}

setUp();