define([
  'marionette',
  'backbone.radio',
  'underscore',
  'jquery',
  'skribble/service',
  'skribble/model',
  'skribble/manager/view'
], function( Marionette, Radio, _, $, SkribbleService, SkribbleModel, ManagerView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');
  var ManagerChannel = Radio.channel('SkribbleManager');
  var service = SkribbleService.getInstance();

  var MainController = {
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
      var controlRendered = ManagerChannel.request('isRendered');
      if ( !controlRendered ) {
        var managerView = new ManagerView();
        RootChannel.request('set:content', managerView);
      }
      var seedModel = new SkribbleModel({ _id: id });
      seedModel.asyncFetch(function( fetched ) {
        service.seedWith( fetched );
      });
    }
  };
  return MainController;
});
