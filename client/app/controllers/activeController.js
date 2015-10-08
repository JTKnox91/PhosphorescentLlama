app.controller( 'ActiveController', ['$state', '$scope', 'httpFactory', '$rootScope', '$location' , function ( $state, $scope, httpFactory, $rootScope, $location ) {
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
    httpFactory.updateMatch($rootScope.currentMatchId.toString(), {
      currentMatchId: $rootScope.user.currentLevel,
      play: true
    });
  };

  $scope.targetSequencerPlayToggle = function ( ) {
    $rootScope.$broadcast( 'targetPlayToggle' );
  };

  $scope.submitMatch = function ( ) {
    $rootScope.$broadcast( 'submitMatch' );
    console.log('submitMatch button clicked');
    httpFactory.updateMatch($rootScope.currentMatchId.toString(), {
      currentLevel: $rootscope.user.currentLevel,
      fail: true
    });
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

  $scope.getMatchInfo = function () {
    httpFactory.getMatch($rootScope.currentMatchId)
    .then( function (matchInfo) {
      var user = matchInfo.users.find(function (user) {
        user._id === $rootScope.userid
      });
      var opp = matchInfo.users.find(function (user) {
        user._id !== $rootScope.userid
      });
      $scope.user.totalScore = matched.totalScore;
      $scope.user.plays = matched.plays;
      $scope.user.fail = matched.fails;
      $scope.user.oppScore = opp.totalScore;
    })
    .catch( function (error) {
      console.error(error);
    });
  };

  $scope.goToNewMatch = function () {
    $state.go('/new-match')
  };

  $scope.goToCurrentMatches = function () {
    $state.go('/matches');
  };

  $scope.forfeitMatch = function () { 
    httpFactory.updateMatch($rootScope.currentMatchId.toString(), {
      currentLevel: $rootScope.user.currentLevel,
      forfeit: true
    }).then(function (){
      this.goToCurrentMatches();
    });
  };

}]);
