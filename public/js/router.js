define([
  'marionette',
  'controllers/main',
  'backbone.radio'
], function( Marionette, Controller, Radio ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var Router = Marionette.AppRouter.extend({
    controller: Controller,
    appRoutes: {
      '': 'index',
      'skribble/random': 'index',
      'skribble/:id': 'showSkribble'
    },
    initialize: function() {
      RouterChannel.reply('navigate', function( url, options ) {
        var trigger = options.trigger || false;
        this.navigate( url, {trigger: trigger} );
      }, this);
    }
  });
  return Router;
});
