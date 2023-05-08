// Import Front end APIs
import { state } from 'melonjs';
import { newUser, getUser, delUser, scrUser } from './api'

export const newGame = () => {
    let name = prompt("What is your name?");
    let success = false;
    
    newUser(name).then(result => {
        if (!result['err']) {
            success = true;
            return result;
        } else { return 0; }
    }).then(result => {
        if (success) {
            state.change(state.PLAY);
        } else {
            alert("Name is taken");
        }
    });
}

export const loadGame = () => {
    let name = prompt("What is your name?");
    let success = false;
    
    getUser(name).then(result => {
        if (!result['err']) {
            success = true;
            return result;
        } else { return 0; }
    }).then(result => {
        if (success) {
            state.change(state.PLAY);
        } else {
            alert("Name is taken");
        }
    });
}

export const getLeaderboard = () => {
    window.open('http://127.0.0.1:5000/', '_blank');
    return 0;
}
