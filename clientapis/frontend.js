// Import Front end APIs
//import { Stage, game, ColorLayer, BitmapText, level  } from 'melonjs';
import { newUser, getUser, delUser, scrUser } from './api.js'

function newGame(){
    let name = prompt("What is your name?");
    let success = false;
    let gameIsFinished = false;
    let level = 1
    let display = newUser(name).then(result => {
        if (!result['err']) {
            success = true;
            return result;
        }
    }).then(result => {
        if (success) {
            var time;
            if (result['Lvl1']) {
                time = startGame(result['Lvl1'], result['Lvl2'], level);
                gameIsFinished = true;

                return [result['name'], time, level];
            } else {
                alert("Haven't beaten level 1 yet");
                return 0;
            }
        }
    }).then(result => {
        if (gameIsFinished) {
            return scrUser(result[0], result[1], result[2]).then(result => {
                if (!userObject['err']) {
                    if (level === 1) {
                        return userObject['Scr1']['time'];
                    }
                }
            });
        }
    });
}

function loadGame(){
    let name = prompt("What is your name?");
    let level_chosen = prompt("What level would you like to play? Please choose between 1-3.")
    while(level_chosen < 1 || level_chosen > 3){
        let level_chosen = prompt("What level would you like to play? Please choose between 1-3.");
    }
    let success = false;
    let gameIsFinished = false;

    if(level_chosen == 1){
        let display = getUser(name).then(result => {
            if (!result['err']) {
                success = true;
                return result;
            }
        }).then(result => {
            if (success) {
                var time;
                if (result['Lvl1']) {
                    time = startGame(result['Lvl1'], result['Lvl2'], level_chosen);
                    gameIsFinished = true;
    
                    return [result['name'], time, level];
                } else {
                    alert("Haven't beaten level 1 yet");
                    return 0;
                }
            }
        }).then(result => {
            if (gameIsFinished) {
                return scrUser(result[0], result[1], result[2]).then(result => {
                    if (!userObject['err']) {
                        if (level === 1) {
                            return userObject['Scr1']['time'];
                        }
                    }
                });
            }
        });
    } else if(level_chosen == 2){
        let display = newUser(name).then(result => {
            if (!result['err']) {
                success = true;
                return result;
            }
        }).then(result => {
            if (success) {
                var time;
                if (result['Lvl2']) {
                    time = startGame(result['Lvl2'], result['Lvl3'], level_chosen);
                    gameIsFinished = true;
    
                    return [result['name'], time, level];
                } else {
                    alert("Haven't beaten level 2 yet");
                    return 0;
                }
            }
        }).then(result => {
            if (gameIsFinished) {
                return scrUser(result[0], result[1], result[2]).then(result => {
                    if (!userObject['err']) {
                        if (level === 2) {
                            return userObject['Scr2']['time'];
                        }
                    }
                });
            }
        });
    } else {
        let display = newUser(name).then(result => {
            if (!result['err']) {
                success = true;
                return result;
            }
        }).then(result => {
            if (success) {
                var time;
                if (result['Lvl3']) {
                    // Make a startGame for level 3 specifically
                    time = startGame(result['Lvl3'],result['Lvl3'], level_chosen);
                    gameIsFinished = true;
    
                    return [result['name'], time, level_chosen];
                } else {
                    alert("Haven't beaten level 3 yet");
                    return 0;
                }
            }
        }).then(result => {
            if (gameIsFinished) {
                return scrUser(result[0], result[1], result[2]).then(result => {
                    if (!userObject['err']) {
                        if (level_chosen === 3) {
                            return userObject['Scr3']['time'];
                        }
                    }
                });
            }
        });
    }


}

function startGame(Lvl1, Lvl2, Lvl) {
    if(Lvl == 1){
        level.load("area01");
        Lvl1 = true
        return Lvl1,Lvl2
    }
    else if(Lvl == 2){
        level.load("area02");
        Lvl1 = true
        return Lvl1,Lvl2
    }
    else {
        level.load("area03");
        Lvl1 = true
        return Lvl1,Lvl2 
    }

}