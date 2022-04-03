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

// Each box is represented by two numbers.
// The first number is the row it is in as well as what number
// guess the player is on.
// The second number is column the letter goes in. 
// Eg. 
// The second guess of the game is xxaxx
// The 'a' goes into box number 12. (Index starts at 0);

let currentLineValue; 
let currentBoxValue;
let guessDiv;
let playerWordGuess;

let currentWordArray;
let playerWordGuessArray;

function displayLetter(letter){

    guessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

    if(currentBoxValue != 5){
        guessDiv.innerHTML = letter.toUpperCase();
    }
}

function removeLetter(){
    guessDiv = document.getElementById(`letter${currentLineValue}${currentBoxValue}`);

    if(currentBoxValue != 5){
        guessDiv.innerHTML = "";
    }

}

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
            console.log(currentBoxValue);
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


function updateStreak(){
    localStorage.setItem("playerWinStreak", playerWinStreak);
    localStorage.setItem("playerMaxWinStreak", playerMaxWinStreak);
    
    document.getElementById("currentStreak").innerHTML = playerWinStreak;
    document.getElementById("highestStreak").innerHTML = playerMaxWinStreak;
}


setUp();

function setUp(){
    
    window.addEventListener('keydown', keyDown);

    // if(playerGuessValue != 6){
    //     playerWinStreak = 0;
    // }

    updateStreak();

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

const retryButton = document.getElementById("retryButton");
retryButton.addEventListener('click', setUp);

// Testing Purposes
// const fullResetButton = document.getElementById("fullResetButton");
// fullResetButton.addEventListener('click', fullReset);
// function fullReset(){
//     playerWinStreak = 0;
//     playerMaxWinStreak = 0;
//     localStorage.setItem("playerWinStreak", playerWinStreak);
//     localStorage.setItem("playerMaxWinStreak", playerMaxWinStreak);
//     updateStreak();
// }

function validWord(){
    // playerWordGuess = playerWordGuess.toUpperCase();
    // console.log(playerWordGuess);
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

function wordCheck(){

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

    console.log(currentWordArray);
    console.log(playerWordGuessArray);
}

function endGameCondition(){
    while (playerGuessValue != 6){
        if(playerWordGuess === currentWord){
            playerGuessValue = 6;

            playerWinStreak = parseInt(playerWinStreak) + parseInt(1);
            if (playerWinStreak > playerMaxWinStreak){
                playerMaxWinStreak = playerWinStreak;
            }

            window.removeEventListener('keydown', keyDown);

            //alert("You won\nPress Retry for another word");

            updateStreak();
        }
        else{
            break;
        };
    }

    if (playerGuessValue == 6 && playerWordGuess != currentWord){
        playerWinStreak = 0;
        updateStreak();
    }
}

