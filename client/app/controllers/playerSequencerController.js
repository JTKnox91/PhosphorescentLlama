app.controller( 'PlayerSequencerController', [ '$scope', 'playerSequencer', '$timeout', function ( $scope, playerSequencer, $timeout ) {

  //change tickNumber to word so that CSS class works properly
  var numToWord = {

    '4': 'four',

    '8': 'eight',

    '16': 'sixteen'

  };

  //listens for event and creates empty player sequencer that matches target sequencer's parameters
  //sets pointer to sequences as property of playerSequencer Controller (for ng-repeat to work)
  //sets beatClass for proper rendering
  //sends playerSequencer back to gameController
  $scope.$on( 'createPlayerSequencer', function( event, data ) {

    $scope.tickNumber = data.getTickNumber( );

    var tempo = data.getTempo( );

    var soundIDs = data.getSoundIDs( );

    $scope.sequencer = playerSequencer.build( tempo, $scope.tickNumber, soundIDs );

    $scope.sequences = $scope.sequencer._sequences;

    $scope.sequencer.beatClass = numToWord[ $scope.tickNumber ];

    $scope.$emit( 'madePlayerSequencer', $scope.sequencer );

  });

  $scope.$on( 'playerStopPlaying', function ( ) {

    $scope.stop( );

  });

  $scope.$on( 'toggleWrongBeatsOff', function ( event, wrongBeats ) {

    for( var i = 0; i < wrongBeats.length; i++ ) {

      $scope.toggleBeat( wrongBeats[ i ][ 0 ], wrongBeats[ i ][ 1 ] );

    }

  });

  $scope.$on( 'playToggle', function ( ) {

    $scope.playToggle( );

  });

  $scope.currentColumn = 0;

  $scope.playToggle = function ( ) {

    if ( $scope.sequencer._playing ) {

      $scope.stop( );

    } else {

      $scope.sequencer.play( $scope.animateLoop );

      $scope.$emit( 'playerSequencerPlaying' );

    }

  };

  $scope.animateLoop = function ( time ) {

    $timeout( function( ) {
      
      var selector = '.' + $scope.currentColumn;

      for( var i = 0; i < $scope.tickNumber; i++ ) {

        var unselector = '.' + i;

        if( unselector !== selector ) {

          $(unselector).removeClass('current');
          
        } else {

          $(selector).addClass('current');
          
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

  };

}]);