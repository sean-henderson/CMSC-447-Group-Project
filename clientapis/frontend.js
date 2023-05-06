// Import Front end APIs
//import { Stage, game, ColorLayer, BitmapText, level  } from 'melonjs';
import { newUser, getUser, delUser, scrUser } from './api.js'

function newGame() {
    let name = prompt("What is your name?");
    let success = false;
    
    newUser(name).then(result => {
        if (!result['err']) {
            success = true;
            return result;
        } else { return 0; }
    }).then(result => {
        if (success) {
            startGame(result['name']);
        } else {
            alert("Name is taken");
        }

        //functionToReloadMainMenu();
    });
}

function loadGame() {
    let name = prompt("What is your name?");
    let success = false;
    
    getUser(name).then(result => {
        if (!result['err']) {
            success = true;
            return result;
        } else { return 0; }
    }).then(result => {
        if (success) {
            startGame(result['name']);
        } else {
            alert("Name is taken");
        }

        //functionToReloadMainMenu();
    });
}

function getLeaderboard(){
    window.open('http://127.0.0.1:5000/', '_blank');
    return 0;
}