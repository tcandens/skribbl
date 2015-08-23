define([
  'marionette',
  'backbone',
  'router',
  'root/view'
], function( Marionette, Backbone, Router, RootView ) {
    'use strict';

    var App = Marionette.Application.extend({
      onBeforeStart: function() {
        this.rootView = new RootView();
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
