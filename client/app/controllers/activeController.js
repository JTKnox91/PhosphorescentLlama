<<<<<<< Updated upstream
app.controller( 'ActiveController', ['$state', '$scope', 'httpFactory', '$rootScope', '$location', 'AuthFactory' , function ( $state, $scope, httpFactory, $rootScope, $location, AuthFactory ) {
=======
app.controller( 'ActiveController', ['$state', '$scope', 'httpFactory', '$rootScope', '$location', '$interval' , 'AuthFactory', function ( $state, $scope, httpFactory, $rootScope, $location, $interval, AuthFactory) {
  $scope.minutes = 0;
  $scope.seconds = '00';

  var timer = $interval(function() {
      if ($scope.seconds == '59') {
        $scope.minutes++;
        $scope.seconds = '00';
      } else {
        if( (Number($scope.seconds) + 1) < 10 ) {
          $scope.seconds = '0' + (Number($scope.seconds) + 1);
        } else {
          $scope.seconds = (Number($scope.seconds) + 1);
        }
      }
    }, 1000);

>>>>>>> Stashed changes
  $scope.logout = function ( ) {
    AuthFactory.logout()
      .then(function (res) {
        if(res.status === 200){
          $state.go('/login');
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
<<<<<<< Updated upstream
=======
    httpFactory.updateMatch($rootScope.currentMatchId.toString(), {
      currentLevel: $rootscope.user.currentLevel,
      fail: true
    })
    .then( function (res) {
      console.log('Success');
    })
    .catch( function (error) {
      console.error(error);
    });
>>>>>>> Stashed changes
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
        return user._id === $rootScope.userId;
      });
      var opp = matchInfo.users.find(function (user) {
        return user._id !== $rootScope.userId;
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
    $state.go('/new-match');
  };

  $scope.goToCurrentMatches = function () {
    $state.go('/matches');
  };

}]);
