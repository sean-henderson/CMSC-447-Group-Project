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
import { newUser, getUser, delUser, scrUser, leaderB } from './api.js';

// newUser('BillyBobJoel').then(result => {
//     console.log(result);
// })

// getUser('BillyBobJoel').then(result => {
//     console.log(result);
// })

// scrUser('BillyBobJoel', 570, 2).then(result => {
//     console.log(result);
// })

// delUser('BillyBobJoel').then(result => {
//     console.log(result);
// })

// leaderB().then(result => {
//     let list = [];
//     console.log(result);
    
//     if (!result['err']) {
//         Object.entries(result['data'][0]).forEach(([key, value]) => {
//             // console.log(key + ' : ' + value);
//             if (key !== 'Group' && key !== 'Title') {
//                 list.push([value, key]); // swap in order to sort by completion-time
//             }
//         });

//         // Sort
//         list.sort();

//         // Update 1st place
//         if (list.length > 0) {
//             document.getElementById("first-name").innerHTML=list[0][1];
//             document.getElementById("first-total-time").innerHTML=list[0][0];
//         }

//         // Update 2nd place
//         if (list.length > 1) {
//             document.getElementById("second-name").innerHTML=list[1][1];
//             document.getElementById("second-total-time").innerHTML=list[1][0];
//         }

//         // Update 3rd place
//         if (list.length > 2) {
//             document.getElementById("third-name").innerHTML=list[2][1];
//             document.getElementById("third-total-time").innerHTML=list[2][0];
//         }

//         // Update 4th place
//         if (list.length > 3) {
//             document.getElementById("fourth-name").innerHTML=list[3][1];
//             document.getElementById("fourth-total-time").innerHTML=list[3][0];
//         }

//         // Update 5th place
//         if (list.length > 4) {
//             document.getElementById("fifth-name").innerHTML=list[4][1];
//             document.getElementById("fifth-total-time").innerHTML=list[4][0];
//         }
//     } else {
//         console.log("API error, table not loaded.");
//     }
// });
