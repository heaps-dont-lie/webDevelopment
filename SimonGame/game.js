var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var currentGameLevel = 0;
var gameToStart = true;

function nextSequence() {
    var randNum = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randNum];
    gamePattern.push(randomChosenColor);
    currentGameLevel++;
    $("h1").text("Level " + currentGameLevel);
    playSound(randomChosenColor);
}

function playSound(name) {
    $("#"+name).fadeOut(100).fadeIn(100);
    var playSound = new Audio("./sounds/"+name+".mp3");
    playSound.play();
}

function animatePress(currrentColor) {
    $("#"+currrentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currrentColor).removeClass("pressed");
    }, 100);
} 

function pressButton(name) {
    playSound(name);
    animatePress(name);
}

function crossCheck() {
    var lengthUserPatternList = userClickedPattern.length;
    var lengthGamePatternList = gamePattern.length;

    if (userClickedPattern[lengthUserPatternList-1] ===
         gamePattern[lengthUserPatternList-1]) {
            if (lengthGamePatternList === lengthUserPatternList) {
                return 1;
            }
            return 0; 
    } else {
        return -1;
    }   
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {
        var playSound = new Audio("./sounds/wrong.mp3");
        playSound.play();
        $("body").removeClass("game-over");
    }, 100);

    $("h1").text("Game Over! Press any key to play again.");
    gameToStart = true;
}

$(document).on("keydown", function() {
    if (gameToStart) {
        gameToStart = false;
        userClickedPattern = [];
        gamePattern = [];
        currentGameLevel = 0;
        nextSequence();
    }
});

$(".btn").click(function() {
    if (!gameToStart) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        var getState = crossCheck();

        if (getState === -1) {
            gameOver();
        }
        else if (getState === 1) {
            pressButton(userChosenColor);
            userClickedPattern = [];
            nextSequence();
        } else {
            pressButton(userChosenColor);
        }
    }
});