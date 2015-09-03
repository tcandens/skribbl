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
      var self = this;
      var fetched = this.fetch();
      $.when( fetched )
        .done(function( data, status, xhr ) {
          if ( typeof callback === 'function' ) callback( self );
        })
        .fail(function( xhr, status, error ) {
          console.log( error );
        })
    }
  });
  return SkribbleModel;
});

