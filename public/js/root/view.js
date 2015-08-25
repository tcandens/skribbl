define([
  'marionette',
  'backbone.radio',
  'underscore',
  'text!root/template.html'
], function( Marionette, Radio, _, template ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');

  var RootView = Marionette.LayoutView.extend({
    el: '#container',
    template: _.template( template ),
    regions: {
      nav: '#navigation',
      content: '#content',
      footer: '#footer'
    },
    initialize: function() {
      RootChannel.reply('set:content', function( contentView ) {
        this.getRegion('content').show( contentView );
      }, this);
      RootChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this);
    }
  });
  return RootView;
});

