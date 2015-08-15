define([
  'marionette',
  'backbone.radio',
  'underscore',
  'text!templates/rootview.html'
], function( Marionette, Radio, _, template ) {
  'use strict';
  
  var RootView = Marionette.LayoutView.extend({
    el: '#container',
    template: _.template( template ),
    regions: {
      nav: '#navigation',
      content: '#content',
      footer: '#footer'
    },
    initialize: function() {
      Radio.channel('root').reply('set:content', function( contentView ) {
        this.getRegion('content').show( contentView );
      }, this);
    }
  });
  return RootView;
});
