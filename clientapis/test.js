/**
 * @file   test.js
 * @brief  Example usage of exported functions
 * @date   April 26th, 2023
 * 
 * @author Gabe Aquino    <lq90575@umbc.edu>
 * @author Sean Henderson <shender2@umbc.edu>
 * @author Ali Ketel      <aketel1@umbc.edu>
 * @author Alex Lloyd     <alloyd2@umbc.edu>
 * @author Amar McLean    <amarm1@umbc.edu>
 * 
 */

// Imports
import { newUser, getUser, delUser, scrUser, leaderB } from './api.js';

// Consts
const arg = process.argv.slice(2);

// Functions
const dummyData = async () => {
    return newUser('Dummy1').then(result => {
        return newUser('Dummy2').then(result => {
            return newUser('Dummy3').then(result => {
                return result;
            });
        });
    }).then(result => {
        return scrUser('Dummy1', 1800, 1).then(result => {
            return scrUser('Dummy2', 1850, 1).then(result => {
                return scrUser('Dummy3', 1900, 1).then(result => {
                    return result;
                })
            })
        });
    }).then(result => {
        return scrUser('Dummy1', 1200, 2).then(result => {
            return scrUser('Dummy2', 1250, 2).then(result => {
                return scrUser('Dummy3', 1300, 2).then(result => {
                    return result;
                })
            })
        });
    }).then(result => {
        return scrUser('Dummy1', 600, 3).then(result => {
            return scrUser('Dummy2', 650, 3).then(result => {
                return scrUser('Dummy3', 700, 3).then(result => {
                    return result;
                })
            })
        });
    });
}

function cleanup() {
    delUser('Dummy1');
    delUser('Dummy2');
    delUser('Dummy3');
}

// Test cases
switch (arg[0]) {
    case '1': // create, normal
        newUser('Test1').then(result => {
            console.log(result);
        }).then(cleanup => {
            delUser('Test1').then(result => {
                console.log('End case 1');
            });
        });
        break;
    case '2': // create, err (name > 20 chars)
        newUser('12345 1234 1234 12345').then(result => {
            console.log(result);
            console.log('End case 2');
        });
        break;
    case '3': // create, err (already exists)
        let input = 'Test3';
        newUser(input).then(result => {
            newUser(input).then(result => {
                console.log(result);
                delUser(input);
                console.log('End case 3');
            });
        });
        break;
    case '4': // loaduser, normal
        dummyData().then(result => {
            getUser('Dummy2').then(result => {
                console.log(result);
                console.log('End case 4');
                cleanup();
            });
        });
        break;
    case '5': // loaduser, err (name > 20 chars)
        getUser('12345 1234 1234 12345').then(result => {
            console.log(result);
            console.log('End case 5');
        });
        break;
    case '6': // loaduser, err (doesn't exist)
        getUser('NoExist').then(result => {
            console.log(result);
            console.log('End case 6');
        });
        break;
    case '7': // delete, normal
        newUser('Test7').then(result => {
            delUser('Test7').then(result => {
                console.log(result);
                console.log('End case 7');
            });
        });
        break;
    case '8': // delete, err (name > 20 chars)
        delUser('12345 1234 1234 12345').then(result => {
            console.log(result);
            console.log('End case 8');
        });
        break;
    case '9': // delete, err (doesn't exist)
        delUser('NoExist').then(result => {
            console.log(result);
            console.log('End case 9');
        });
        break;
    case '10': // score, normal
        dummyData().then(result => {
            scrUser('Dummy3', 900, 1).then(result => {
                console.log(result);
                console.log('End case 10');
                cleanup();
            });
        });
        break;
    case '11': // score, err (name > 20 chars)
        scrUser('12345 1234 1234 12345', 900, 1).then(result => {
            console.log(result);
            console.log('End case 11');
        });
        break;
    case '12': // score, err (negative score)
        scrUser('Dummy3', -900, 1).then(result => {
            console.log(result);
            console.log('End case 12');
        });
        break;
    case '13': // score, err (level out of range)
        scrUser('Dummy3', 900, 11).then(result => {
            console.log(result);
            console.log('End case 13');
        });
        break;
    case '14': // score, err (level out of range)
        scrUser('NoExist', 900, 1).then(result => {
            console.log(result);
            console.log('End case 14');
        });
        break;
    case '15': // score, err (no access to level)
        newUser('Test15').then(result => {
            scrUser('Test15', 600, 3).then(result => {
                console.log(result);
            });
        }).then(cleanup => {
            delUser('Test15').then(result => {
                console.log('End case 15');
            });
        });
        break;
    case '16': // score, normal
        dummyData().then(result => {
            scrUser('Dummy3', 2000, 1).then(result => {
                console.log(result);
                console.log('End case 16');
                cleanup();
            });
        });
        break;
    case '17': // leaderboard, normal
        dummyData().then(result => {
            scrUser('Dummy3', 900, 1).then(result => {
                leaderB().then(result => {
                    console.log(result);
                    console.log('End case 17');
                    cleanup();
                });
            });
        });
        break;
    default:
        console.log('No test suite selected!');
}
