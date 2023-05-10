# CMSC 447 Group Project
This is the repository for creating, as a group, a web-based game using the MelonJS framework. CMSC 447 Spring 2023, Prof. Allgood



# Initial Setup to Play the Game
There are a couple of things you have to do first before playing the game (which are mostly installations).

1. Install the latest version of python3 & pip3 here https://www.python.org/downloads/
2. Install pyenv
3. Install Node.js here: https://nodejs.org/en/download
4. flask
5. flask_cors
6. flask_sqlalchemy
7. sqlalchemy

Then, you have to run the following commands into the terminal

8. ```pip3 install flask flask_cors flask_sqlalchemy sqlalchemy```

9. ```cd backend/```

10. ```python3 api.py```

Once you have the backend set up, there are still a couple more things you need to do. Next, type in (make you have Node.js installed)

11. ```npm install```

This should install the client side in node. After successfully installing, you just need to type in one last command

12. ```npm run dev```

This should officially run the game. Just make sure that the backend is also running.



# How to Actually Play the Game
The Jump Lite is your standard platformer game where you start from one side of the map and get to the right spot. Your basic controls are jumping and moving/walking. You can move by using the arrow keys and jump by using the space bar.

There are platforms that you can walk and jump on. Your goal is to get to the destination of each level and do that for all 3 levels. In order to win and show up on the leaderboard, you'd have to beat all 3 levels.

Score is kept by a timer that counts up for each level. Once you finish a level, the game keeps track of the elapsed time. As mentioned earlier, your player won't show up on the leaderboard until you have finished all 3 levels.

There are also coins located all throughout the levels. Collecting the coins helps the player by reducing the elapsed time. Once the player has collided with a coin, the coin should disappear.

Watch out for the pit in level 2! Falling through the pit (obviously bad) will also teleport you back to the back of the map. So, watch where you're going :)

Do you have what it takes to finish all 3 levels in as little time as possible?
