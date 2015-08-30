define([
  'backbone',
  'underscore',
  'skribble/model'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    model: SkribbleModel,
    // Over-write weird at method
    at: function( index ) {
      return this.models[ index ] || undefined;
    }
  });
  return SkribbleCollection;
});

