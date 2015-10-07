app.controller( 'PlayerSequencerController', [ '$scope', 'playerSequencer', '$timeout', function ( $scope, playerSequencer, $timeout ) {

  //change tickNumber to word so that CSS class works properly
  var numToWord = {
    '4': 'four',

    '8': 'eight',
    '16': 'sixteen'
  };

  $scope.currentColumn = 0;

  /////////////////
  //
  //
  // FUNCTIONS
  //
  //
  /////////////////

  $scope.playToggle = function ( ) {
    if ( $scope.sequencer._playing ) {
      $scope.stop( );
      for( var i = 0; i < $scope.tickNumber; i++ ) {
        var unselector = '.' + i;
        angular.element(unselector).removeClass('current');
      }
    } else {
      $scope.sequencer.play( $scope.animateLoop );
      $scope.$emit( 'playerSequencerPlaying' );
    }
  };

  $scope.animateLoop = function ( time ) {
    var element = angular.element;
    $timeout( function( ) {
      var selector = '.' + $scope.currentColumn;
      for( var i = 0; i < $scope.tickNumber; i++ ) {
        var unselector = '.' + i;
        if( unselector !== selector ) {
          element(unselector).removeClass('current');
        } else {
          element(selector).addClass('current');
        }
      }
      $scope.currentColumn = ( $scope.currentColumn + 1 ) % $scope.tickNumber;      
    }, time );
  };
  $scope.stop = function( ) {
    $scope.sequencer.stop( );
    $scope.currentColumn = 0;
  };

  //when player clicks button, toggle beat so it will play
  $scope.toggleBeat = function( sequenceIndex, beatIndex ) {

    $scope.sequencer.toggleBeat( sequenceIndex, beatIndex );

    // Plays beat when clicked
    // var beat = $scope.sequencer.getBeat( sequenceIndex, beatIndex ).play( 0 );

  };

  /////////////////
  //
  //
  // EVENT HANDLERS
  //
  //
  /////////////////

  //listens for event and creates empty player sequencer that matches target sequencer's parameters
  //sets pointer to sequences as property of playerSequencer Controller (for ng-repeat to work)
  //sets beatClass for proper rendering
  //sends playerSequencer back to gameController
  $scope.$on( 'createPlayerSequencer', function( event, data ) {
    $scope.tickNumber = data.getTickNumber( );
    var tempo = data.getTempo( );
    var soundIDs = data.getSoundIDs( );
    if( $scope.sequencer ) {
      $scope.sequencer.delete( );
    }
    $scope.sequencer = playerSequencer.build( tempo, $scope.tickNumber, soundIDs );
    $scope.sequences = $scope.sequencer._sequences;
    $scope.sequencer.beatClass = numToWord[ $scope.tickNumber ];
    $scope.$emit( 'madePlayerSequencer', $scope.sequencer );
  });
  $scope.$on( 'playerStopPlaying', function ( ) {
    $scope.stop( );
  });
  $scope.$on( 'playToggle', function ( ) {
    $scope.playToggle( );
  });
  $scope.$on( 'destroySequencers', function ( ) {
    $scope.sequencer.stop( );
    delete $scope.sequencer;
  });
}]);
