define([
  'marionette',
  'underscore',
  'skribble/service',
  'skribble/new/view',
  'text!user/newstory/template.html'
], function( Marionette, _, SkribbleService, NewSkribbleView, template ) {
  'use strict';

  var NewStoryView = Marionette.LayoutView.extend({
    template: _.template( template ),
    regions: {
      newSkribble: '.r-new-skribble'
    },
    ui: {
      form: '.ui-story-form',
      storyName: '.ui-story-name'
    },
    events: {
      'submit @ui.form': 'showNewSkribble'
    },
    showNewSkribble: function() {
      this.ui.form.hide();
      var storyName = this.ui.storyName.val();
      this.showChildView('newSkribble', new NewSkribbleView({parent: null, story_name: storyName}))
    }
  });
  return NewStoryView;
});
