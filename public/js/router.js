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
      ':id': 'showSkribble'
    },
    initialize: function() {
      Radio.channel('router').reply('navigate', function( url, trigger ) {
        this.navigate( url, {trigger: trigger} );
        console.log( 'Navigating!' );
      }, this);
    }
  });
  return Router;
});
