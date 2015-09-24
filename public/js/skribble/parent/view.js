define([
  'marionette',
  'underscore',
  'text!skribble/parent/template.html'
], function( Marionette, _, template ) {
  'use strict';

  var BaseSkribbleView = Marionette.ItemView.extend({
    template: _.template( template ),
    tagName: 'article',
    className: 'parent-skribble text-muted',
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
  return BaseSkribbleView;
})
