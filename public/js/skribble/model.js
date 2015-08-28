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
      var freshChildren = new SkribbleCollection( children );
      this.set('children', freshChildren);
    },
    findNext: function() {
      if ( this.collection ) {
        return this.collection.at( this.collection.indexOf( this ) + 1 ) || null;
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

