define([
  'marionette',
  'backbone.radio',
  'underscore',
  'jquery',
  'skribble/collection',
  'skribble/model',
  'skribble/current/view',
  'skribble/manager/view'
], function( Marionette, Radio, _, $, SkribbleCollection, SkribbleModel, CurrentView, ManagerView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');
  var ManagerChannel = Radio.channel('SkribbleManager');

  var MainController = {
    index: function() {
      var managerView = new ManagerView();
      RootChannel.request('set:content', managerView);
      var seedModel = new SkribbleModel();
      seedModel.url = 'api/storys/random';
      var fetched = seedModel.fetch();
      $.when( fetched ).then(function() {
        // Passes through fetched and parsed collection with
        // one model at the root & nested children
        ManagerChannel.request('set:seedModel', seedModel);
      });
    },
    showSkribble: function( id ) {
      var controlRendered = Radio.channel('skribbleControl').request('isRendered');
      if ( !controlRendered ) {
        var managerView = new ManagerView();
        RootChannel.request('set:content', managerView);
      }
      var skribbleCollection = new SkribbleCollection();
      var skribbleModel = new SkribbleModel({ _id: id });
      skribbleCollection.add( skribbleModel );
      var fetched = skribbleModel.fetch();
      $.when( fetched ).then(function() {
        ManagerChannel.request('set:collection', skribbleCollection);
        ManagerChannel.request('build:all');
      });
    }
  };
  return MainController;
});
