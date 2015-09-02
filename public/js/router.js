define([
  'marionette',
  'backbone.radio',
  'underscore'
], function( Marionette, Radio, _ ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var BaseRouter = Marionette.AppRouter.extend({
    initialize: function() {
      RouterChannel.reply('navigate', function( url, options ) {
        var defaults = {
          trigger: false
        }
        var options = _.extend( defaults, options );
        console.log( options );
        this.navigate( url, {trigger: options.trigger} );
      }, this);
    }
  });

  return BaseRouter;
});
