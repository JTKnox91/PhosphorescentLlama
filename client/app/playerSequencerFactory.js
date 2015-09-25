app.factory('playerSequencer', function () {

  //create new empty sequencer for the player
  return {
    build: function ( tempo, tickNumber, soundIDs ) {
      return new Sequencer( tempo, tickNumber, soundIDs );
    }
  };

});
