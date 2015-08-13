define([ 'wreqr' ],
  function( Wreqr ) {
    var EventBus = new Wreqr.EventAggregator();
    return EventBus;
  }
);
