# CMSC 447 Group Project
This is the repository for creating, as a group, a web-based game using the MelonJS framework. CMSC 447 Spring 2023, Prof. Allgood


# Finding Your Way Around the File Structure
Go to the very bottom of this documentation for a tree diagram of the file structure

# Initial Setup to Play the Game
There are a couple of things you have to do first before playing the game (which are mostly installations).

1. Install the latest version of python3 & pip3 here https://www.python.org/downloads/
    If you're on Windows, run this as well Install pyenv (pyenv-win for Windows)
    https://github.com/pyenv-win/pyenv-win
2. Install Node.js here: https://nodejs.org/en/download

Then, you have to run the following commands into the terminal

3. ```pip3 install flask flask_cors flask_sqlalchemy sqlalchemy```
This should isntall flask, flask_cors, flask_sqlalchemy, and sqlalchemy

If you're on Mac, also run this command
```pip3 install pyenv```

Now that you've installed Python and its dependencies, alongside Node.js, now it's time to install Node.js dependencies.

4. ```npm install```

5. ```npm install http-server -g``` 

Now that you've installed everything, you need to run some commands in the backend before you can actually run the game

6. ```cd backend/```

7. ```python3 api.py```
Now, open up a new terminal

Once you have the backend set up, there are still a couple more things you need to do. Next, type in (make sure you have Node.js installed)

8. ```cd Demo_Latest/src/data/leaderboard```

If you're on Windows, run this instead
9. ```cd Demo_Latest\src\data\leaderboard\```

Them, run this into the terminal

10. ```http-server```

This should install the client side in node as well as everything needed for the leaaderboard. After successfully installing, you just need to run this command

11. ```cd Demo_Latest```

That should be everything now. Now, just run command every time you want to run the game.

12. ```npm run dev```

This should officially run the game. Just make sure that the backend is also running.


# How to Actually Play the Game
Jump Lite is your standard platformer game where you start from one side of the map and get to the right spot. Your basic controls are jumping and moving/walking. You can move by using the arrow keys and jump by using the space bar.

There are platforms that you can walk and jump on. Your goal is to get to the destination of each level and do that for all 3 levels. In order to win and show up on the leaderboard, you'd have to beat all 3 levels.

Score is kept by a timer that counts up for each level. Once you finish a level, the game keeps track of the elapsed time. As mentioned earlier, your player won't show up on the leaderboard until you have finished all 3 levels.

There are also coins located all throughout the levels. Collecting the coins helps the player by reducing the elapsed time. Once the player has collided with a coin, the coin should disappear.

Watch out for the pit in level 2! Falling through the pit (obviously bad) will also teleport you back to the back of the map. So, watch where you're going :)

Do you have what it takes to finish all 3 levels in as little time as possible?



File Structure Diagram
```
.
├── Demo Latest/
│   ├── .gitignore
│   ├── babel.config.json
│   ├── jsconfig.json
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── webpack.config.js
│   └── src/
│   	├── index.cc
│   	├── index.html
│   	├── index.js
│   	├── manifest.js
│   	├── data/
│   	│   ├── api.js
│   	│   ├── data.js
│   	│   ├── frontend.js
│   	│   ├── bgm/
│   	│   │   ├── level_one.mp3
│   	│   │   ├── level_one.ogg
│   	│   │   ├── level_three.mp3
│   	│   │   ├── level_three.ogg
│   	│   │   ├── level_two.mp3
│   	│   │   └── level_two.ogg
│   	│   ├── fnt/
│   	│   │   ├── LICENSE.txt
│   	│   │   ├── PressStart2P.fnt
│   	│   │   ├── PressStart2P.ltr
│   	│   │   ├── PressStart2P.png
│   	│   │   └── PressStart2P.ttf
│   	│   ├── img/
│   	│   │   ├── Background.png
│   	│   │   ├── Background.tsx
│   	│   │   ├── Buildings.png
│   	│   │   ├── Buildings.tsx
│   	│   │   ├── coin.png
│   	│   │   ├── Idle-Sheet.tsx
│   	│   │   ├── Interior-01.png
│   	│   │   ├── Interior-01.tsx
│   	│   │   ├── Jump_Lite.png
│   	│   │   ├── Leaderboard.png
│   	│   │   ├── Load_Game.png
│   	│   │   ├── New_Game.png
│   	│   │   ├── player_run.json
│   	│   │   ├── player_run01.png
│   	│   │   ├── Run-Sheet.png
│   	│   │   ├── Sprite_Full.json
│   	│   │   ├── Sprite_Full.png
│   	│   │   ├── Tiles.png
│   	│   │   ├── Tiles.tsx
│   	│   │   ├── title_screen.png
│   	│   │   ├── Tree-Assets.png
│   	│   │   └── Tree-Assets.tsx
│   	│   ├── leaderboard/
│   	│   │   └── leaderboard.html
│   	│   ├── map/
│   	│   │   ├── area01.tmx
│   	│   │   ├── area02.tmx
│   	│   │   ├── area03.tmx
│   	│   │   ├── test_area01.tmx
│   	│   │   └── test_area02.tmx
│   	│   └── sfx/
│   	│   	├── cling.mp3
│   	│   	├── cling.ogg
│   	│   	├── game_complete.mp3
│   	│   	├── game_complete.ogg
│   	│   	├── jump.mp3
│   	│   	├── jump.ogg
│   	│   	├── level_complete.mp3
│   	│   	└── level_complete.ogg
│   	├── favicon/
│   	│   └── logo.png
│   	└── js/
│       	├── renderables/
│       	│   ├── coin.js
│       	│   └── player.js
│       	└── stage/
│           	├── play.js
│           	└── title.js
├── backend/
│   ├── .gitignore
│   ├── api.py
│   ├── db.py
│   └── README.md
├── clientapis/
│   ├── .gitignore
│   ├── README.md
│   ├── api.js
│   ├── frontend.js
│   ├── package.json
│   └── test.js
├── .gitignore
├── Admin Documentation.pdf
└── README.md
```
