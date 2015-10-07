var app = angular.module( 'app', [ 'ui.router', 'ngAnimate'] );

app.config( function ( $stateProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise( '/' );

  $stateProvider

    .state( '/', {

      views: {

        nav: {

          templateUrl: 'client/views/navView.html',

          controller: 'NavController'

        },

        content: {

          templateUrl: 'client/views/gameView.html',

          controller: 'GameController'

        }

      },

      url: '/'

    })

    .state( '/active', {

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

      url: '/active'
      
    });

});

app.run( [ '$rootScope', 'httpFactory', '$location' , function ( $rootScope, httpFactory, $location ) {

  $rootScope.$on( '$locationChangeSuccess', function ( ) {

    httpFactory.getUser( function ( response ) {

      if( response.status === 200 ) {

        if( response.headers( 'username' ) ) {

          $rootScope.user = {};

          $rootScope.user.username = response.headers( 'username' );

          $rootScope.user.level = response.headers( 'level' );

        }

        $location.path( response.data );

      }

    });

  });

}]);
