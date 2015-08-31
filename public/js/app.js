define([
  'marionette',
  'backbone',
  'router',
  'skribble/router',
  'root/view'
], function( Marionette, Backbone, BaseRouter, SkribbleRouter, RootView ) {
    'use strict';

    var App = Marionette.Application.extend({
      onBeforeStart: function() {
        this.rootView = new RootView();
        var baseRouter = new BaseRouter();
        var skribbleRouter = new SkribbleRouter();
      },
      onStart: function() {
        this.rootView.render();
        Backbone.history.start();
      }
    });
    return App;
  }
);
