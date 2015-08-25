/*
 * Skribble Collection
 */

define([
  'backbone',
  'underscore',
  'skribble/model'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    model: SkribbleModel,
    parse: function( data ) {
      var freshData = _.cloneDeep( data );
      freshData.forEach( function( skribble ) {
        if ( skribble.children ) {
          var childrenCollection = new SkribbleCollection( skribble.children );
          childrenCollection.forEach( function( grandChild ) {
            if ( grandChild.get('children') ) {
              var childrenArray = grandChild.get('children');
              var collection = new SkribbleCollection( childrenArray );
              grandChild.set('children', collection);
            }
          });
          skribble.children = childrenCollection;
        }
      });
      return freshData;
    }
  });
  return SkribbleCollection;
});

