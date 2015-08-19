define([
  'backbone',
  'underscore',
  'collections/skribblecollection'
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    urlRoot: '/api/skribbl/',
    parse: function( data ) {
      if ( data.children && _.isArray( data.children ) ) {
        var freshArray = _.map( data.children, function( child ) {
          if ( child.children && _.isArray( child.children ) ) {
            var freshSubArray = _.map( child.children, function( grandchild ) {
              return new SkribbleModel( grandchild );
            });
            var freshSubCollection = new SkribbleCollection( freshSubArray );
            child.children = freshSubCollection;
          }
          return new SkribbleModel( child );
        });
        var freshChildrenCollection = new SkribbleCollection( freshArray );
        data.children = freshChildrenCollection;
      }
      return data;
    }
  });
  return SkribbleModel;
});
