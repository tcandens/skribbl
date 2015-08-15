define([
  'marionette',
  'controllers/main'
], function( Marionette, Controller ) {
  'use strict';

  var Router = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      '': 'index',
      ':id': 'showSkribble'
    }
  });
  return Router;
});
