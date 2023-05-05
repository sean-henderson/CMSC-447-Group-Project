// Import Front end APIs

// Function for creating new game, takes user's name
function newGame(name) {
    return new Promise((resolve, reject) => {
        // Checks if user's name exists or is too long
        // If error is true, print out error message
        if(newUser(name).err){
            console.log(errm)
        }
        // Otherwise creates new user player 
        // Load into level?
        else{
            newPlayer(name)
        }
    })
}

// Function for loading game, takes user's name
function loadGame(name) {
    return new Promise((resolve,reject)) => {
        if()
    }
}

function leaderBoard() {
    getLeaderboard()
}