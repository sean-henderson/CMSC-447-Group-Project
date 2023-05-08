"""
    @file:    api.py
    @brief:   Routing for CMSC 447 web game database
    @date:    March 22nd, 2023
    @authors:
        Gabe Aquino <lq90575@umbc.edu>
        Sean Henderson <shender2@umbc.edu>
        Ali Ketel <aketel1@umbc.edu>
        Alex Lloyd <alloyd2@umbc.edu>
        Amar McLean <amarm1@umbc.edu>
"""

from flask import request
from db    import *

# API for creating new users
"""
input format:
{
    "name": "< 20 char string"
}
"""
@app.route("/create", methods=["POST"], strict_slashes=False)
def create():
    # Vars
    receivedData = None
    playerName   = None
    player       = None

    # Extract data
    try:
        receivedData = request.get_json()
        playerName   = receivedData['name']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400

    # Validate username
    if len(playerName) > pl:
        return 'Invalid player name length', 400

    # Attempt to add to database
    try:
        player = newPlayer(playerName)
    except Exception as e:
        # Uniqueness error (probably), bail out
        o = str(e)
        db.session.close()
        return 'Username exists', 422

    # Received, Created
    return player.getJSON(), 201

# API for loading an extant user
"""
input format:
{
    "name": "< 20 char string"
}
"""
@app.route("/loaduser", methods=["POST"], strict_slashes=False)
def loaduser():
    # Vars
    receivedData = None
    playerName   = None
    player       = None

    # Extract data
    try:
        receivedData = request.get_json()
        playerName   = receivedData['name']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400

    # Validate username
    if len(playerName) > pl:
        return 'Invalid player name length', 400

    # Search database
    player = searchPlayer(playerName)

    if not player:
        return 'Not found', 404

    return player.getJSON(), 200

# API for deleting players
"""
input format:
{
    "name": "< 20 char string"
}
"""
@app.route("/delete", methods=["POST"], strict_slashes=False)
def delete():
    # Vars
    receivedData = None
    playerName   = None
    deleted      = None

    # Extract data
    try:
        receivedData = request.get_json()
        playerName   = receivedData['name']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400

    # Validate username
    if len(playerName) > pl:
        return 'Invalid player name length', 400

    # Attempt to delete
    deleted = delPlayer(playerName)

    if not deleted:
        # Player not found
        return 'No such player', 404
    
    # Founded & deleted (ok)
    return 'Found & deleted', 200

# API for scoring players
"""
input format:
{
    "name":  "< 20 char string",
    "score": "int in deciseconds",
    "which": "int 1-3"
}
"""
@app.route("/score", methods=["POST"], strict_slashes=False)
def score():
    # Vars
    receivedData = None
    playerName   = None
    playerScore  = None
    playerWhich  = None
    player       = None
    scoreUpdated = None

    # Extract data
    try:
        receivedData = request.get_json()
        playerName   = receivedData['name']
        playerScore  = int(receivedData['score'])
        playerWhich  = int(receivedData['which'])
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400
    
    # Validate everything
    if len(playerName) > pl:
        return 'Invalid player name length', 400
    elif playerScore < 0:
        return 'Invalid score', 400
    elif playerWhich > 3 or playerWhich < 1:
        return 'Invalid level', 400
    
    # Search database
    player = searchPlayer(playerName)

    if not player:
        return 'Player not found', 404
    
    # Validate order (level 1 can always be updated)
    if (playerWhich == 2 and not player.lvl2Access) or (playerWhich == 3 and not player.lvl3Access):
        return 'Level is not accessible', 422
    
    # All checks passed, update score
    scoreUpdated = updateScore(player, playerScore, playerWhich)

    # Not better than existing score
    if not scoreUpdated:
        return 'Score not better', 422

    # Score updated, send back updated Player
    return player.getJSON(), 226

# API for getting the leaderboard
"""
input format: {}
"""
@app.route("/leaderboard", methods=["POST"], strict_slashes=False)
def leaderboard():
    # Send leaderboard
    return getLeaderboard(), 200

# Test API for testing the post method for turn-in data
"""
input format: {"data" :
	[ 
		{	"Group": "<group letter>"
			"Title": "Top 5 Scores"
			"<1st Name>": "<1st score>"
			"<2nd Name>": "<2nd score>"
			"<3rd Name>": "<3rd score>"
			"<4th Name>": "<4th score>"
			"<5th Name>": "<5th score>"
		}
	]
}
"""
@app.route("/test", methods=["POST"], strict_slashes=False)
def test():
    print(request.get_json())
    return "All good", 200

# Running app
if __name__ == '__main__':
    app.app_context().push()
    app.run(debug=True)
