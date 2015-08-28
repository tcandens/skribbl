define([
  'marionette',
  'underscore',
  'backbone.radio',
  'text!error/template.html'
], function( Marionette, _, Radio, template ) {
  'use strict';

  var ErrorView = Marionette.ItemView.extend({
    tagName: 'p',
    className: 'error',
    template: _.template( template )
  });
  return ErrorView;
});
