define([
  'marionette',
  'underscore',
  'jquery',
  'backbone.radio',
  'skribble/service',
  'text!skribble/new/template.html'
], function( Marionette, _, $, Radio, SkribbleService, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var service = SkribbleService.getInstance();

  var NewSkribbleView = Marionette.ItemView.extend({
    initialize: function( options ) {
      if ( options.parent !== 'undefined' ) {
        this.options.parent = options.parent
      }
    },
    template: _.template( template ),
    ui: {
      form: '.new-skribble-form',
      content: '.new-skribble-text',
      cancel: '.ui-cancel'
    },
    events: {
      'submit @ui.form': 'submitSkribble',
      'focus @ui.form' : 'startAdding',
      'blur @ui.form': 'stopAdding',
      'click @ui.cancel': 'stopAdding'
    },
    startAdding: function() {
      $('html').addClass('is-adding-skribble');
    },
    stopAdding: function() {
      $('html').removeClass('is-adding-skribble');
    },
    submitSkribble: function( e ) {
      e.preventDefault();
      $('html').removeClass('is-adding-skribble');
      var skribbleContent = this.ui.content.val();
      var storyName = this.options.storyName;
      service.createSkribble({
        content: skribbleContent,
        story_name:
        parent_skribble:
      }, function( response ) {
        var path = 'skribble/' + response.id + '/trace';
        RouterChannel.request('navigate', path, {trigger: true});
      });
    }
  });
  return NewSkribbleView;
});
