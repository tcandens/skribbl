define([
  'jquery',
  'marionette',
  'underscore',
  'backbone.radio',
  'frontpage/animation',
  'fittext',
  'text!frontpage/template.html'
], function( $, Marionette, _, Radio, FrontpageAnimation, FitText, template ) {
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
      $('#title').fitText(0.8);
      FrontpageAnimation.start();
    }
  });
  return FrontpageView;
});
