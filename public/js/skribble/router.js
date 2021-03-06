define([
  'marionette',
  'skribble/controller',
], function( Marionette, Controller ) {
  'use strict';

  var SkribbleRouter = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      'skribble/random': 'index',
      'skribble/:id': 'showSkribble',
      'skribble/:id/trace': 'traceSkribble'
    }
  });
  return SkribbleRouter;
});
