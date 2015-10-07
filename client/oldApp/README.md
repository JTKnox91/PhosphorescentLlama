App
===

App.js
------

Classes
-------

See Classes README.

Controllers
-----------

### activeController

#### Dependencies

$scope, httpFactory, $rootScope, $location

#### Methods

##### logout

Input: None

Output/Behavior: logout sets the user property on the $rootScope to null, then makes a call to the server to end the session. Upon a response, logout rerenders the view and broadcasts to the player and target sequencers to destroy the old ones (to prevent lag).

##### playerSequencerPlayToggle

Input: None

Output/Behavior: playerSeqeuncerPlayToggle broadcasts to the playerSequencerController to toggle its play state.

##### targetSequencerPlayToggle

Input: None

Output/Behavior: targetSequencerPlayToggle broadcasts to the targetSequencercontroller to toggle its play state.

##### submitMatch

Input: None

Output/Behavior: submitMatch tells the gameController to check for a match between the playerSequencer and the targetSequencer.

##### playOrStop

Input: None

Output/Behavior: playOrStop returns the play state of the playerSequencerController

#### Event Handlers

None

### gameController

#### Dependencies

$scope, playerSequencer, httpFactory, initialize

#### Methods

##### startLevel

Input: None.

Output/Behavior: startLevel makes a call to getSequencer to load the level's sequencer and start the level.

##### getSequencer

Input: None

Output/Behavior: getSequencer makes a call to the server for the current level's target sequencer and upon receit, broadcasts the data to the targetSequencerController so it can create the targetSequencer.

##### playerSequencerPlayToggle

Input: None

Output/Behavior: playerSequencerPlayToggle broadcasts to the playerSequencerController that it should toggle its play state.

##### submit

Input: None

Output/Behavior: submit stops both the player and target sequencers, then compares them to see if they match. If so, submit calls the playerWonLevel function. If not, submit calls the failedMatch function.

##### playerWonLevel

Input: None

Output/Behavior: playerWon first checks to see if the level was the last level; if so, the player won the game and playerWon calls playerWonGame. Else, it displays the result of the submit to the player. It increments the level, and if the player is signed in, it increments their best level and saves it to the server. It then starts the next level.

##### failedMatch

Input: None

Output/Behavior: failedMatch displays the result of the submit to the player.

#### Event Handlers

##### madeTargetSequencer

Behavior: Upon hearing that the targetSequencer was created, the gameConroller sets the targetSequencerController's target sequencer as a property on the gameController. Then it broadcasts the event to play the target sequencer twice, and broadcasts the event to create the playerSequencer.

##### madePlayerSequencer

Behavior: Upon hearing that the playerSequencer was created, the gameController sets the playerSequencerController's player sequencer as a property on the gameController.

##### targetSequencerPlaying

Behavior: Upon hearing that the targetSequencer is playing, the gameController broadcasts to the playerSequencerController to stop playing so that the sequencers don't overlap.

##### playerSequencerPlaying

Behavior: Upon hearing that the playerSequencer is playing, the gameController broadcasts to the playerSequencerController to stop playing so that the sequencer's don't overlap.

##### submitMatch

Behavior: Upon hearing that the player has submitted their sequencer, the gameController calls its submit function.



### navController

#### Dependencies

$scope, httpFactory, $rootScope, $location

#### Methods

##### login

Input: None

Output/Behavior: login makes a call to the server and submits the user's login information. If the call  successful, it sets the user's information on the $rootScope as a user property and rerenders.

##### signup

Input: None

Output/Behavior: signup makes a call to the server and submits the user's signup information. If the call is successful, it set's the user's information on the $rootScope as a user property, initializes their level to 1, and rerenders.

##### playerSequencerPlayToggle

Input: None

Output/Behavior: playerSeqeuncerPlayToggle broadcasts to the playerSequencerController to toggle its play state.

##### targetSequencerPlayToggle

Input: None

Output/Behavior: targetSequencerPlayToggle broadcasts to the targetSequencercontroller to toggle its play state.

##### submitMatch

Input: None

Output/Behavior: submitMatch tells the gameController to check for a match between the playerSequencer and the targetSequencer.

##### playOrStop

Input: None

Output/Behavior: playOrStop returns the play state of the playerSequencerController


#### Event Handlers

None


### playerSequencerController

#### Dependencies

$scope, playerSequencer, $timeout

#### Methods

##### playToggle

Input: None

Output/Behavior: Toggles playerSequencer play state.

##### animateLoop

Input: Time - the time at which the next beat should receive its class indicating that it is currently playing.

Output/Behavior: animateLoop adds a .current class to the divs that are currently playing in the loop.

##### stop

Input: None

Output/Behavior: stop stops the playerSequencer fromplaying and resets the current column (related to rendering the current beat) to zero.

##### toggleBeat

Input: sequenceIndex: index of the sequencer of the beat the user clicked.

beatIndex: index of the beat the user clicked.

Output/Behavior: Toggles the beat the user clicked.


#### Event Handlers

##### createPlayerSequencer

Input: Event: the event that triggered the broadcast.

Data: the targetSequencer

Behavior: createPlayerSequencer uses the information from the targetSequencer to construct a new empty sequencer for the player, deleting the previous one if necessary. It sets the resulting sequencer on its scope, and emits an event that the player sequencer has been created, passing on the scope sequencer.

##### playerStopPlaying

Input: None

Behavior: Stops its sequencer from playing.

##### playToggle

Input: None

Behavior: Toggles its sequencer's play state.

##### destroySequencers

Input: None

Behavior: Stops its sequencer and deletes it.

### targetSequencerController

#### Dependencies

$scope, $timeout

#### Methods

##### playToggle

Input: None

Output/Behavior: Toggles its sequencer's play state.

##### playTwice

Input: Time that the sequencer should start playing

Output/Behavior: Plays the target sequencer twice. It is called at the beginning of the level.

#### Event Handlers

##### createTargetSequencer

Input: Event: the event that broadcast this command.

Response: the response from the server containing the data to make the level's target sequencer.

Output/Behavior: Upon receiving the level information, the targetSequencerController constructs a new sequencer and sets it on its scope, destroying the old one if necessary. It then emits an event back saying that the targetSequencer was created, and passes the sequencer on to the listener.

##### targetStopPlaying

Input: None

Output/Behavior: Stops its sequencer from playing.

#####

Input: Output/Behavior

##### playTwice

Input: None

Output/Behavior: Plays its sequencer and passes in the play twice command.

##### destroySequencers

Input: None

Output/Behavior: Stops its sequencer from playing and deletes its sequencer.

##### targetPlayToggle

Input: None

Output/Behavior: Toggles its sequencer's play state.

Factories
---------

### httpFactory

#### Dependencies

$http

Behavior: Returns a request object that holds the methods for interacting with the server.

#### Methods

##### getSequencer

Input: level: current level on gameController

callback: passed in the from gameController

Output/Behavior: Makes a call to the server with the level and calls callback on the result.

##### postSequencer

Input: level: the level to post the sequencer to.

stringifiedSequencer: a stringified sequencer to post.

callback: a function that will be called on the response.

Output/Behavior: Posts a new level to the server.

##### putSequencer

Input: level: the level to update.

stringifiedSequencer: a stringified sequencer to post.

callback: a function that will be called on the response.

Output/Behavior: Updates an existing level on the server.

##### loginUser

Input: user: an object with the username and password from user input.

callback: a function that will be called on the response

Output/Behavior: Sends a user's login information to the server to start a session and log in.

##### signupUser

Input: user: an object with the username and password from user input.

callback: a function that will be called on the response

Output/Behavior: Sends a user's sign up information to the server to add them to the database, start a session, and sign them in.

##### updateLevel

Input: user: an object with the user's username and level.

callback: a function that will be called on the response

Output/Behavior: At the end of each level, sends the user's new best level to the server.

##### getUser

Input: callback: a function that will be called on the response

Output/Behavior: Makes a call to the server for user information.

##### logout

Input: callback: a function that will be called on the response

Output/Behavior: Tells the server to end the session and logs the user out.

### initializationFactory

#### Dependencies

#### Output/Behavior

#### Methods


### playerSequencerFactory

#### Dependencies

httpFactory

Behavior: Returns an object with methods that allow the playerSequencerFactory to create and interact with its playerSequencer object.

#### Methods

##### build

Input: tempo: the desired tempo of the sequencer

tickNumber: the desired tickNumber of the sequencer

soundIDs: the desired soundIDs of the sequencer, as an array of strings

Output/Behavior: Returns a new Sequencer with the above parameters.

##### store

Input: level: the desired level to store the sequencer as

savedSequencer: a stringified sequencer

Output/Behavior: Posts the sequencer to the server.

Synthesis
---------

See Synthesis README.
