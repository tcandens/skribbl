define([
  'backbone',
  'underscore',
  'skribble/collection'
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    idAttribute: '_id',
    findNext: function() {
      // Refer to this.collection to find next index
      // Return entire model or null
    },
    findPrevious: function() {
      // Refer to this.collection to find previous by index
      // Return entire model or null
    },
    findParent: function() {
      // Refer to collection
      // Return entire model or null
    }
  });
  return SkribbleModel;
});

