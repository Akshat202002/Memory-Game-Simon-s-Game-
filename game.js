let buttonColors = ["red", "blue", "green", "yellow"] // We'll need this to store the colors of the buttons
let gamePattern = [] // We'll need this to store the pattern the game generates
let userClickedPattern = [] // We'll need this to store the pattern the user clicks
let started = false // We'll need this to check if the game has started or not
let level = 0 // We'll need this to keep track of the level

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})

function nextSequence() {
    // Increase the level by 1 every time nextSequence() is called.
    level++
    // Update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level)

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = []

    // Create a new variable called randomNumber to generate a new random number between 0 and 3, and store it in a variable called randomChosenColour.
    let randomNumber = Math.floor(Math.random() * 4)

    // Use the randomNumber to select a random color from the buttonColors array.
    randomChosenColour = buttonColors[randomNumber]

    // Add the new randomChosenColour generated to the end of the gamePattern.
    gamePattern.push(randomChosenColour)

    // Use jQuery to select the button with the same id as the randomChosenColour and animate a flash to the user with a chosen color.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

    // Play sound for the button colour selected.
    playSound(randomChosenColour)


}

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
    // Create a new variable called userChosenColour to store the id of the button that got clicked.
    let userChosenColor = $(this).attr("id")

    // Add the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor)
    // console.log(userClickedPattern)

    // In the same way we played sound in nextSequence(), when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColor)
    animatePress(userChosenColor)

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100)

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

// We'll need to reset the values of level, gamePattern and started variables after the user gets the sequence wrong.
function startOver() {
    level = 0
    gamePattern = []
    started = false
}