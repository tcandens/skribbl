define([ 'wreqr' ],
  function( Wreqr ) {
    var EventBus = Wreqr.radio.channel('global');
    return EventBus;
  }
);
