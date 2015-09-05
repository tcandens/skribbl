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
        var options = _.extend({ trigger: false, replace: false }, options );
        this.navigate( url, options );
      }, this);
    },
  });

  return BaseRouter;
});
