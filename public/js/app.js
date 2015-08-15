define('app',
  [ 'marionette', 'backbone', 'eventbus', 'router', 'views/rootview', 'views/currentskribble' ],
  function( Marionette, Backbone, EventBus, Router, RootView, CurrentSkribbleView ) {
    'use strict';

    var App = Marionette.Application.extend({
      rootView: new RootView(),
      onBeforeStart: function() {
        var router = new Router();
      },
      onStart: function() {
        this.rootView.render();
        Backbone.history.start();
      },
      onBeforeShow: function() {
        this.showChildView('content', new CurrentSkribbleView() );
      }
    });
    return App;
  }
);
