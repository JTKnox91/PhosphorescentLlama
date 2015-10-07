app.controller( 'TargetSequencerController', [ '$scope', '$timeout' , function (  $scope, $timeout ) {

  /////////////////
  //
  //
  // FUNCTIONS
  //
  //
  /////////////////

  $scope.playToggle = function ( ) {

    if ( $scope.sequencer._playing ) {

      $scope.sequencer.stop( );

    } else {

      $scope.sequencer.play( );

      $scope.$emit( 'targetSequencerPlaying' );

    }

  };

  $scope.playTwice = function ( time ) {

    $timeout( function( ) {

      $scope.loopTick++;

      if( ( $scope.loopTick % $scope.sequencer.getTickNumber() ) === 0 ) {

        $scope.count++;

      }

      if( $scope.count === 2 ) {

        $scope.sequencer.stop( );

      }

    }, time );

  };
  
  /////////////////
  //
  //
  // EVENT HANDLERS
  //
  //
  /////////////////

  //listens for event and creates targetSequencer from server data
  //sends targetSequencer back to gameController
  $scope.$on( 'createTargetSequencer', function( event, response ) {

    if( $scope.sequencer ) {

      $scope.sequencer.delete( );

    }

    $scope.sequencer = Sequencer.prototype.retrieve( response.data );

    $scope.$emit( 'madeTargetSequencer', $scope.sequencer );

    $scope.count = 0;

    $scope.loopTick = 0;

    $scope.numSequencers = $scope.sequencer._sequences.length;

  });

  $scope.$on( 'targetStopPlaying', function ( ) {

    $scope.sequencer.stop( );

  });

  $scope.$on( 'playTwice', function ( ) {

    $scope.sequencer.play( $scope.playTwice );

  });

  $scope.$on( 'destroySequencers', function ( ) {

    $scope.sequencer.stop( );

    delete $scope.sequencer;

  });

  $scope.$on( 'targetPlayToggle' , function ( ) {

    $scope.playToggle( );

  });


}]);
