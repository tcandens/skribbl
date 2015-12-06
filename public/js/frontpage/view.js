define([
  'marionette',
  'underscore',
  'backbone.radio',
  'frontpage/animation',
  'text!frontpage/template.html'
], function( Marionette, _, Radio, FrontpageAnimation, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var FrontpageView = Marionette.ItemView.extend({
    tagName: 'section',
    className: '',
    template: _.template( template ),
    ui: {
      showRandomSkribble: '#show-random-skribble'
    },
    events: {
      'click @ui.showRandomSkribble': 'showRandomSkribble'
    },
    showRandomSkribble: function( e ) {
      e.preventDefault();
      RouterChannel.request('navigate', 'skribble/random', {trigger:true});
    },
    onShow: function() {
      FrontpageAnimation.start();
    }
  });
  return FrontpageView;
});
