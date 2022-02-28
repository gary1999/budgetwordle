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

    playerWordGuess = (document.getElementById('userGuess').value);

    let currentWord = "tooth";

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



function setUp(){
    let playerGuessValue = 0;
    let randomWordSelector = getRandomInt(0, rightWords.length);

    let currentWord = chooseWord(randomWordSelector);

}

function chooseWord(randomWordSelector){
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}

setUp();

