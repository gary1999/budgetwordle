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

setUp();

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
    // let playerGuessValue = 0;
    // let randomWordSelector = getRandomInt(0, rightWords.length);

    // let currentWord = chooseWord(randomWordSelector);

    for (let i=1;i < 6; i++){
        const letterDiv = document.createElement("div");

        letterDiv.setAttribute("id", `letter${i}`);
        letterDiv.setAttribute("class", "letter");

        letterDiv.style.width = "100px";
        letterDiv.style.height = "100px";
        letterDiv.style.fontSize = "50px";
        letterDiv.style.border = "thick solid red";

        letterDiv.style.display = "flex";
        letterDiv.style.alignItems = "center";
        letterDiv.style.justifyContent = "center";

        // letterDiv.style.background = "red";

        const letterDivContent = document.createTextNode("H");
        letterDiv.appendChild(letterDivContent);

        const guessDiv = document.getElementById("guessDisplay");
        guessDiv.appendChild(letterDiv);
    }

}

function chooseWord(randomWordSelector){
    let thisWord = rightWords[randomWordSelector];
    return(thisWord);
}
