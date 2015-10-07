app.controller('currentMatchesController', ['httpFactory', function (httpFactory) {
  $scope.refresh = function () {
    httpFactory.getMatches()
      .then(function (data) {
        $scope.matches = data;
        $scope.$apply();
      });
  };
}]);
