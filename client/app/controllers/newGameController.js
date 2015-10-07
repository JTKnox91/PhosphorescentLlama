// var app = angular.module('app', []);

app.controller( 'NewGameController', [ '$scope', '$httpFactory', function ( $scope ) {

$scope.users = ['JT','Juni', 'Dan', 'Niraj'];

$scope.challenge = function (user) {
  $httpFactory.newMatch(user._id);
}

$scope.getUsers = function () {
  $httpFactory.getAllUsers().then(function (users) {
    $scope.users = users;
  });
}

}]);