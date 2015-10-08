app.controller('NavController', [ '$scope', 'httpFactory', '$rootScope', '$state' , function ( $scope, httpFactory, $rootScope, $state ) {

  $scope.login = function ( ) {

    httpFactory.loginUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      if( response.status === 200 ) {

        $rootScope.user.username = response.headers( 'username' );

        $rootScope.user.level = response.headers( 'level' );

        $state.go('/game');

      }

    });

  };

  $scope.signup = function ( ) {

    httpFactory.signupUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      $rootScope.user.level = 1;

      $rootScope.user.username = response.headers( 'username' );

      if( response.status === 200 ) {

        $state.go('/game');

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
