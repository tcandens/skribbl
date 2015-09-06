define([
  'marionette',
  'underscore',
  'backbone.radio',
  'skribble/service',
  'text!skribble/new/template.html'
], function( Marionette, _, Radio, SkribbleService, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var service = SkribbleService.getInstance();

  var NewSkribbleView = Marionette.ItemView.extend({
    template: _.template( template ),
    ui: {
      form: 'form',
      content: '.new-skribble-content'
    },
    events: {
      'submit @ui.form': 'submitSkribble',
    },
    submitSkribble: function( e ) {
      e.preventDefault();
      var skribbleContent = this.ui.content.val();
      service.createSkribble({
        content: skribbleContent
      }, function( response ) {
        var path = 'skribble/' + response.id + '/trace';
        RouterChannel.request('navigate', path, {trigger: true});
      });
    }
  });
  return NewSkribbleView;
});
