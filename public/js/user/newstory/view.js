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
    showNewSkribble: function(e) {
      e.preventDefault();
      this.ui.form.hide();
      var storyName = this.ui.storyName.val();
      console.log( storyName );
      this.showChildView('newSkribble', new NewSkribbleView({new: true, story_name: storyName}))
    }
  });
  return NewStoryView;
});
