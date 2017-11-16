//Initializes var wins
var wins = document.getElementById("wins");
wins.innerHTML = 0
//initializes var looses
var looses = document.getElementById("looses");
looses.innerHTML = 0
//Array of possible words
var words = ["morty", "rick", "portal", "szechuan", "wubalubadubdub", "snuffles", "jerry", "meeseeks"];
//Event listner waiting for Enter to start the game.
document.onkeyup = function(event) {
  if (event.keyCode === 13) {
    document.getElementById("right").innerHTML = "Guess This Word!";
    document.getElementById("wrong").innerHTML = "Wrong Letters";
    gameStart();
  }
}
        
function gameStart() {
  //Resets wrong letters
  $("#wrongLetters").html(" ")
  //Resets Chances
  var chances = 10;
  $("#chanceCounter").html(chances) 
  //Empty array for wrong letters
  var wrongLetterArray = [];
  //Random number to choose work
  var randomNumber = [Math.floor(Math.random() *words.length)];
  //Chooses word using random number
  var chosenWord = words[randomNumber];
  //Empty array for underscores
  var blanks = [];
  //Creates blanks
  for (var i = 0; i < chosenWord.length; i ++ ) {
    blanks.push("_");
  }
  document.getElementById("blanks").innerHTML = blanks.join(" ");  
  document.onkeyup = function(event) {
    var keyPressed = event.key;
      if (chosenWord.indexOf(keyPressed) !== -1) {
        for (i = 0; i < chosenWord.length; i ++) {
          if (chosenWord[i] == keyPressed) { 
          blanks[i]= keyPressed;
          document.getElementById("blanks").innerHTML = blanks.join(" ");
          }
        }
      }
      else if (wrongLetterArray.indexOf(keyPressed) == -1) {
        wrongLetterArray.push(keyPressed);
        var wrongLettersFixed = wrongLetterArray.join(" ");
        document.getElementById("wrongLetters").innerHTML = wrongLettersFixed;
        chances--; 
        $("#chanceCounter").html(chances)
      }
      if (chances == 0) {
        looses.innerHTML ++;
        // var audioElement = document.createElement('audio');
        // audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
        // audioElement.play();
        gameStart();
      }
      if (blanks.join("") === chosenWord) {
        wins.innerHTML ++;
        $("#wincol").append("<p>" + chosenWord + "<p>");
        // document.getElementById("wincol").innerHTML = chosenWord
        gameStart()
      }
    }
  }