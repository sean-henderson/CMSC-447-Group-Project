// Import Front end APIs
//import { Stage, game, ColorLayer, BitmapText, level  } from 'melonjs';

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
            //level.load("area01");
        }
    });
};

// Function for loading game, takes user's name
function loadGame(name) {
    return new Promise((resolve,reject)) => {
        if(getUser(name).err){
            console.log(errm)
        }
        else{
            if(!(name)."Lvl1"){
                //Load Level 1
                //level.load("area01");
            }
            else if(!(name)."Lvl2"){
                //Load Level 2
                //level.load("area02");
            }
            else if(!(name)."Lvl3"){
                //Load Level 3
                //level.load("area03");
            }
        }
    }
}

function leaderBoard() {
    getLeaderboard()
}