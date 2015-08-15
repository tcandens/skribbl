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
      this.model.fetch();
      this.listenTo( this.model, 'change sync', this.render );
    },
    onRender: function() {
      console.log( this.model );
    }
  });
  return CurrentSkribbleView
});
