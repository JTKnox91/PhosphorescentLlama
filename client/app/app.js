var app = angular.module( 'app', [ 'ui.router', 'ngAnimate'] );
app.config( function ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
  $stateProvider
    .state( '/login', {
      views: {
        content: {
          templateUrl: 'client/views/login.html',
          controller: 'NavController',
         }
      },
      url: '/login'
    })
    .state('/new-match', {
      views: {
        content: {
          templateUrl: 'client/views/newMatchView.html',
          controller: 'NewMatchController',
        }
      },
      url: '/new-match',
    })
    .state('/matches', {
      views: {
        content: {
          templateUrl: 'client/views/currentMatchesView.html',
          controller: 'currentMatchesController',
        }
      },
      url: '/matches',
    })
    .state( '/game', {
      views: {
        nav: {
          templateUrl: 'client/views/activeView.html',
          controller: 'ActiveController'
        },
        content: {
          templateUrl: 'client/views/gameView.html',
          controller: 'GameController'
        }
      },
      url: '/game'
    });
});

// app.run( [ '$rootScope', 'httpFactory', '$location' , function ( $rootScope, httpFactory, $location ) {
//   $rootScope.$on( '$locationChangeSuccess', function ( ) {
//     httpFactory.getUser( function ( response ) {
//       if( response.status === 200 ) {
//         if( response.headers( 'username' ) ) {
//           $rootScope.user = {};
//           $rootScope.user.username = response.headers( 'username' );
//         }
//         $location.path( response.data );
//       }
//     });
//   });
// }]);
