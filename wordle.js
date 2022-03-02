//hey ITS YA BOY JON IN THE FUCKING CODEEEE
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let rightWords = [
    "CRANE",
    "RIGHT",
    "GAINS",
];

let playerGuessValue;
let randomWordSelector;
let currentWord;

setUp();

const guessButton = document.getElementById("submitGuessButton");
guessButton.addEventListener('click', guessClick);

const retryButton = document.getElementById("retryButton");
retryButton.addEventListener('click', setUp);

function guessEnter(){
    if(event.key === 'Enter'){
        playerWordGuess = (document.getElementById('userGuess').value).toUpperCase();
        validWord(playerWordGuess);
    }
}

function guessClick(){
    playerWordGuess = (document.getElementById('userGuess').value).toUpperCase();
    validWord(playerWordGuess);
    while (playerGuessValue != 6){
    
        if(playerWordGuess == currentWord){
            console.log("Win");
            playerGuessValue = 6;
        }
        else{
            console.log("Lose")
            break;
        };
        
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



}

function wordCheck(playerWordGuess){

    const currentWordArray = currentWord.split("");
    const playerWordGuessArray = playerWordGuess.split("");

    for(i=0;i<5;i++){

        let letterString = ("" + playerGuessValue + i)
        const letterDiv = document.getElementById(`letter${letterString}`);
        const letterDivContent = document.createTextNode(`${playerWordGuess[i]}`);
        letterDiv.appendChild(letterDivContent);

        console.log(currentWordArray[i]);
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

    playerGuessValue = 0;
    randomWordSelector = getRandomInt(0, rightWords.length);
    currentWord = chooseWord(randomWordSelector);

    document.getElementById("guessContainerDiv").innerHTML = "";

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


function displayGuess(playerWordGuess){
    // let playerGuessValue = 0;
    // let randomWordSelector = getRandomInt(0, rightWords.length);

    // let currentWord = chooseWord(randomWordSelector);

    //document.getElementById("guessDisplay").innerHTML = "";



}

function chooseWord(randomWordSelector){
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}
