export default class Word{

    rightWords;

    constructor(rightWords){
        console.log("fsf")
        this.randomWordSelector = randomWordSelector;
        this.rightWords = rightWords;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    chooseWord = () => {
        return(this.rightWords[getRandomInt(0, this.rightWords.length)]);
    }

}

let newWord = new Word(rightWords);
let displayWord = newWord.chooseWord();
console(displayWord);