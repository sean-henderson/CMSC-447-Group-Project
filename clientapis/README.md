# Client-side exportable API functions

## Setup 
This directory's contents will need to be moved into any Node project so that the exportable functions may be utilized.

`package.json` may need to be combined with existing file.

Then, `npm install` within the directory.

## Usage
POST functions `newUser()`, `getUser()`, `scrUser()`, & `delUser()` all return JSON object Promises that must be resolved before use.
If the method failed for any reason, the resulting JSON's `err` value will be `true`, & an error message will be present in `errm`.
If `false`, then for all methods except `delUser()`, the resolved JSON object will contain the following user information:

```
{
    "pk":   intPrimaryKey,
    "name": "string player name",
    "Lvl1": bool,
    "Lvl2": bool,
    "Lvl3": bool,
    "High": int cumulative completion time in deciseconds,
    "Scr1": {
        "pk":   int primary key (child),
        "ppk":  int primary key (parent),
        "time": int level 1 completion time in deciseconds,
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    },
    "Scr2": {
        "pk":   int primary key (child),
        "ppk":  int primary key (parent),
        "time": int level 2 completion time in deciseconds,
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    },
    "Scr3": {
        "pk":   int primary key (child),
        "ppk":  int primary key (parent),
        "time": int level 3 completion time in deciseconds,
        "when": "str mm/dd/yyyy hh:mm:ss AM/PM (ET)"
    },
    "err":  false,
    "errm": ""
}
```

Keep in mind that SCORES CAN BE `null`! The default brand new player JSON object is this:
```json
{
    "pk":   1,
    "name": "name here",
    "Lvl1": false,
    "Lvl2": false,
    "Lvl3": false,
    "High": null,
    "Scr1": null,
    "Scr2": null,
    "Scr3": null,
    "err":  false,
    "errm": ""
}
```
Be sure to check for nullity or check the `Lvl` booleans for truth before attempting to access a given `Scr`.

### newUser(str name)
Creates a new player entity.
If the name is malformed (over 20 chars), or the player already exists, the resultant Promise will resolve to this JSON object:
```json
{
    "err":  true,
    "errm": "Invalid player name length/Username exists"
}
```
If successful, the Promise will resolve to the [full player JSON object](#Usage) of the new player.
Check that `err` is `false` before accessing other values.

### getUser(str name)
Searches an existing player entity (e.g. to resume play).
If the name is malformed (over 20 chars), or the player does not exist, the resultant Promise will resolve to this JSON object:
```json
{
    "err":  true,
    "errm": "Invalid player name length/Not found"
}
```
If successful, the Promise will resolve to the [full player JSON object](#Usage) of the requested player.
Check that `err` is `false` before accessing other values.

### scrUser(str name, int deciseconds, int 1-3)
Updates a player's score after completing a level.
Possible error messages include:
- "Invalid player name length" (>20 chars)
- "Invalid score" (negative)
- "Invalid level" (level < 1 or level > 3)
- "Player not found"
- "Level is not accessible" (player did not beat the prior level yet)
- "Score not better" (player's new score is not better than the old score for a given level)

In error-cases, the resultant Promise will resolve to this JSON object:
```json
{
    "err":  true,
    "errm": "detailed error message"
}
```
If successful, the Promise will resolve to the player's [full player JSON object](#Usage) with updated values.
Check that `err` is `false` before accessing other values.

### delUser(str name)
Deletes an existing player entity, including all high scores.
If the name is malformed (over 20 chars), or the player does not exist, the resultant Promise will resolve to this JSON object:
```json
{
    "err":  true,
    "errm": "Invalid player name length/No such player"
}
```
If successful, the player will be deleted & the Promise will resolve to:
```json
{
    "err": false,
    "errm": "Found & deleted"
}
```

### leaderB()
Returns the highest scoring players with their scores, up to five entries total. Takes the form:
```
{
  "data": [
    {
      "Group":         "J",
      "Title":         "Top 5 Scores",
      "playerName1st": int score,
      "playerName2nd": int score,
      "playerName3rd": int score,
      "playerName4th": int score,
      "playerName5th": int score
    }
  ],
  "err":  false,
  "errm": ""
}
```

## See also
`test.js` lists test cases of the export functions.
