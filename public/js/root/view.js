define([
  'marionette',
  'backbone.radio',
  'underscore',
  'navigation/view',
  'text!root/template.html'
], function( Marionette, Radio, _, NavView, template ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');

  var RootView = Marionette.LayoutView.extend({
    el: '#container',
    template: _.template( template ),
    regions: {
      nav: '#navigation',
      content: '#content',
      footer: '#footer',
      errors: '#errors'
    },
    initialize: function() {
      RootChannel.reply('set:content', function( contentView ) {
        this.getRegion('content').show( contentView );
      }, this);
      RootChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this);
    },
    onRender: function() {
      var navView = new NavView();
      this.showChildView('nav', navView);
    }
  });
  return RootView;
});

