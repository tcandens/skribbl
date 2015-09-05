define([
  'marionette',
  'user/controller'
], function( Marionette, Controller ) {
  'use strict';

  var UserRouter = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      'user/login': 'login',
      'user/create': 'create',
      'user/profile': 'profile'
    }
  });
  return UserRouter;
});
