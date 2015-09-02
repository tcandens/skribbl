define([
  'marionette',
  'underscore',
  'skribble/service',
  'text!skribble/new/template.html'
], function( Marionette, _, SkribbleService, template ) {
  'use strict';

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
      })
    }
  });
  return NewSkribbleView;
});
