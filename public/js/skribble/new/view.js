define([
  'marionette',
  'underscore',
  'text!skribble/new/template.html'
], function( Marionette, _, template ) {
  'use strict';

  var NewSkribbleView = Marionette.ItemView.extend({
    initialize: function() {
      console.log( this );
    },
    template: _.template( template )
  });
  return NewSkribbleView;
});
