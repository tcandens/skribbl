define([
  'backbone',
  'underscore',
  'skribble/collection',
], function( Backbone, _, SkribbleCollection ) {
  'use strict';

  var SkribbleModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/skribbl',
    initialize: function( options ) {
      this.listenTo( this, 'sync', this.parseChildren );
    },
    parseChildren: function() {
      var SkribbleCollection = require('skribble/collection');
      var children = this.get('children');
      console.log( SkribbleCollection )
      var freshChildren = new SkribbleCollection( children );
      this.set('children', freshChildren);
    },
    //parse: function( data ) {
      //var freshData = _.cloneDeep( data );
      //if ( freshData.children ) {
        //var childrenCollection = new SkribbleCollection( freshData.children );
        //childrenCollection.forEach( function( child ) {
          //if ( child.get('children') ) {
            //var childrenArray = child.get('children');
            //var collection = new SkribbleCollection( childrenArray );
            //child.set('children', collection);
          //}
        //});
        //freshData.children = childrenCollection;
      //}
      //return freshData;
    //},
    findNext: function() {
      if ( this.collection ) {
        return this.collection.at( this.collection.indexOf( this ) + 1 ) || null
      }
    },
    findPrev: function() {
      if ( this.collection ) {
        return this.collection.at( this.collection.indexOf( this ) - 1 ) || null;
      }
    }
  });
  return SkribbleModel;
});

