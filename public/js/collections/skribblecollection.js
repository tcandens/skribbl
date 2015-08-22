define([
  'backbone',
  'underscore',
  'models/skribblemodel'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    model: SkribbleModel,
    parse: function( data ) {
      if ( _.isArray( data ) && data[0].children ) {
        var freshData = [];
        _.forEach( data.children, function( child ) {
          var model = new SkribbleModel();
          model.parse( child );
          freshData.push( model );
        });
        //return freshData;
        return [ { turds: 'turds' } ];
      }
    }
  });
  return SkribbleCollection;
});
