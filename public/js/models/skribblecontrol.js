define([
  'backbone'
], function( Backbone ) {
  'use strict';

  var SkribbleControlModel = Backbone.Model({
    defaults: {
      'content': 'Skribble Data',
      'parent': null,
      'children': []
    }
  });

  return SkribbleControlModel;
});
