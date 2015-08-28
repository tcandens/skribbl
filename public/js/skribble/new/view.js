define([
  'marionette',
  'underscore',
  'text!skribble/new/template.html'
], function( Marionette, _, template ) {
  'use strict';

  var NewSkribbleView = Marionette.ItemView.extend({
    template: _.template( template )
  });
  return NewSkribbleView;
});
