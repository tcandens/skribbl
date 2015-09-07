define([
  'marionette',
  'underscore',
  'backbone.radio',
  'text!frontpage/template.html'
], function( Marionette, _, Radio, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var FrontpageView = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'jumbotron jumbotron-fluid',
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
    }
  });
  return FrontpageView;
});
