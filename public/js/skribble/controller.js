define([
  'marionette',
  'jquery',
  'backbone.radio',
  'skribble/service',
  'skribble/model',
  'skribble/manager/view',
  'skribble/collection',
  'skribble/list/view'
], function( Marionette, $, Radio, SkribbleService, SkribbleModel, ManagerView, SkribbleCollection, SkribbleListView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');
  var ManagerChannel = Radio.channel('SkribbleManager');
  var service = SkribbleService.getInstance();

  var SkribbleController = {
    index: function() {
      var managerView = new ManagerView();
      RootChannel.request('set:content', managerView);
      var seedModel = new SkribbleModel();
      seedModel.url = 'api/storys/random';
      seedModel.asyncFetch(function( fetched ) {
        service.seedWith( fetched )
      });
    },
    showSkribble: function( id ) {
      var managerView = new ManagerView();
      RootChannel.request('set:content', managerView);
      var seedModel = new SkribbleModel({ _id: id });
      seedModel.asyncFetch(function( fetched ) {
        service.seedWith( fetched );
      });
    },
    traceSkribble: function( id ) {
      var skribbleCollection = new SkribbleCollection();
      skribbleCollection.url = 'api/skribbl/trace/' + id;
      var listView = new SkribbleListView({ collection: skribbleCollection });
      var fetched = skribbleCollection.fetch();
      $.when( fetched ).then(function() {
        RootChannel.request('set:content', listView);
      });
    }
  };
  return SkribbleController;
});
