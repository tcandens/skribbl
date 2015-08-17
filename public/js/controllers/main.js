define([
  'marionette',
  'backbone.radio',
  'underscore',
  'jquery',
  'models/skribblemodel',
  'views/currentskribble',
  'views/skribblecontrol'
], function( Marionette, Radio, _, $, SkribbleModel, CurrentSkribbleView, SkribbleControlView ) {
  'use strict';

  var MainController = {
    index: function() {
      var controlView = new SkribbleControlView();
      Radio.channel('root').request('set:content', controlView);
      var skribbleModel = new SkribbleModel();
      skribbleModel.url = '/api/storys/random';
      var fetched = skribbleModel.fetch();
      $.when( fetched ).then(function() {
        var skribbleView = new CurrentSkribbleView({ model: skribbleModel });
        Radio.channel('skribbleControl').request('set:currentSkribble', skribbleView);
      });
    },
    showSkribble: function( id ) {
    }
  };
  return MainController;
});
