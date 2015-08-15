define([
  'marionette',
  'backbone.radio',
  'underscore',
  'jquery',
  'models/skribblemodel',
  'views/currentskribble'
], function( Marionette, Radio, _, $, SkribbleModel, CurrentSkribbleView ) {
  'use strict';

  function fetchAndShowSkribble( id, callback ) {
    var skribbleModel = new SkribbleModel();
    skribbleModel.url = id ? '/api/skribbl' + id : '/api/storys/random';
    var fetched = skribbleModel.fetch();
    $.when( fetched ).then(function() {
      var contentView = new CurrentSkribbleView({ model: skribbleModel });
      Radio.channel('root').request('set:content', contentView);
    });
  }

  var MainController = {
    index: function() {
      fetchAndShowSkribble();
    },
    showSkribble: function( id ) {
      fetchAndShowSkribble( id );
    }
  };
  return MainController;
});
