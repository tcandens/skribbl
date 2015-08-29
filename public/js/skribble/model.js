define([
  'backbone',
  'underscore',
  'skribble/collection',
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/skribbl',
    parse: function( data ) {
      // If JSON returns an array, pick first object
      if ( data.length === 1 ) {
        return data[0];
      } else {
        return data;
      }
    }
  });
  return SkribbleModel;
});

