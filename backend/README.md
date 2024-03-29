# Back end database & API

## Database
### Classes
**Player**
- `int pk`:          primary key (const)
- `str name`:        username (const)
- `bool lvl2Access`: Level 1 beaten? (one-time switch)
- `bool lvl3Access`: Level 2 beaten? (one-time switch)
- `bool scorable`:   Level 3 beaten? (one-time switch)
- `int highScore`:   Cumulative time in deciseconds [lower is better]
- `Score1 lvl1Score`:  1:1 lvl1Score object
- `Score2 lvl2Score`:  1:1 lvl2Score object
- `Score3 lvl3Score`:  1:1 lvl3Score object
- \+ getJSON():      JSON output
- \+ __repr__():     Print representation

**Score1, Score2, Score3**
- `int pk`:   primary key (child)
- `int ppk`:  player primary key (parent)
- `int time`: Time in deciseconds (extendable)
- `DateTime when`: Timestamp of score entry

### Utility Functions
- **updatePlayer(player)**: Internal function to update a Player entry anytime a Score is updated via updateScore().
- **updateScore(player, newScore, which)**: Update a **player**'s **new score** on the level for **which** the score was earned. Return `True` on success. Used in [`/score`](#score) API.
- **newPlayer(playerName)**: Create a new Player row from a given name. Return the created player on success. Used in [`/create`](#create) API.
- **searchPlayer(playerName)**: Find and return a Player row with the given name. Return None on not found. Used in [`/loaduser`](#loaduser) API.
- **delPlayer(playerName)**: Find and delete a Player row with the given name. Return `True` on success. Used in [`/delete`](#delete) API.
- **getLeaderboard()**: Generate a list of up-to 5 players in ascending order who have the best completion times. Send formatted per [spec](https://docs.google.com/document/d/1Gpnkp3MwqZgTIk5YkbYMRW6-g69R0THyHQW5jGE_9s8/edit).

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
Response format for [`/create`](#create), [`/loaduser`](#loaduser), and [`/score`](#score):
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
        "time": "int level 1 completion time in deciseconds",
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    },
    "Scr2": {
        "pk":   "int primary key (child)",
        "ppk":  "int primary key (parent)",
        "time": "int level 2 completion time in deciseconds",
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    },
    "Scr3": {
        "pk":   "int primary key (child)",
        "ppk":  "int primary key (parent)",
        "time": "int level 3 completion time in deciseconds",
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    }
}
```

### /leaderboard
`POST` method to receive leaderboard data.

**Input format**
```json
{}
```

**Responses**
- `200`: response.json contains output:

```json
{
    "data" : [ 
        {
            "Group": "<group letter>",
            "Title": "Top 5 Scores",
            "<1st Name>": "<1st score>",
            "<2nd Name>": "<2nd score>",
            "<3rd Name>": "<3rd score>",
            "<4th Name>": "<4th score>",
            "<5th Name>": "<5th score>"
        }
    ]
}
```
