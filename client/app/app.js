var app = angular.module( 'app', [ 'ui.router', 'ngAnimate'] );
app.config( function ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
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
      authenticate: true
    })
    .state('/matches', {
      views: {
        content: {
          templateUrl: 'client/views/currentMatchesView.html',
          controller: 'currentMatchesController',
        }
      },
      url: '/matches',
      authenticate: true
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
      url: '/game',
      authenticate: true
    });

});

app.run(function ($state, $rootScope, $location, AuthFactory) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    AuthFactory.isAuthenticated(function(loggedIn) {
      if (toState.authenticate && !loggedIn) {
        event.preventDefault();
        $state.go('/login');
      }
    });
  });
});
