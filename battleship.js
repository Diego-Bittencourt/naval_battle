// the view object controls the display div and add "hit" or "miss" classes to the td in the table.
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

// The model object holds the ships locations and info about the ships like how many, length, sunk and board size.

var model = { 
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [ { locations: ["10", "20", "30"], hits: ["", "", ""] },
             { locations: ["32", "33", "34"], hits: ["", "", ""] },
             { locations: ["63", "64", "65"], hits: ["", "", ""] } ],
    fire: function(guess) {
        for (var i = 0; i <this.numShips; i++)
            {
                var ship = this.ships[i];
                var index = ship.locations.indexOf(guess);
                if (index >= 0)
                {
                    ship.hits[index] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if(this.isSunk(ship))
                    {
                        view.displayMessage("You sank my battleship!");
                        this.shipsSunk++;
                    }
                    return true;
                }
            } 
            view.displayMiss(guess);
            view.displayMessage("You missed.");
            return false;
        },
        isSunk: function(ship) 
        {
            for (var i = 0; i < this.shipLength; i++)
            {
                if (ship.hits[i] !== "hit") 
                {
                    return false;
                }
            }
        return true;
        }
};

//creating a function to make sure the player's guess is a valid guess

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; //create an array with valid letters to compare the player's guess

    if (guess === null || guess.length !== 2) { //verify if the player's guess is null or doesn't have 2 characteres length
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0); //catches the first character of the guess
        var row = alphabet.indexOf(firstChar); //identify if the letter exists in the valid letter's array and turns it into a number from 0 to 6
        var column = guess.charAt(1); //cactches the second characters in the guess

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}

// Adding the controller 

var controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guessses + "guesses!");
            }
        }
    }
    
};

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
var guessInput = document.getElementById("guessInput");
var guess = guessInput.value;
controller.processGuess(guess);
guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;