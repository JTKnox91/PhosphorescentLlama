Server:
=======

REST API:
---------

| Method | URL         | Request Body | Response Body |
|--------|-------------|--------------|---------------|
| POST   | /levels     | JSON string  | Empty         |
| PUT    | /levels     | JSON String  | Empty         |
| GET    | /levels/:id | Empty        | JSON string   |
| DELETE | /levels/:id | Empty        | Empty         |

### General
Inside the file `/server/controllers/levelsController.js`, there are four methods; getLevel, saveLevel, updateLeve, and deleteLevel. They are exported and used as the server API.

| Method | URL         | Purpose                  | Request Body         | Response Body     |
|--------|-------------|--------------------------|----------------------|-------------------|
| GET    | /match      | Get all matches for user | Empty                | Array of Matches  |
| POST   | /match      | Create new chat          | JSON String          | matchId           |
| GET    | /match/:id  | Get match details        | Empty                | Match info object |
| UPDATE | /match/:id  | Update single match      | Match options object | Match info object |

### Match options object

```json
currentLevel: Number
play: Boolean
fail: Boolean
forfeit: Boolean
endLevel: Boolean
```

| Method | URL         | Purpose                  | Request Body         | Response Body     | httpFactory method |
|--------|-------------|--------------------------|----------------------|-------------------|--------------------|
| GET    | /match      | Get all matches for user | Empty                | Array of Matches  | getMatches         |
| POST   | /match      | Create new chat          | JSON String          | matchId           | newMatch           |
| GET    | /match/:id  | Get match details        | Empty                | Match info object | getMatch           |
| UPDATE | /match/:id  | Update single match      | Match options object | Match info object | updateMatch        |

### Match options object
`currentLevel` is required. Other properties are optional.

```
currentLevel: Number
play: Boolean
fail: Boolean
forfeit: Boolean
success: Boolean
```

### Match info object

```
_id: String, matchId
open: Boolean, whether the match is still open
users: Array, [{
  username: String, name of user
  currentLevel: Number, the current level of the user
  levelScore: Number, score on current level
  totalScore: Number, total score for the match
  plays: Number, number of replays of the sequence for the level
  fails: Number, number of failed attempts at the game for the level
  won: Boolean, whether the user has won the game or not
}]
```

### GET to `/levels/:id`
getLevel method will handle a GET request made to `/levels/:id`. As a response, a corresponding sequencer data for the id will be retrieved from the database.

Retrieved sequencer data will be a JSON string, which can be parsed and used to instantiate a new sequencer. An example of the retrieved JSON string will look like this:

```
data =
"{
  "tempo":120,
  "tickNumber":4,
  "soundIDs":["kick","clap"],
  "sequences":{
    "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],
    "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]
  }
}"

var sequencer = Sequencer.prototype.retrieve(JSON.parse(data));
// Now we have a sequencer that corresponds to the sequencer that we stored at the level id.
```

### POST to `/levels`
saveLevel method will handle a POST request made to `/levels`. It will save a new sequencer to the database, with the level and data parsed from the user interface. The data to be posted will look like this:
```
request.body.level = 5;
request.body.data =
"{
  "tempo":120,
  "tickNumber":4,
  "soundIDs":["kick","clap"],
  "sequences":{
    "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],
    "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]
  }
}"
```


### PUT to `/levels`
updateLevel will handle a PUT request made to `/levels`. It will update an existing sequencer data with the new data parsed from the user interface with a particular id (level). The data to be updated will look likt this:

```
request.body.level = 5;
request.body.data =
"{
  "tempo":120,
  "tickNumber":4,
  "soundIDs":["kick","clap"],
  "sequences":{
    "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],
    "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]
  }
}"
```

### DELETE to `/levels/:id`
deleteLevel will handle a DELETE request made to `/levels/:id`. It will remove a sequencer data in the database of which the id is the number parsed from the user interface. The level id should be an integer that looks like this:

```
request.body.level = 5;
```
