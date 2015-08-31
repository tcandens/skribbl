define([
  'marionette',
  'skribble/controller',
], function( Marionette, Controller ) {
  'use strict';

  var SkribbleRouter = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      '': 'index',
      'skribble/random': 'index',
      'skribble/:id': 'showSkribble'
    }
  });
  return SkribbleRouter;
});
