app.controller( 'ViewController', [ '$scope', '$timeout', '$rootScope', function ( $scope, $timeout, $rootScope ) {

	$scope.wrong = false;

	$scope.won = false;

	$scope.match = false;

	$scope.declareWrong = function ( ) {

		$scope.wrong = true;

		$timeout( function ( ) {

			$scope.wrong = false;

		}, 500);

	};

	$scope.declareMatch = function ( ) {

		$scope.match = true;

		$timeout( function ( ) {

			$scope.match = false;

		}, 500);

	};

	$scope.$on( 'correctMatch', function ( ) {

		$scope.declareMatch( );

	});

	$scope.$on( 'notAMatch', function ( ) {

		$scope.declareWrong( );

	});

	$scope.$on( 'playerWon' , function ( ) {

		$scope.won = true;

	});



}]);
