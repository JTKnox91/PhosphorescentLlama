// A bus is an abstraction that allows

// us to affect audio parameters of sequences

// uniformly but, if needed, independently.

// Furthemore, a bus is an abstraction

// that allows to affect audio parameters

// of other buses uniformly but, if needed,

// independently.

// The destination is the audio node

// to which all of the audio from the

// bus will be routed.

var Bus = function( destination ) {

  this._gainStage = context.createGain( );

  this._gainStage.gain = 1;

  this._gainStage.connect( destination );

};

Bus.prototype.disconnect = function( ) {

  this._gainStage.disconnect( );

}

Bus.prototype.getInput = function( ) {
  
  return this._gainStage;

};