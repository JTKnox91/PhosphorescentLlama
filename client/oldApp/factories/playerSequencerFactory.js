app.factory( 'playerSequencer', [ 'httpFactory', function ( httpFactory ) {

  //create new empty sequencer for the player
  return {

    build: function ( tempo, tickNumber, soundIDs ) {

      return new Sequencer( tempo, tickNumber, soundIDs );

    },

    store: function ( level, savedSequencer, callback ) {

      httpFactory.postSequencer( level, savedSequencer, callback );

    }

  };

}]);
