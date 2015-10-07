Classes:
========

Table of Contents:
------------------

1.[Bus](#bus)

2.[Beat](#beat)

3.[Sequence](#sequence)

4.[Sequencer](#sequencer)

Bus:
----

### Input:

To be used with new keyword.
The first parameter is the audio node that
the output of the bus will be routed to.

### Output/behavior:

Returns a bus instance with an input property
such that, whenever an audio node is connected
to that input, the output of said node is routed
through each audio node in the bus.

### Methods:

#### bus.getInput:

##### Input:

No parameters.

##### Output:

Returns the first node in the bus' node chain.

#### bus.disconnect:

##### Input:

No parameters.

##### Behavior:

Disconnects the bus's output node all the nodes
that the bus's output is connected to.

### Example:

    var context = new AudioContext( );

    var osc = context.createOscillator( );

    osc.type = 'sine';

    osc.frequency.value = 440;

    var bus = new Bus( context.destination );

    osc.connect( bus.getInput( ) );

    osc.start( context.currentTime + 1 );

    osc.stop( context.currentTime + 2 );

Beat:
-----

### Input:

The first parameter is a soundID that the beat will
use to identify how to produce sounds on playback, the second
parameter is the sequence that the beat belongs to.
It is important for the beat to know what sequence it belongs
to in order to reference the appropriate bus track on playback.

### Output/behavior:

Returns a beat instance with a beat.isOn getter function
that indicates whether or not the beat is to be played on the
next scheduling loop.
Beat instances are not intended to be used anywhere other
than in the sequencer in a context that has the property
context._sampleBuffers which matches soundIDs to
audio buffers.

### Methods:

#### beat.isOn:

##### Input:

This method does not take any parameters.

##### Output/behavior:

Returns true if the beat should be played on the following scheduling loop.
Returns false otherwise.

#### beat.toggle:

##### Input:

This method does not take any parameters.

##### Output/behavior:

Negates whatever boolean value is held by beat_.isOn.

#### beat.play:

##### Input:

Takes one parameter that indicates the time, in seconds,
relative to the context's coordinate system at which
the appropriate sample should be schedules to start playing.

##### Output/behavior:

Schedules the beat's sound for time when on the Web Audio
API's run loop.

### Example:

    var context = new AudioContext( );

    context._sampleBuffers = [];

    var buffer = context.createBuffer( 1, 44100, 44100);

    var channel = buffer.getChannelData( 0 );

    for( var i = 0; i < 44100; i++ ) {

      channel[ i ] = Math.sin( i*440*Math.PI*2 / 44100 );

    }

    context._sampleBuffers[ 'sine' ] = buffer;

    // Don't worry about sequencer now. This is just

    // an easy way to find a beat that is properly connected

    // to other nodes in the audio context.

    var sequencer = new Sequencer( 120, 4, ['sine'] );

    var beat = sequencer.getBeat( 0, 0 );

    // Expect the beat to be off

    if( beat.isOn( ) ) {

      beat.play( context.currentTime + 1 );

    }

    beat.toggle( );

    //Expect the beat to be on

    if( beat.isOn( ) ) {

      beat.play( context.currentTime + 2 );

    }

    //That is, sine wave should start playing in 2 seconds.

Sequence:
---------

### Input:

The first parameter is the soundID that specifies the sound
of the beats in the sequence, the second parameter is the number
of ticks in the sequence (that is, how many beats there are for
each loop of the sequence), and the third parameter is the
sequence's bus track's input audio node. 

### Output/behavior:

Returns a sequence which is nothing but a collection of beats
along with information about the routing of the output
of each beat encapsulated in a track bus.
Note that all of the beats that comprise the sequence
play back the same sample. That is, beats in sequences
are associated to each by the sound that they play.
Like beats, sequences are intended to be used by
sequencers, not elsewhere.

### Methods:

#### sequence.getSoundID:

##### Input:

This method does not take any parameters.

##### Output/behavior:

Returns the soundID of the sound being played by
the beats in the sequence.

#### sequence.disconnect:

##### Input:

This methods does not take any parameters.

##### Behavior:

Disconnects the generator that corresponds to
the sequence's soundID from the sequence's track's input.
Moreover, disconnects the sequence's track.

### Example:

    var context = new AudioContext( );

    context._sampleBuffers = [];

    var buffer = context.createBuffer( 1, 44100, 44100);

    var channel = buffer.getChannelData( 0 );

    for( var i = 0; i < 44100; i++ ) {

      channel[ i ] = Math.sin( i*440*Math.PI*2 / 44100 );

    }

    context._sampleBuffers[ 'sine' ] = buffer;

    var sequencer = new Sequencer( 30, 4, ['sine'] );

    var sequence = sequencer.getSequence( 0 );

    // Just for the purpose of illustration,

    // this example accesses the _beats property of

    // sequence. However, this property is meant to

    // be hidden from anywhere other than the Sequencer

    // definition. Beats should be accessed through

    // the Sequencer.prototoype.getBeat method.

    sequence._beats[ 0 ].toggle( );

    sequence._beats[ 1 ].toggle( );

    sequence._beats[ 2 ].toggle( );

    sequence._beats[ 3 ].toggle( );

    sequencer.play( );

    // Should play a second long sine wave

    // every two seconds.

Sequencer:
----------

### Input:

The first parameter is the sequencer's
tempo as the number of beats played per minute,
the second parameter is the number of ticks in
each of the sequences of the sequencer, and
the third parameter is an array of sound IDs. Each
sound ID in the third parameter will be mapped to
a new sequence with as many ticks as the second
parameter.

### Output/behavior:

Returns a sequencer instace. Information about
the instance should be retrieved using it's getter
methods. Do not, for any means, mess with sequencer._lastBeatTime.

### Methods:

#### sequencer.getTempo:

##### Input:

This method does not take parameters.

##### Output/behavior:

Returns the sequencer's tempo in beats per minute.

#### sequencer.getTickNumber:

##### Input:

This method does not take parameters.

##### Output/behavior:

Returns the number of beats in each of the
sequencer's sequences.

#### sequencer.getSoundIDs:

##### Input:

This method does not take parameters.

##### Output/behavior:

Returns an array with one sound ID for
each sequence in the sequencer.

#### sequencer.getSequence:

##### Input:

The first parameter specifies the index
of the targeted sequence.

##### Output:

Returns the sequence at the sequence
index specified by the first parameter.

#### sequencer.getBeat:

##### Input:

The first parameter specifies the sequence's
index, and the second parameter specifies
the beat's index within that sequence.

##### Output:

Returns a the beat instance at the coordinates
specified by the parameters.

#### sequencer.toggleBeat:

##### Input:

The first parameter specifies the sequence's
index, and the second parameter specifies
the beat's index within that sequence.

#### Output:

Toggles the _isOn property of the beat
found by getBeat for the same arguments.

#### sequencer.play:

##### Input:

Takes in a callback function that will be
called each time a new tick is scheduled.
This callback function should handle
one parameters that represents the time between
the moment the callback is triggered and the moment
at which the sound was scheduled.
This is meant to be used along with setTimeout
to coordinate UI behavior with the progression
of the sequencer's music.

##### Output/behavior:

Begins playing the sequences in the sequencers
concurrently starting at beat 0.

#### sequencer.stop:

##### Input:

This method does not take a parameter.

##### Output/behavior:

Stops the playback of the sequences and
returns track header to beat 0.

#### sequencer.scheduleTicks:

##### Input:

The first parameter of this function is the same
callback function as is passed in to the play function.

#### Output/behavior:

This is where the groove's scheduled. It uses a combination
of setTimeout and beat.play in order to schedule musical
events precisely but not too far ahead in time. This is
meant to reduce lag between user interaction and musical
response.

#### sequencer.save:

##### Input:

This method does not take a parameter.

##### Output/behavior:

Returns the JSON stringified version of
an object that can be used by Sequencer.prototype.retrieve
to reconstruct the sequencer state that this method is called
upon.

#### sequencer.retrieve:

##### Input:

This method takes in a the object parsed from the string produced
by the sequencer.save method.

##### Output/behavior:

Returns a sequencer that is identical to the
sequencer on which sequencer.save was invoked
to produce the string that is passed in as the first
argument.

#### sequencer.match:

##### Input:

A sequencer instance.

##### Output/behavior:

Deeply compares this and the sequencer instance
passed in as an argument and returns true if and only
if both instances have the same tempo, the same number of
ticks, the same sound IDs and the same _isOn state on
each corresponding beat.

#### sequencer.getMatrix:

##### Input:

None.

##### Output/behavior:

Returns a matrix of the sequencer in its current state, where each row represents a sequence and each column represents a tick.

#### sequencer.getWrongBeats:

##### Input:

Another sequencer, assumed to be the target sequencer. The sequencer this function is called on is assumed to be the player sequencer.

##### Output/behavior:

Returns an array of beats that are on in the player sequencer but are not on in the target sequencer, represented as tuples with the sequence index and beat index of the wrong beats.

#### sequencer.delete:

##### Input:

This methods does not take any parameters.

##### Behavior:

Deletes each of the sequences in the sequencer and
disconnects the sequencer's master bus.

### Example:

    var context = new AudioContext( );

    context._sampleBuffers = [];

    var buffer440 = context.createBuffer( 1, 44100, 44100);

    var channel440 = buffer440.getChannelData( 0 );

    for( var i = 0; i < 44100; i++ ) {

      channel440[ i ] = Math.sin( i*440*Math.PI*2 / 44100 );

    }

    context._sampleBuffers[ 'sine440' ] = buffer440;

    var buffer880 = context.createBuffer( 1, 44100, 44100);

    var channel880 = buffer880.getChannelData( 0 );

    for( var i = 0; i < 44100; i++ ) {

      channel880[ i ] = Math.sin( i*880*Math.PI*2 / 44100 );

    }

    context._sampleBuffers[ 'sine880' ] = buffer880;

    var buffer220 = context.createBuffer( 1, 44100, 44100);

    var channel220 = buffer220.getChannelData( 0 );

    for( var i = 0; i < 44100; i++ ) {

      channel220[ i ] = Math.sin( i*220*Math.PI*2 / 44100 );

    }

    context._sampleBuffers[ 'sine220' ] = buffer220;

    var sequencer = new Sequencer( 60, 4, ['sine220', 'sine440', 'sine880' ] );

    sequencer.toggleBeat( 0, 0 );

    sequencer.toggleBeat( 1, 1 );

    sequencer.toggleBeat( 2, 2 );

    sequencer.toggleBeat( 1, 3 );

    sequencer.play( );

    var copy = Sequencer.prototype.retrieve( sequencer.save( ) );

    console.log( sequencer.match( copy ) ); //-> true


