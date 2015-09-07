define([
  'marionette',
  'underscore',
  'text!skribble/parent/template.html'
], function( Marionette, _, template ) {
  'use strict';

  var BaseSkribbleView = Marionette.ItemView.extend({
    template: _.template( template ),
    tagName: 'article',
    className: 'parent-skribble muted'
  });
  return BaseSkribbleView;
})
