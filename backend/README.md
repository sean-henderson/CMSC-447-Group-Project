# Back end database & API

## Database (work in progress)
### Classes
**Player**
- 

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
### /create
`POST` method to create a new Player. Specify Player **name**. On success, responds with the new Player's JSON to load into memory.

**Input format**
```json
{
    "name": "< 20 char string"
}
```

**Responses**
- `400`: *Malformed request* or *Invalid player name length*
- `422`: *Username exists*
- `201`: response.json contains output described in [getJSON()](#getjson)

### /loaduser
`POST` method to load an extant Player. Specify Player **name**. On success, responds with the chosen Player's JSON to load into memory.

**Input format**
```json
{
    "name": "< 20 char string"
}
```

**Responses**
- `400`: *Malformed request* or *Invalid player name length*
- `404`: *Not found*
- `200`: response.json contains output described in [getJSON()](#getjson)

### /delete
`POST` method to delete an extant Player. Specify Player **name**. On success, responds with *Found & deleted* (OK).

**Input format**
```json
{
    "name": "< 20 char string"
}
```

**Responses**
- `400`: *Malformed request* or *Invalid player name length*
- `404`: *No such player*
- `200`: *Found & deleted*

### /score
`POST` method to update an extant Player's score. Specify Player **name**, the new **score**, & the level for **which** the new score was earned. On success, responds with the updated Player's JSON to load into memory.

**Input format**
```json
{
    "name":  "< 20 char string",
    "score": "int in deciseconds",
    "which": "int 1-3"
}
```

**Responses**
- `400`:
  - *Malformed request*, or
  - *Invalid player name length*, or
  - *Invalid score*, or
  - *Invalid level*
- `404`: *Not found*
- `422`: *Score not better*
- `226`: response.json contains output described in [getJSON()](#getjson)

### getJSON()
Response format for `/create`, `/loaduser`, and `/score`:
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
