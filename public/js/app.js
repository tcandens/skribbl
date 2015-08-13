define('app',
  [ 'marionette', 'backbone', 'eventbus', 'views/root' ],
  function( Marionette, Backbone, EventBus, RootView ) {
    var App = Marionette.Application.extend({
      rootView: new RootView(),
      onStart: function() {
        Backbone.history.start();
        var renderedRootView = this.rootView.render();
        EventBus.trigger('app:start');
      }
    });
    return App;
  }
);
