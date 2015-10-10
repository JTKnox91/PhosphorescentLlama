// var app = angular.module('app', []);

app.controller( 'NewMatchController', [ '$scope', '$state', '$rootScope', 'httpFactory', function ( $scope, $state, $rootScope, httpFactory ) {

$scope.users = [];

$scope.challenge = function (user) {
  console.log(user);
  httpFactory.newMatch(user._id).then(function (matchId) {
    $rootScope.currentMatchId = matchId;
    $state.go('/game');
  });
};

$scope.newMatch = function () {
  $state.go("/matches");
};

$scope.getUsers = function () {
  httpFactory.getAllUsers().then(function (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id !== $rootScope.user.id) {
        $scope.users.push(users[i]);
      }
    }
  });
};

}]);
