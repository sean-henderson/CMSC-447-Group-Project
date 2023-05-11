// Import Front end APIs
import { state } from 'melonjs';
import { newUser, getUser, delUser, scrUser } from './api';
import data from './data.js';

export const newGame = () => {
    let name = prompt("What is your name?");
    let success = false;
    
    newUser(name).then(result => {
        if (!result['err']) {
            success = true;
        }
        return result;
    }).then(result => {
        if (success) {
            data.player_name = name;
            state.change(state.PLAY);
        } else {
            alert(result['errm']);
        }
    });
}

export const loadGame = () => {
    let name = prompt("What is your name?");
    let success = false;
    
    getUser(name).then(result => {
        if (!result['err']) {
            success = true;
        }
        return result;
    }).then(result => {
        if (success) {
            data.player_name = name;
            state.change(state.PLAY);
        } else {
            alert(result['errm']);
        }
    });
}

export const getLeaderboard = () => {
    window.open('http://127.0.0.1:8080/leaderboard.html', '_blank');
    return 0;
}
