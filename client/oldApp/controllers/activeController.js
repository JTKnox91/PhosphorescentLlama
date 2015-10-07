app.controller( 'ActiveController', ['$scope', 'httpFactory', '$rootScope', '$location' , function ( $scope, httpFactory, $rootScope, $location ) {

  $scope.logout = function ( ) {

    httpFactory.logout( function ( response ) {

      $rootScope.user = null;

      if( response.status === 200 ) {

        $location.path( response.data );

        $rootScope.$broadcast( 'destroySequencers' );

      }

    });

  };

  $scope.playerSequencerPlayToggle = function ( ) {

    $rootScope.$broadcast( 'playToggle' );

  };

  $scope.targetSequencerPlayToggle = function ( ) {

    $rootScope.$broadcast( 'targetPlayToggle' );

  };

  $scope.submitMatch = function ( ) {

    $rootScope.$broadcast( 'submitMatch' );

  };

  $scope.playing = true;

  $scope.playOrStop = function ( ) {

    if ($scope.playing) {

      $scope.playing = false;

      return $scope.playing;

    } else {

      $scope.playing = true;

      return $scope.playing;

    }

  };

}]);
