define([
  'backbone',
  'underscore',
  'collections/skribblecollection'
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    urlRoot: '/api/skribbl/',
    parse: function( data ) {
      if ( !data.children ) return data;
      var childrenCollection = new SkribbleCollection();
      childrenCollection.parse( data.children );
      data.children = childrenCollection;
    }
  });
  return SkribbleModel;
});
