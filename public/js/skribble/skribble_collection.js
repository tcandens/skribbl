/*
 * Skribble Collection
 */

define([
  'backbone',
  'underscore',
  'models/skribblemodel'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    parse: function( data ) {
      var freshData = [];
      if ( _.isArray( data ) ) {
        _.forEach( data, function(n) {
          var skribbleModel = new SkribbleModel( n );
          freshData.push( skribbleModel );
        });
      } else {
        return data;
      }
      return freshData;
    }
  });
  return SkribbleCollection;
});

