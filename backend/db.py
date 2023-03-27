"""
    @file:    db.py
    @desc:    Database for CMSC 447 web game
    @date:    March 22nd, 2023
    @authors:
        Gabe Aquino <lq90575@umbc.edu>
        Sean Henderson <shender2@umbc.edu>
        Ali Ketel <aketel1@umbc.edu>
        Alex Lloyd <alloyd2@umbc.edu>
        Amar McLean <amarm1@umbc.edu>
"""

from flask import jsonify, Flask
from flask_sqlalchemy import SQLAlchemy

# App
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

# GVars
pl = 20 # Player name length

""" PLAYER """
# int pk:           primary key     (const)
# str name:         username        (const)
# boo lvl2Access:   Level 1 beaten? (one-time switch)
# boo lvl3Access:   Level 2 beaten? (one-time switch)
# boo scorable:     Level 3 beaten? (one-time switch)
# int highScore:    Cumulative time in deciseconds [lower is better]
# 
# Score1 lvl1Score: 1:1 lvl1Score object
# Score2 lvl2Score: 1:1 lvl2Score object
# Score3 lvl3Score: 1:1 lvl3Score object
# 
# + getJSON():      JSON output
# + __repr__():     Print representation
class Player(db.Model):
    pk         = db.Column(db.Integer, primary_key=True )
    name       = db.Column(db.String(pl), nullable=False, unique=True)
    lvl2Access = db.Column(db.Boolean,     default=False)
    lvl3Access = db.Column(db.Boolean,     default=False)
    scorable   = db.Column(db.Boolean,     default=False) # All levels complete?
    highScore  = db.Column(db.Integer,    nullable=True )

    # Associated scores
    # uselist=False : one to one relationship, only one highest score is stored
    lvl1Score  = db.relationship('Score1', backref='player', uselist=False)
    lvl2Score  = db.relationship('Score2', backref='player', uselist=False)
    lvl3Score  = db.relationship('Score3', backref='player', uselist=False)

    # How the object is jsonified
    def getJSON(self):
        scr1 = None
        scr2 = None
        scr3 = None

        if self.lvl1Score:
            scr1 = self.lvl1Score.getDICT()

        if self.lvl2Score:
            scr2 = self.lvl2Score.getDICT()

        if self.lvl3Score:
            scr3 = self.lvl3Score.getDICT()

        return jsonify({
            'pk':   self.pk,
            'name': self.name,
            'Lvl1': self.lvl2Access, # Lvl1 beaten?
            'Lvl2': self.lvl3Access, # Lvl2 beaten?
            'Lvl3': self.scorable,   # Lvl3 beaten?
            'High': self.highScore,  # high score [if scorable==True, else None]
            'Scr1': scr1,
            'Scr2': scr2,
            'Scr3': scr3
        })

    # How the object is printed
    def __repr__(self):
        return f"Player('{self.pk}', '{self.name}', '{self.lvl2Access}', '{self.lvl3Access}', '{self.scorable}', '{self.highScore}')"

""" LEVEL 1 SCORE """
# int pk:   primary key
# int ppk:  player primary key (who owns the score)
# int time: Time in deciseconds (extendable)
class Score1(db.Model):
    # object members
    pk   = db.Column(db.Integer, primary_key=True )
    ppk  = db.Column(db.Integer, db.ForeignKey('player.pk'), nullable=False)

    # Score details (extendable)
    time = db.Column(db.Integer)

    # Dictionary representation
    def getDICT(self):
        return {
            'pk':   self.pk,
            'ppk':  self.ppk,
            'time': self.time # Completion time in deciseconds
        }

    # How the object is printed
    def __repr__(self):
        return f"Score1('{self.pk}', '{self.time}', '{self.player}')"

""" LEVEL 2 SCORE """
# int pk:   primary key
# int ppk:  player primary key (who owns the score)
# int time: Time in deciseconds (extendable)
class Score2(db.Model):
    # object members
    pk   = db.Column(db.Integer, primary_key=True )
    ppk  = db.Column(db.Integer, db.ForeignKey('player.pk'), nullable=False)

    # Score details (extendable)
    time = db.Column(db.Integer)

    # Dictionary representation
    def getDICT(self):
        return {
            'pk':   self.pk,
            'ppk':  self.ppk,
            'time': self.time # Completion time in deciseconds
        }

    # How the object is printed
    def __repr__(self):
        return f"Score2('{self.pk}', '{self.time}', '{self.player}')"

""" LEVEL 3 SCORE """
# int pk:   primary key
# int ppk:  player primary key (who owns the score)
# int time: Time in deciseconds (extendable)
class Score3(db.Model):
    # object members
    pk   = db.Column(db.Integer, primary_key=True )
    ppk  = db.Column(db.Integer, db.ForeignKey('player.pk'), nullable=False)

    # Score details (extendable)
    time = db.Column(db.Integer)

    # Dictionary representation
    def getDICT(self):
        return {
            'pk':   self.pk,
            'ppk':  self.ppk,
            'time': self.time # Completion time in deciseconds
        }

    # How the object is printed
    def __repr__(self):
        return f"Score3('{self.pk}', '{self.time}', '{self.player}')"


""" Database update functions """

# updatePlayer() [called whenever a score updates]
def updatePlayer(player):
    changed = False

    # Only modify lvl2Access if == False
    if not player.lvl2Access:
        # If score list is not empty, flip
        if player.lvl1Score:
            player.lvl2Access = True
            changed           = True
        else:
            print(f"updatePlayer({player.name}): No level 1 score available")
    
    # Only modify lvl3Access if == False
    if not player.lvl3Access:
        # If score list is not empty, flip
        if player.lvl2Score:
            player.lvl3Access = True
            changed           = True
        else:
            print(f"updatePlayer({player.name}): No level 2 score available")
    
    # Only modify scorable if == False
    if not player.scorable:
        # If score list is not empty, flip
        if player.lvl3Score:
            player.scorable = True
            changed         = True
        else:
            print(f"updatePlayer({player.name}): No level 3 score available")
    
    # if scorable == True
    if player.scorable:
        totalTime        = 0
        totalTime       += player.lvl1Score.time
        totalTime       += player.lvl2Score.time
        totalTime       += player.lvl3Score.time
        player.highScore = totalTime
        changed          = True
    
    if changed:
        db.session.commit()
        print(f"updatePlayer({player.name}): Changes committed!")
    else:
        print(f"updatePlayer({player.name}): Nothing changed!")

# New received from API
# TODO: validate (on API-side) which & score-order
def updateScore(player, newScore, which):
    performUpdate = True
    which         = ((abs(which) - 1) % 3) + 1 # always 1, 2, or 3
    boolCheck     = None
    oldScore      = None

    # Which score are we checking against
    if which == 1:
        boolCheck = player.lvl2Access
        oldScore  = player.lvl1Score
    elif which == 2:
        boolCheck = player.lvl3Access
        oldScore  = player.lvl2Score
    else:
        boolCheck = player.scorable
        oldScore  = player.lvl3Score

    # Check if that score already exists
    if boolCheck:
        # extant oldScore.time, is newScore better?
        if not newScore < oldScore.time:
            # newScore isn't better
            print(f"updateScore({player.name}): High score {which} not beat!")
            performUpdate = False

    # skip if extant, not better
    if performUpdate:
        # newScore is better, or first score
        if oldScore:
            # newScore is better
            oldScore.time = newScore
            # TODO: DateTime value insert
        else:
            # first score
            # TODO: DateTime value insert
            if which == 1:
                db.session.add(Score1(ppk=player.pk, time=newScore))
            elif which == 2:
                db.session.add(Score2(ppk=player.pk, time=newScore))
            else:
                db.session.add(Score3(ppk=player.pk, time=newScore))
            
            # Save first score
            db.session.commit()
        
        # Log & updatePlayer()
        print(f"updateScore({player.name}): Score {which} updated!")
        updatePlayer(player)
    
    return performUpdate

def newPlayer(playerName):
    # Add player
    player = Player(name=playerName)
    db.session.add(player)
    db.session.commit()

    return player

def searchPlayer(playerName):
    return Player.query.filter_by(name=playerName).first()

def delPlayer(playerName):
    player = Player.query.filter_by(name=playerName).first()
    score1 = None
    score2 = None
    score3 = None

    if player:
        score1 = player.lvl1Score
        score2 = player.lvl2Score
        score3 = player.lvl3Score

        if score1:
            db.session.delete(score1)

        if score2:
            db.session.delete(score2)
        
        if score3:
            db.session.delete(score3)
        
        db.session.delete(player)
        db.session.commit()
        
        return True
    
    return False
