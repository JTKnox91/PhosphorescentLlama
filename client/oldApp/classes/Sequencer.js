var Sequencer = function( tempo, tickNumber, soundIDs ) {

  this._soundIDs = soundIDs;

  this._sequences = [];

  // A master is an instance

  // of a bus that is dedicated

  // to several tracks.

  this._master = new Bus( context.destination );

  for ( var i = 0; i < soundIDs.length; i ++ ) {

    this._sequences.push( new Sequence(

      soundIDs[i] ,

      tickNumber,

      new Bus( this._master.getInput() ).getInput()

    ));

  }

  this._playing = false;

  this._tempo = tempo || 120;

  this._currentTick = 0;

  this._lastTickTime = context.currentTime;

};

Sequencer.prototype.getTempo = function( ) {

  return this._tempo;

};

Sequencer.prototype.getTickNumber = function( ) {

  return this._sequences[0]._beats.length;

};

Sequencer.prototype.getSoundIDs = function( ) {

  return this._soundIDs;

};

Sequencer.prototype.play = function( onTickSchedule ) {

  // begin playing sequences from the

  // first tick.

  // onTickSchedule will be called

  // with the scheduleTime:

  // onTickSchedule = function( scheduleTime ) { ... }

  onTickSchedule = onTickSchedule || function( ) { };

  if ( !this._playing ) {

    this._playing = !this._playing;

    this._currentTick = 0;

    this._lastTickTime = context.currentTime - 60 / this._tempo;

    this.scheduleTicks( onTickSchedule );

  }

};

Sequencer.prototype.stop = function( ) {

  // stops playback and loses track of

  // current tick.

  if ( this._playing ) {

    this._playing = !this._playing;

  }

};

Sequencer.prototype.save = function( ) {

  // returns JSON string that represents

  // the sequence.

  // sequences should be able to be constructed

  // from one such JSON string.

  var data = {

    "tempo": this.getTempo(),
    
    "tickNumber": this.getTickNumber(),
    
    "soundIDs": this.getSoundIDs(),

    "sequences": {}
  
  };

  for ( var i = 0; i < this._sequences.length; i++ ) {

    var ithSequence = this._sequences[ i ];

    data.sequences[ithSequence.getSoundID( )] = [];

    for ( var j = 0; j < ithSequence._beats.length; j++ ) {

      var jthBeat = ithSequence._beats[ j ];

      data.sequences[ithSequence.getSoundID( )][ j ] =

        {

          "isOn": jthBeat.isOn( )

        };

    }

  }

  return JSON.stringify( data );

};

Sequencer.prototype.retrieve = function( data ) {

  var sequencer = new Sequencer(data.tempo, data.tickNumber, data.soundIDs );

  _.each(data.sequences, function(sequenceInformation, soundID) {

    _.each(sequencer._sequences, function(sequence) {

      if ( sequence.getSoundID( ) === soundID ) {

        _.each( sequence._beats, function( beat, index ) {

          if( sequenceInformation[ index ].isOn ) {

            beat.toggle( );

          }

        });

      }

    });

  });

  return sequencer;

};

Sequencer.prototype.match = function( sequencer ) {

  // Returns true if and only if all the beats

  // in this have the same state as the corresponding

  // beats in sequencer.

  // First check if the two sequences have the same tempo.

  if( this.getTempo( ) !== sequencer.getTempo( ) ) {

    return false;

  }

  // Then check if the two sequences have the same number of ticks

  if( this.getTickNumber( ) !== sequencer.getTickNumber( ) ) {

    return false;

  }

  // Then check if the two sequences have the same SoundIDs

  var haveSameIDs = _.every( this.getSoundIDs( ), function( soundID ) {

    return _.contains( sequencer.getSoundIDs( ), soundID );

  });

  if( !haveSameIDs ) {

    return false;

  }

  var match;

  for( var offset = 0; offset < this.getTickNumber( ); offset++ ) {

    match = true;

    for( var i = 0; i < this._sequences.length; i++ ) {

      var ithSequenceOnThis = this.getSequence( i );

      var ithSoundIDOnThis = ithSequenceOnThis.getSoundID( );

      for( var j = 0; j < sequencer._sequences.length; j++ ) {

        var jthSequenceOnSequencer = sequencer.getSequence( j );

        var jthSoundIDOnSequencer = jthSequenceOnSequencer.getSoundID( );

        if( ithSoundIDOnThis === jthSoundIDOnSequencer ) {

          for( var k = 0; k < this.getTickNumber( ); k++ ) {

            if( this.getBeat( i, k ).isOn( ) !== sequencer.getBeat( j, ( k + offset ) % this.getTickNumber( ) ).isOn( ) ) {

              match = false;

            }

          }

        }

      }

    }

    if( match ) {

      return match;

    }

  }

  return match;

};

Sequencer.prototype.getSequence = function( sequenceIndex ) {

  // returns a sequence instance
  return this._sequences[ sequenceIndex ];

};

Sequencer.prototype.getBeat = function( sequenceIndex, beatIndex ) {

  // returns a beat instance
  return this.getSequence( sequenceIndex )._beats[ beatIndex ];

};

Sequencer.prototype.toggleBeat = function( sequenceIndex, beatIndex ) {

  this.getBeat( sequenceIndex, beatIndex ).toggle( );

};

Sequencer.prototype.scheduleTicks = function( onTickSchedule ) {

  // This method schedules both the next

  // iteration of itself in 25 ms and all of the

  // ticks to be played in the next 100 ms.

  // Only two things within this function

  // should ever be changed: the windowLength

  // and the timeout. The timeout should always

  // be smaller than the window length. Otherwise,

  // this function would become an unnecessarily

  // convoluted way of scheduling events imprecisely.

  // For that, we have setTimeout.

  // WARNING: windowLength is is seconds even though

  // timeout is in milliseconds!!!

  if ( this._playing ) {

    var windowLength = 0.1; // seconds or 100 milliseconds.

    var timeout = 25; // milliseconds

    var windowEndTime = context.currentTime + windowLength;

    setTimeout(this.scheduleTicks.bind(this, onTickSchedule), timeout);

    while ( this._lastTickTime + 60 / this._tempo < windowEndTime ) {

      for ( var i = 0; i < this._sequences.length; i ++ ) {

        var beatToBeChecked = this.getBeat(i, this._currentTick);

        if ( beatToBeChecked.isOn() ) {

          beatToBeChecked.play( this._lastTickTime + 60 / this._tempo );

        }

      }

      onTickSchedule( this._lastTickTime + 60 / this._tempo - context.currentTime );

      this._lastTickTime = this._lastTickTime + 60 / this._tempo;

      this._currentTick  = ( this._currentTick + 1 ) % this.getTickNumber( );

    }

  }

};

Sequencer.prototype.delete = function( ) {

  this._sequences.forEach( function( sequence ) {

    sequence.delete( );

  });

  this._master.disconnect( context.destination );

};
