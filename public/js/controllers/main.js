define([
  'marionette',
  'backbone.radio',
  'underscore',
  'jquery',
  'skribble/collection',
  'skribble/current/view',
  'skribble/manager/view'
], function( Marionette, Radio, _, $, SkribbleCollection, CurrentView, ManagerView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');
  var ManagerChannel = Radio.channel('SkribbleManager');

  var MainController = {
    index: function() {
      var managerView = new ManagerView();
      RootChannel.request('set:content', managerView);
      var skribbleCollection = new SkribbleCollection();
      skribbleCollection.url = '/api/storys/random';
      var fetched = skribbleCollection.fetch();
      $.when( fetched ).then(function() {
        ManagerChannel.request('set:collection', skribbleCollection);
        ManagerChannel.request('build:all');
      });
    },
    showSkribble: function( id ) {
      var rootRendered = RootChannel.request('isRendered');
      var controlRendered = Radio.channel('skribbleControl').request('isRendered');
      if ( rootRendered && controlRendered ) {
        // See if model with id still exists under skribbleControl model
        var currentChildModel = Radio.channel('skribbleControl').request('get:currentChild');
        // For some reason, currentChildModel is being spit out with children as plain array instead of Backbone.Collection
        console.log( currentChildModel );
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
