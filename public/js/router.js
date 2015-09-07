define([
  'marionette',
  'backbone.radio',
  'underscore',
  'frontpage/view'
], function( Marionette, Radio, _, FrontpageView ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');
  var RootChannel = Radio.channel('RootView');

  var BaseRouter = Marionette.AppRouter.extend({
    routes: {
      '': 'frontpage'
    },
    initialize: function() {
      RouterChannel.reply('navigate', function( url, options ) {
        var options = _.extend({ trigger: false, replace: false }, options );
        this.navigate( url, options );
      }, this);
    },
    frontpage: function() {
      var frontpageView = new FrontpageView();
      RootChannel.request('set:content', frontpageView);
    }
  });

  return BaseRouter;
});
