define([
  'marionette',
  'controllers/main',
  'backbone.radio'
], function( Marionette, Controller, Radio ) {
  'use strict';

  var Router = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      '': 'index',
      'skribble/:id': 'showSkribble'
    },
    initialize: function() {
      Radio.channel('Router').reply('navigate', function( url, trigger ) {
        var trigger = trigger || false;
        this.navigate( url, {trigger: trigger} );
      }, this);
    }
  });
  return Router;
});
