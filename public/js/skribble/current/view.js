define([
  'marionette',
  'underscore',
  'text!skribble/current/template.html'
], function( Marionette, _, template ) {
  'use strict';

  var CurrentSkribbleView = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'current-skribble',
    template: _.template( template ),
  });
  return CurrentSkribbleView;
});
