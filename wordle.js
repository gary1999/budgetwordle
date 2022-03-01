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

    // const guessDiv = document.getElementById(`guessDiv${playerGuessValue}`);
    // const letterDiv = guessDiv.getElementById(`letter0`);
    // console.log(letterDiv);

    for(i=0;i<5;i++){

        let letterString = ("" + playerGuessValue + i)
        console.log(letterString);

        const letterDiv = document.getElementById(`letter${letterString}`);
        const letterDivContent = document.createTextNode(`${playerWordGuess[i]}`);
        letterDiv.appendChild(letterDivContent);
        //guessDiv.innerHTML = "";
        //guessDiv.appendChild(letterDiv);

        //var targetDiv = document.getElementById("foo").getElementsByClassName("bar")[0];

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
            
            // letterDiv.style.background = "red";
            

            
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
