define([
  'backbone',
  'jquery',
  'underscore',
], function( Backbone, $, _ ) {
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
    },
    asyncFetch: function( callback ) {
      var fetched = this.fetch();
      $.when( fetched )
        .done(function() {
          if ( typeof callback === 'function' ) callback( this );
        }.bind( this ))
        .fail(function() {
          console.log('Model fetch failed.');
        })
    }
  });
  return SkribbleModel;
});

