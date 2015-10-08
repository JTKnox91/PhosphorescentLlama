app.factory( 'httpFactory', [ '$http', '$rootScope', function ( $http, $rootScope ) {

  //Sends request to server and retrieves sequencer for given level
  var httpFact = {};

  httpFact.getSequencer = function ( level, callback ) {
    return $http.get( '/levels/' + level.toString( ) )
      .then( function( res ) {
        if( callback ) {
          callback( res );
        }
      });
  };

  httpFact.postSequencer = function ( level, stringifiedSequencer, callback ) {
    return $http.post( '/levels/', { level: level, data: stringifiedSequencer } )
      .then( function ( res ) {
        if( callback ) {
          callback( res );
        }
      });
  };

  httpFact.putSequencer = function ( level, stringifiedSequencer, callback ) {
    return $http.put( '/levels/', { level: level, data: stringifiedSequencer } )
      .then( function ( res ) {
        if( callback ) {
          callback( res );
        }
      });
  };

  //////////////////////////
  ////  AUTHENTICATION  ////
  //////////////////////////

  httpFact.loginUser = function ( user ) {
    return $http.post( '/login', { username: user.username, password: user.password } );
  };

  httpFact.signupUser = function ( user ) {
    return $http.post( '/signup', { username: user.username, password: user.password } );
  };

  //TERRIBLY NAMED - THIS UPDATES A USER'S BEST LEVEL, NOT THE LEVEL ITSELF
  httpFact.updateLevel = function ( user, callback ) {
    return $http.put( '/users', { username: user.username, level: user.level } )
      .then( function ( res ) {
        if ( callback ) {
          callback( res );
        }
      });
  };

  httpFact.getUser = function ( callback ) {
    return $http.get( '/auth' );
  };

  httpFact.logout = function () {
    return $http.post( '/logout' );
  };

  ////////////////////////////////////////////////////
  // New methods for multiplayer Beats with Friends //
  ////////////////////////////////////////////////////

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

  httpFact.updateMatch = function (matchId, updateObj) {
    return $http.put('/match/'+ matchId, updateObj)
      .then(function (res) {
        return res.data;
      });
  };

  return httpFact;



}]);
