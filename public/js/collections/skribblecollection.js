define([
  'backbone',
  'underscore',
  'models/skribblemodel'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    initialize: function() {
      console.log( 'new collection' );
    },
    parse: function( data ) {
      console.log( data );
      var freshData = [];
      if ( _.isArray( data ) ) {
        _.forEach( data, function(n) {
          var skribbleModel = new SkribbleModel( n );
          freshData.push( skribbleModel );
        });
      } else {
        return data;
      }
      console.log('Collection:' + freshData );
      return freshData;
    }
  });
  return SkribbleCollection;
});
