$( document ).ready(function() {
    console.log( "ready!" );
    //Initializes var wins
    var wins = document.getElementById("wins");
    wins.innerHTML = 0
    //initializes var looses
    var looses = document.getElementById("looses");
    looses.innerHTML = 0
    var hint = ["Every Rick needs a _____", "", "multidimensional transpotation device", 'Released in 1998 as a promo for the moive "Mulan"', "Rick's catch phrase", "the dog", ""];
    //Array of possible words
    var words = ["morty", "rick", "portal", "szechuan", "wubalubadubdub", "snuffles", "jerry", "meeseeks"];
    //array of sounds to play 
    var sounds = ["./assets/sounds/morty.wav", "./assets/sounds/rick.wav","./assets/sounds/portal.wav","./assets/sounds/szechuan.wav","./assets/sounds/dubdub.wav","./assets/sounds/snuffles.wav","./assets/sounds/jerry.wav","./assets/sounds/meeseeks.wav"]
    //srcs for mute icon
    var togSrc = [ "https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg", "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg" ];
    var muteTog = [false, true];
    $(".tog").click(function() {
      this.src =  togSrc.reverse()[0];
      muteTog.reverse()[0];
      console.log(muteTog);
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
      //resets hint
      $("#hint").html(" ");
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
      var word = words[randomNumber];
      var chosenWord = word.toUpperCase();
      var soundSrc = sounds[randomNumber];
      //Creates blanks
      for (var i = 0; i < chosenWord.length; i ++ ) {
        blanks.push("_");
      }
      //populating html with blanks
      document.getElementById("blanks").innerHTML = blanks.join(" "); 
      //event listener waiting for user to press a key
      document.onkeyup = function(event) {
        var key = event.key;
        keyPressed = key.toUpperCase()
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
          if (chances < 4) {
            $("#hint").html("<p>" +"Hint: " + hint[randomNumber]+"</p>")
          }
          if (chances == 0) {
            looses.innerHTML ++;
            $("#losecol").append("<p>" + chosenWord + "<p>");
            var audioLoose = new Audio();
            audioLoose.src = "";
            audioLoose.muted = muteTog[0];
            audioLoose.play();
            gameStart();
          }
          if (blanks.join("") === chosenWord) {
            wins.innerHTML ++;
            var audioWin = new Audio();
            audioWin.src = soundSrc;
            audioWin.muted = muteTog[0];
            console.log(audioWin.muted);
            audioWin.play();
            $("#wincol").append("<p>" + chosenWord + "<p>");
            gameStart();
          };
        };
    };

});
 

//things to do:
//1. Fix button
//2. add hints