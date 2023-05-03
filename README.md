# CMSC 447 Group Project
This is the repository for creating, as a group, a web-based game using the MelonJS framework. CMSC 447 Spring 2023, Prof. Allgood



# Initial Setup to Play the Game
There are a couple things you have to do first before playing the game (which are mostly instillations).

1. Install the latest version of python3 & pip3 here https://www.python.org/downloads/
2. Install pyenv
3. flask
4. flask_cords
5. flask_sqlalchemy
6. sqlalchemy

Then, you have to run the following commands into the terminal
7. pip3 install flask flask_cors flask-sqlalchemy sqlalchemy
8. cd backend/ && python3 api.py

Once you've done all of this, you should have everything needed in order to play the game (so long as you have all the files).



# How to Actually Play the Game
The Jump Lite is your standard platformer game where you start from one side of the map and get to the right spot. Your basic controls are jumping and moving/walking. You can move by using the arrow keys and jump by using the spacebar.

There are platforms that you can walk and jump on. Your goal is to get to the destination of each level and do that for all 3 levels. In order to win and show up on the leaderboard, you'd have to beat all 3 levels.

Score it kept by a timer that counts up for each level. Once you finish a level, the game keeps track of the elapsed time. As mentioned earlier, your player won't show up on the leaderboard until you have finished all 3 levels.

There are also coins located all throughout the levels. Collecting the coins helps the player by reducing the elapsed time. Once the player has collided with a coin, the coin should disappear.

Finishing the levels shouldn't be straightforward. There are of course obstacles/entities that you have to avoid. For instance, there are entities that will be litered throughout the level. Colliding with any of the entities will jump you back to where you started on the level. There are also places in the map where you can fall through a hole. Falling through the hole (obviously bad) will also teleport you back to the back of the map. So, watch where you're going :)

Do you have what it takes to finish all 3 levels as little time as possible?
