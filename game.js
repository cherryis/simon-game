let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false; // if the game has started or not, so you only call nextSequence() on the first keypress

let level = 0;

// ------------ when a keyboard key has been pressed,call nextSequence()
$(document).keydown(() => {
  if (!started) {
    $("#level-title").text("Level " + level);  // when the game has started, change this to say "Level 0"
    nextSequence();
    started = true;
  }
});
// ----- for user clicked ------------------------------------

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);  //index of the last answer in the user's sequence
});

// -------------------------------------
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => { nextSequence(); }, 1000); // Call nextSequence() after a 1000 millisecond delay
    }
  } 
  else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => { 
      $("body").removeClass("game-over");
      }, 200);
      
    $("#level-title").text("Game Over, Press Any Key to Restart"); //if the user got the answer wrong.
    startOver();
  }
}
// ---------------------------------------------------------
function nextSequence() {

  userClickedPattern = []; //reset the userClickedPattern for the next level

  level++;
  $("#level-title").text("Level " + level); //  update the h1  in the value of level

  let randomNumber = Math.floor(Math.random() * 4); //random 0-3
  let randomChosenColor = buttonColors[randomNumber]; // storing random index of array
  gamePattern.push(randomChosenColor); //store  to empty array

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //jQuery flashing id's buttons
  playSound(randomChosenColor); //Refactor

}
// ---------------------------------------------------------------

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3"); //connecting .mp3 files
  audio.play();
}
// -------add this pressed class to the button 
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  // remove the pressed class after a 100 milliseconds.
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
// ----------------------------
function startOver() {
 level = 0;
 gamePattern = [];
 started = false;
}

