define([
  'marionette',
  'backbone.radio'
], function( Marionette, Radio ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var BaseRouter = Marionette.AppRouter.extend({
    initialize: function() {
      RouterChannel.reply('navigate', function( url, options ) {
        var trigger = options.trigger || false;
        this.navigate( url, {trigger: trigger} );
      }, this);
    }
  });

  return BaseRouter;
});
