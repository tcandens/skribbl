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
      'skribble/random': 'showRandomSkribble',
      'skribble/:id': 'showSkribble'
    },
    initialize: function() {
      Radio.channel('router').reply('navigate', function( url, trigger ) {
        this.navigate( url, {trigger: trigger} );
      }, this);
    }
  });
  return Router;
});
