define([
  'backbone',
  'underscore',
  'skribble/model'
], function( Backbone, _, SkribbleModel ) {
  'use strict';

  var SkribbleCollection = Backbone.Collection.extend({
    model: SkribbleModel
  });
  return SkribbleCollection;
});

