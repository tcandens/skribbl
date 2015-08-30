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
      var fetched = seedModel.fetch();
      $.when( fetched ).then(function() {
        service.seedWith( seedModel )
      });
    },
    showSkribble: function( id ) {
      var controlRendered = Radio.channel('skribbleControl').request('isRendered');
      if ( !controlRendered ) {
        var managerView = new ManagerView();
        RootChannel.request('set:content', managerView);
      }
      var seedModel = new SkribbleModel({ _id: id });
      var fetched = seedModel.fetch();
      $.when( fetched ).then(function() {
        service.seedWith( seedModel );
      });
    }
  };
  return MainController;
});
