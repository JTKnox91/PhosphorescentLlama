app.controller( 'ActiveController', ['$state', '$scope', 'httpFactory', '$rootScope', '$location', '$interval' , 'AuthFactory', 'initialize', function ( $state, $scope, httpFactory, $rootScope, $location, $interval, AuthFactory, initialize) {
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
    httpFactory.updateMatch($rootScope.currentMatchId, {
      currentLevel: $rootScope.user.currentLevel,
      play: true,
      fail: false,
      forfeit: false
    })
    .then( $rootScope.updateMatchInfo );
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

  $scope.getMatchInfo = function () {
    httpFactory.getMatch($rootScope.currentMatchId)
    .then( $rootScope.updateMatchInfo)
    .catch( function (error) {
      console.error("Error with httpFav.getMatch in scope.getMatchInfor", error);
    });
  };

  $scope.goToNewMatch = function () {
    $state.go('/new-match');
  };

  $scope.goToCurrentMatches = function () {
    $state.go('/matches');
  };


  $scope.forfeitMatch = function () {
    httpFactory.updateMatch($rootScope.currentMatchId, {
      currentLevel: $rootScope.user.currentLevel,
      forfeit: true
    })
    .then( function (matchInfo) {
      $scope.goToCurrentMatches();
    })
    .catch( function (error) {
      console.error(error);
    });
  };  

  $rootScope.updateMatchInfo = function (matchInfo) {
      var user = matchInfo.users.find(function (user) {
        return user.id._id.toString() === $rootScope.user.id;
      });
      var opp = matchInfo.users.find(function (user) {
        return user.id._id.toString() !== $rootScope.user.id;
      });
      $rootScope.user.totalScore = user.totalScore;
      $rootScope.user.plays = user.plays;
      $rootScope.user.fails = user.fails;
      $rootScope.user.currentLevel = user.currentLevel;
      $rootScope.currentLevel = user.currentLevel;
      $rootScope.user.oppScore = opp.totalScore;
      initialize($rootScope.startLevel);
  };
}]);
