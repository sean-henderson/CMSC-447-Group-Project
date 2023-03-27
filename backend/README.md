# Back end database & API

## Database
Playing around in python3 CLI (serious README coming soon):
```
from db import *
app.app_context().push()
db.create_all()
player1 = Player(name='Ursuul')
player2 = Player(name='Billy')
db.session.add(player1)

player1score1 = Score1(ppk=player1.pk, time=1200)
db.session.add(player1score1)

player1score2 = Score2(ppk=player1.pk, time=1800)
db.session.add(player1score2)

player1score3 = Score3(ppk=player1.pk, time=2100)
db.session.add(player1score3)

db.session.commit()

player1 = Player.query.first()
player2 = Player.query.all()[1]
score1  = Score1.query.first()
updatePlayer(player1)
updateScore(player2, 900, 1)

import json
print(player1.getJSON().json)
```
## API
getJSON() output format (success response of every API except `/delete`):
```json
{
    "pk":   "int primary key",
    "name": "string player name",
    "Lvl1": "bool",
    "Lvl2": "bool",
    "Lvl3": "bool",
    "High": "int cumulative completion time in deciseconds",
    "Scr1": {
        "pk":   "int primary key (child)",
        "ppk":  "int primary key (parent)",
        "time": "int level 1 completion time in deciseconds"
    },
    "Scr2": {
        "pk":   "int primary key (child)",
        "ppk":  "int primary key (parent)",
        "time": "int level 2 completion time in deciseconds"
    },
    "Scr3": {
        "pk":   "int primary key (child)",
        "ppk":  "int primary key (parent)",
        "time": "int level 3 completion time in deciseconds"
    }
}
```
