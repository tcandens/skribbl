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
      var rootRendered = Radio.channel('root').request('isRendered');
      var controlRendered = Radio.channel('skribbleControl').request('isRendered');
      if ( rootRendered && controlRendered ) {
        // See if model with id still exists under skribbleControl model
        var currentChildModel = Radio.channel('skribbleControl').request('get:currentChild');
        console.log( currentChildModel.toJSON() );
        // if not set a model with URL
        // Plug model into new view
        var skribbleView = new CurrentSkribbleView({ model: currentChildModel });
        // Pass view through radio to skribbleControl
        Radio.channel('skribbleControl').request('set:currentSkribble', skribbleView);
      }
    }
  };
  return MainController;
});
