app.controller('NavController', [ '$scope', 'AuthFactory', '$rootScope', '$state' , function ( $scope, AuthFactory, $rootScope, $state ) {

  $scope.login = function ( ) {
    AuthFactory.login($scope.user)
      .then(function () {
        $state.go('/game');
      });
  };

  $scope.signup = function ( ) {
    AuthFactory.signup($scope.user)
      .then(function () {
        $state.go('/game');
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
