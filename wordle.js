function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let rightWords = [
    // "crane",
    "tooth",
    "tests",
];


const guessButton = document.getElementById("submitGuessButton");
guessButton.addEventListener('click', guess);

playerGuessValue = 0;

function guess(){

    playerWordGuess = (document.getElementById('userGuess').value).toUpperCase();
    let currentWord = "GAINS";
    displayGuess(playerWordGuess);
    wordCheck(currentWord, playerWordGuess);
    while (playerGuessValue != 6){

        if(playerWordGuess == currentWord){
            console.log("Win");
            playerGuessValue = 6;
        }
        else{
            console.log("Lose")
            playerGuessValue += 1;
            break;
        };
        
    }

}

function wordCheck(currentWord, playerWordGuess){

    const currentWordArray = currentWord.split("");
    const playerWordGuessArray = playerWordGuess.split("");

    for(i=0;i<5;i++){
        console.log(currentWordArray[i]);
        if(currentWordArray.indexOf(playerWordGuessArray[i]) == -1){
            console.log(`Not here ${playerWordGuessArray[i]}`);

        }
        else{
            const letterDivChange = document.getElementById(`letter${i}`);
            letterDivChange.style.border = "thick solid blue";
        }
    }


    console.log(currentWordArray);
    console.log(playerWordGuessArray);
}

function setUp(){
        
}


function displayGuess(playerWordGuess){
    // let playerGuessValue = 0;
    // let randomWordSelector = getRandomInt(0, rightWords.length);

    // let currentWord = chooseWord(randomWordSelector);

    document.getElementById("guessDisplay").innerHTML = "";

    for (let i=0;i < 5; i++){
        const letterDiv = document.createElement("div");

        letterDiv.setAttribute("id", `letter${i}`);
        letterDiv.setAttribute("class", "letter");

        letterDiv.style.width = "75px";
        letterDiv.style.height = "75px";
        letterDiv.style.fontSize = "50px";
        letterDiv.style.border = "thick solid red";

        letterDiv.style.display = "flex";
        letterDiv.style.alignItems = "center";
        letterDiv.style.justifyContent = "center";

        // letterDiv.style.background = "red";

        const letterDivContent = document.createTextNode(`${playerWordGuess[i]}`);
        letterDiv.appendChild(letterDivContent);

        const guessDiv = document.getElementById("guessDisplay");
        guessDiv.appendChild(letterDiv);
    }

}

function chooseWord(randomWordSelector){
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}
