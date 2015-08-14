define('app',
  [ 'marionette', 'backbone', 'eventbus', 'router', 'rootview' ],
  function( Marionette, Backbone, EventBus, Router, RootView ) {
    var App = Marionette.Application.extend({
      rootView: new RootView(),
      onBeforeStart: function() {
        var router = new Router();
      },
      onStart: function() {
        Backbone.history.start();
        this.rootView.render();
      }
    });
    return App;
  }
);
