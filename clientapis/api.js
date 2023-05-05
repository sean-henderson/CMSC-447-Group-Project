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
const apiPost = async (route, fnc, name = '', score = 0, which = -1, debug = false) => {
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
            if (debug) {console.log(fnc + '(): Success')};
            success = true;

            if (iDelete) {
                return response.text();
            } else {
                return response.json();
            }
        } else {
            if (debug) {console.log(fnc + '(): Failure')};
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
export const leaderB = async () => {
    let route = 'leaderboard';
    let fnc   = 'leaderB';
    return apiPost(route, fnc);
}

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

/**
 * Ad-hoc function for one-time turn-in of leaderboard
 * URI: https://eope3o6d7z7e2cc.m.pipedream.net/
 * @returns Promise of response
 */
export const turnIn = async (URI = '') => {
    let route = 'test';

    if (!URI) {
        URI = URL + route;
    }

    return leaderB().then(result => {
        let list = [];
        let data = {};
        
        // Check that result was received without errors
        if (result['err']) {
            console.log("API error, table not loaded.");
            return 0;
        } else {
            // Extract leaderboard entries
            Object.entries(result['data'][0]).forEach(([key, value]) => {
                // Ignore Group & Title fields
                if (key !== 'Group' && key !== 'Title') {
                    // swap in order to sort by completion-time
                    list.push([value, key]);
                }
            });

            // Sort
            list.sort();

            // Construct payload
            data['Group'] = result['data'][0]['Group'];
            data['Title'] = result['data'][0]['Title'];
            list.forEach((score) => {
                data[score[1]] = score[0];
            });

            // Send on
            console.log(data);
            return data;
        }
    }).then(payload => {
        return fetch(URI, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
    });
}
