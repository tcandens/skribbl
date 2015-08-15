define([
  'marionette',
  'backbone',
  'router',
  'views/rootview'
], function( Marionette, Backbone, Router, RootView ) {
    'use strict';

    var App = Marionette.Application.extend({
      rootView: new RootView(),
      onBeforeStart: function() {
        var router = new Router();
      },
      onStart: function() {
        this.rootView.render();
        Backbone.history.start();
      }
    });
    return App;
  }
);
