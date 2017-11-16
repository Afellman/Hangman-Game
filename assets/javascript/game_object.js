var gameEngine = { 
  //possible words
  "words" : ["morty", "rick", "portal", "szechuan", "wubalubadubdub", "snuffles", "jerry"],
  //empty array for blanks to fill
  "blanks" : [],
  //empty array for wrong letters
  "wrongLetterArray" : [],
  //chances to guess
  "chances" : 10,
  "wins" : document.getElementById("wins"),
  "loses" : document.getElementById("looses"),

  //game start function
  checkLetter : function (keyPressed, chosenWord){
    if (chosenWord.indexOf(keyPressed) !== -1) {
      for (i = 0; i < chosenWord.length; i ++) {
        if (chosenWord[i] == keyPressed) { 
        this.blanks[i]= keyPressed;
        document.getElementById("blanks").innerHTML = this.blanks;
        };
      };
    }
    else {
      this.wrongLetterArray.push(keyPressed);
      var wrongLettersFixed = wrongLetterArray.join(" ");
      document.getElementById("wrongLetters").innerHTML = wrongLettersFixed.toUpperCase();
      this.chances--; 
    };
  },
  checkGameOver : function () {
    if (this.chances == 0) {
      this.loses.innerHTML ++;
      gameStart();
    }
    console.log("blanks  to string: " + this.blanks.join(""))
    if (this.blanks.join("") === this.chosenWord) {
      this.wins.innerHTML ++;
      document.getElementById("wincol").innerHTML = this.chosenWord
      gameStart()
    }
  },
  gameStart : function (){
    var chosenWord = this.chooseWord()
    //for loop to make the blank spaces
    for (var i = 0; i < chosenWord.length; i++){
      this.blanks.push("_");
      document.getElementById("blanks").innerHTML = this.blanks;
    }
    document.onkeyup = function(event) {
      var keyPressed = event.key;
      gameEngine.checkLetter(keyPressed, chosenWord);
      gameEngine.checkGameOver();
    }
    
  },
  chooseWord : function () {
  var randomNumber = Math.floor(Math.random() *this.words.length)
   return this.words[randomNumber]
  },
  }


//Game run
document.onkeyup = function(event) {
if (event.keyCode === 13) {
this.wins.innerHTML = 0;
this.loses.innerHTML = 0;
document.getElementById("right").innerHTML = "Guess This Word!";
document.getElementById("wrong").innerHTML = "Wrong Guesses";
gameEngine.gameStart();
}
}
