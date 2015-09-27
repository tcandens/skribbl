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
      if ( options.new ) this.options = options;
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
      if ( this.options.new ) {
        console.log('creating story');
        this.submitSkribbleAsStory();
      } else {
        console.log('create skribble child');
        this.submitSkribbleAsChild();
      }
    },
    submitSkribbleAsChild: function() {
      var skribbleContent = this.ui.content.val();
      service.createSkribble({
        content: skribbleContent,
      }, function( response ) {
        console.log('adding', response);
        var path = 'skribble/' + response.id + '/trace';
        RouterChannel.request('navigate', path, {trigger: true});
      });
    },
    submitSkribbleAsStory: function() {
      var skribbleContent = this.ui.content.val();
      var storyName = this.options.story_name;
      service.createStory({
        content: skribbleContent,
        story_name: storyName,
      }, function( response ) {
        console.log( response );
        var path = 'skribble/' + response.id;
        RouterChannel.request('navigate', path, {trigger: true});
      });
    }
  });
  return NewSkribbleView;
});
