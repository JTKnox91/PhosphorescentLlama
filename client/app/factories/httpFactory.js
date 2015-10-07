app.factory( 'httpFactory', [ '$http', function ( $http ) {

  //Sends request to server and retrieves sequencer for given level
  var httpFact = {};

  httpFact.getSequencer = function ( level, callback ) {
    return $http.get( '/levels/' + level.toString( ) )
      .then( function( response ) {
        if( callback ) {
          callback( response );
        }
      });
  };

  httpFact.postSequencer = function ( level, stringifiedSequencer, callback ) {
    return $http.post( '/levels/', { level: level, data: stringifiedSequencer } )
      .then( function ( response ) {
        if( callback ) {
          callback( response );
        }
      });
  };

  httpFact.putSequencer = function ( level, stringifiedSequencer, callback ) {
    return $http.put( '/levels/', { level: level, data: stringifiedSequencer } )
      .then( function ( response ) {
        if( callback ) {
          callback( response );
        }
      });
  };

  httpFact.loginUser = function ( user, callback ) {
    return $http.post( '/login', { username: user.username, password: user.password } )
      .then( function ( response ) {
        if ( callback ) {
          callback( response );
        }
      });
  };

  httpFact.signupUser = function ( user, callback ) {
    return $http.post( '/signup', { username: user.username, password: user.password } )
      .then( function ( response ) {
        if ( callback ) {
          callback( response );
        }
      });
  };

  //TERRIBLY NAMED - THIS UPDATES A USER'S BEST LEVEL, NOT THE LEVEL ITSELF
  httpFact.updateLevel = function ( user, callback ) {
    return $http.put( '/users', { username: user.username, level: user.level } )
      .then( function ( response ) {
        if ( callback ) {
          callback( response );
        }
      });
  };

  httpFact.getUser = function ( callback ) {
    return $http.get( '/users' )
      .then( function ( response ) {
        if( callback ) {
          callback( response );
        }
      });
  };

  httpFact.logout = function ( callback ) {
    return $http.post( '/logout' )
      .then( function ( response ) {
        if ( callback ) {
          callback( response );
        }
    });
  };

  // New methods for multiplayer Beats with Friends
  httpFact.getAllUsers = function () {
    return $http.get('/users/all')
      .then(function (res) {
        return res.data;
      });
  };

  httpFact.getMatches = function () {
    return $http.get('/match')
      .then(function (res) {
        return res.data;
      });
  };

  httpFact.getMatch = function (matchId) {
    return $http.get('/match/'+matchId)
      .then(function (res) {
        return res.data;
      });
  };

  httpFact.newMatch = function (otherId) {
    return $http.post('/match', {otherId: otherId})
      .then(function (res) {
        return res.data;
      });
  };

  return httpFact;

}]);
