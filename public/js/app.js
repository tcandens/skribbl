define('app',
  [ 'marionette', 'backbone', 'eventbus', 'router', 'rootview' ],
  function( Marionette, Backbone, EventBus, Router, RootView ) {
    var App = Marionette.Application.extend({
      onBeforeStart: function() {
        var router = new Router();
      },
      onStart: function() {
        Backbone.history.start();
      }
    });
    return App;
  }
);
