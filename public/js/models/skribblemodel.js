define([
  'backbone',
  'underscore',
  'collections/skribblecollection'
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    parse: function( data ) {
      var freshChildrenCollection;
      if ( data.children && _.isArray( data.children ) ) {
        var freshArray = _.map( data.children, function( child ) {
          return new SkribbleModel( child );
        });
        freshChildrenCollection = new SkribbleCollection( freshArray );
        data.children = freshChildrenCollection;
      }
      return data;
    }
  });
  return SkribbleModel;
});
