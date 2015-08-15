define([
  'marionette',
  'underscore',
  'text!templates/currentskribble.html'
], function( Marionette, _, template ) {
  'use strict';

  var CurrentSkribbleView = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'currentSkribble',
    template: _.template( template )
  });
  return CurrentSkribbleView
});
