// var app = angular.module('app', []);

app.controller( 'NewMatchController', [ '$scope', '$state', '$rootScope', 'httpFactory', function ( $scope, $state, $rootScope, httpFactory ) {

$scope.users;

$scope.challenge = function (user) {
  console.log(user);
  httpFactory.newMatch(user._id).then(function (matchId) {
    $rootScope.currentMatchId = matchId;
    $state.go('/game');
  });
};

$scope.getUsers = function () {
  httpFactory.getAllUsers().then(function (users) {
    console.log($rootScope.userId);
    $scope.users = users;
  });
};

}]);