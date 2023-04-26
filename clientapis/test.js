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
import { newUser, getUser, delUser, scrUser } from './api.js';

// newUser('BillyBobJoel').then(result => {
//     console.log(result);
// })

getUser('BillyBobJoel').then(result => {
    console.log(result);
})

// scrUser('BillyBobJoel', 1800, 1).then(result => {
//     console.log(result);
// })

// delUser('BillyBobJoel').then(result => {
//     console.log(result);
// })