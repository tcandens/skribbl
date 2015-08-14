define([ 'backbone.radio' ],
  function( Radio ) {
    var EventBus = Radio.channel('global');
    return EventBus;
  }
);
