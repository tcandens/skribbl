define([
  'marionette',
  'backbone.radio',
  'underscore',
  'error/model',
  'error/view',
  'text!root/template.html'
], function( Marionette, Radio, _, ErrorModel, ErrorView, template ) {
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
      RootChannel.reply('set:error', function( error ) {
        var errorModel = new ErrorModel({ message: error });
        var errorView = new ErrorView({ model: errorModel });
        console.log( errorView.render().el )
        this.getRegion('errors').show( errorView );
      }, this);
    }
  });
  return RootView;
});

