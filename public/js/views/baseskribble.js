define([
  'marionette',
  'underscore',
  'text!templates/baseskribble.html'
], function( Marionette, _, template ) {
  'use strict';
  
  var BaseSkribbleView = Marionette.ItemView.extend({
    template: _.template( template ),
    tagName: 'span'
  });
  return BaseSkribbleView;
})
