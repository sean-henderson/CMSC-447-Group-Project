/**
 * @file   api.js
 * @brief  Exportable client-side functions to interact with the backend API
 * @date   April 15th, 2023
 * 
 * @author Gabe Aquino    <lq90575@umbc.edu>
 * @author Sean Henderson <shender2@umbc.edu>
 * @author Ali Ketel      <aketel1@umbc.edu>
 * @author Alex Lloyd     <alloyd2@umbc.edu>
 * @author Amar McLean    <amarm1@umbc.edu>
 * 
 */

import fetch from 'node-fetch';

// Consts
const URL     = 'http://127.0.0.1:5000/';
const headers = {
    'Content-Type': 'application/json'
};

// Functions
const apiPost = async (route, fnc, name, score = 0, which = -1) => {
    let success = false;
    let iDelete = false;
    let payload = {
        'name': name
    };

    if (route === 'delete') {
        iDelete = true;
    }

    if (route === 'score') {
        payload.score = score;
        payload.which = which;
    }

    return await fetch(URL + route, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log(fnc + '(): Success');
            success = true;

            if (iDelete) {
                return response.text();
            } else {
                return response.json();
            }
        } else {
            console.log(fnc + '(): Failure');
            return response.text();
        }
    })
    .then(response => {
        if (success) {
            if (!iDelete) {
                response.err  = !success;
                response.errm = '';
                return response;
            } else {
                return {
                    err:  !success,
                    errm: response
                }
            }
        } else {
            return {
                err:  !success,
                errm: response
            };
        }
    });
}

// Exports
export const newUser = async (name) => {
    let route = 'create';
    let fnc   = 'newUser';
    return apiPost(route, fnc, name);
}

export const getUser = async (name) => {
    let route = 'loaduser';
    let fnc   = 'getUser';
    return apiPost(route, fnc, name);
}

export const delUser = async (name) => {
    let route = 'delete';
    let fnc   = 'delUser';
    return apiPost(route, fnc, name);
}

export const scrUser = async (name, score, which) => {
    let route = 'score';
    let fnc   = 'scrUser';
    return apiPost(route, fnc, name, score, which);
}