var Sequence = function( soundID, tickNumber, track ) {

  this._beats = [];

  this._soundID = soundID;

  // A track is an instance

  // of a bus that is dedicated

  // to a single sequence.

  this._track = track;

  window.context._generators[ this._soundID ].connect( this._track );

  for ( var i = 0 ; i < tickNumber; i ++ ) {

    this._beats.push( new Beat( soundID, this) );

  }

};

Sequence.prototype.getSoundID = function( ) {

  return this._soundID;

};

Sequence.prototype.delete = function( ) {

  window.context._generators[ this._soundID ].disconnect( );

  this._track.disconnect( );

};

