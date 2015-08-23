define([
  'backbone',
  'underscore',
  'skribble/collection'
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    idAttribute: '_id'
  });
  return SkribbleModel;
});

