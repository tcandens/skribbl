define([
  'marionette',
  'backbone',
  'root/view',
  'router',
  'skribble/router',
  'user/router',
], function( Marionette, Backbone, RootView, BaseRouter, SkribbleRouter, UserRouter ) {
    'use strict';

    var App = Marionette.Application.extend({
      onBeforeStart: function() {
        this.rootView = new RootView();
        var baseRouter = new BaseRouter();
        var skribbleRouter = new SkribbleRouter();
        var userRouter = new UserRouter();
      },
      onStart: function() {
        this.rootView.render();
        Backbone.history.start();
      }
    });
    return App;
  }
);
