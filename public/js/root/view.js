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
      RootChannel.reply('setClass', function( className ) {
        this.setClass( className );
      }, this);
      RootChannel.reply('toggleClass', function( className  ) {
        this.toggleClass( className );
      }, this);
      RootChannel.reply('removeClass', function( classname ) {
        this.$el.removeClass( classname );
      }, this);
    },
    onRender: function() {
      var navView = new NavView();
      this.showChildView('nav', navView);
    },
    setClass: function ( className ) {
      var $el = this.$el;
      $el.addClass( className );
      setTimeout(function () {
        $el.removeClass( className );
      }, 1000);
    },
    toggleClass: function( className ) {
      this.$el.toggleClass( className );
    }
  });
  return RootView;
});

