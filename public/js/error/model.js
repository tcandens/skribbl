define([
  'backbone',
], function( Backbone ) {
  'use strict';

  var ErrorModel = Backbone.Model.extend({
    defaults: function() {
      return {
        type: 'Skribble',
        message: 'Error!'
      }
    }
  });
  return ErrorModel;
});
