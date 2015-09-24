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
    onBeforeShow: function() {
      this.$el.addClass('is-showing');
    },
    onShow: function () {
      var el = this.$el;
      setTimeout(function () {
        el.removeClass('is-showing');
      }, 1000);
    },
    onBeforeDestroy: function () {
      var el = this.$el;
      el.addClass('is-destroying')
      setTimeout(function () {
        el.removeClass('is-destroying')
      }, 1000);
    }
  });
  return CurrentSkribbleView;
});
