define([
  'marionette',
  'underscore',
  'text!templates/currentskribble.html'
], function( Marionette, _, template ) {
  'use strict';

  var CurrentSkribbleView = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'c-current-skribble',
    template: _.template( template ),
    initialize: function() {
    },
    onRender: function() {
      console.log('Render' + this.id );
    }
  });
  return CurrentSkribbleView;
});
