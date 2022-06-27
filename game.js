var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var check = 0;

$(document).keydown(function() {
  if (level == 0) {
    nextSequence();
  }
})

$(".btn").on("click", function(event) {
  buttonPress(event.target.id);
  animatePress(event.target.id)
  if (userClickedPattern.length === level) {
    check = 0;
    checkAnswer(level - 1);
  }else{
    if(userClickedPattern[check] === gamePattern[check]){
      check++;
    }
    else{
      check = 0;
      wrongColour();
      startOver();
    }
  }
});

function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = randomNumber;
  gamePattern.push(buttonColours[randomChosenColour]);
  $("#" + buttonColours[randomChosenColour]).fadeOut(100).fadeIn(100);
  playSound(buttonColours[randomChosenColour]);
}

function buttonPress(event_id) {
  var userChosenColour = event_id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(".btn." + currentColour).addClass("pressed");
  setTimeout(function() {
    $(".btn." + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  } else {
    wrongColour();
    startOver();
  }
}

function wrongColour(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press A key to start");
}
