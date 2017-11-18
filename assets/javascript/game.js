//Initializes var wins
var wins = document.getElementById("wins");
wins.innerHTML = 0
//initializes var looses
var looses = document.getElementById("looses");
looses.innerHTML = 0
//Array of possible words
var words = ["morty", "rick", "portal", "szechuan", "wubalubadubdub", "snuffles", "jerry", "meeseeks"];


var sounds = ["./assets/sounds/morty.wav", "./assets/sounds/rick.wav","./assets/sounds/portal.wav","./assets/sounds/szechuan.wav","./assets/sounds/dubdub.wav","./assets/sounds/snuffles.wav","./assets/sounds/jerry.wav","./assets/sounds/meeseeks.wav"]
//speaker button 
$(".speakericon").on("click", function() {
  console.log("clicked on");
  $(".speakericon").attr("src", "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg");
  $(".speakericon").attr("id", "off");
  $(".speakericon").attr("class", " ");
});

$("#off").on("click", function () {
  console.log("clicked off");
  $("#off").attr("src", "https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg");
  $("#off").attr("id",  "");
  $("off").attr("class", ".speakericon")
});

//Button to start game.
$(".start-btn").on("click", function() {
  $(".start-btn").remove();
  gameStart();
});
      
function gameStart() {
  document.getElementById("right").innerHTML = "Guess This Word!";
  document.getElementById("wrong").innerHTML = "Wrong Letters";
  //Resets wrong letters
  $("#wrongLetters").html(" ");
  //Empty array for underscores
  var blanks = [];
  //Resets Chances
  var chances = 10;
  $("#chanceCounter").html(chances);
  //Empty array for wrong letters
  var wrongLetterArray = [];
  //Random number to choose work
  var randomNumber = [Math.floor(Math.random() *words.length)];
  //Chooses word using random number
  var chosenWord = words[randomNumber];
  var soundSrc = sounds[randomNumber];
  //Creates blanks
  for (var i = 0; i < chosenWord.length; i ++ ) {
    blanks.push("_");
  }
  //populating html with blanks
  document.getElementById("blanks").innerHTML = blanks.join(" "); 
  //event listener waiting for user to press a key
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
      };
      if (chances == 0) {
        looses.innerHTML ++;
        $("#losecol").append("<p>" + chosenWord + "<p>");
        // var audioElement = document.createElement('audio');
        // audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
        // audioElement.play();
        gameStart();
      }
      if (blanks.join("") === chosenWord) {
        wins.innerHTML ++;
        $("#wincol").append("<p>" + chosenWord + "<p>");
        var dubdub = new Audio();
        dubdub.src = soundSrc;
        dubdub.play();
        gameStart();
      };
    };
};
