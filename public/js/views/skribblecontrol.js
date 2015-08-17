define([
  'marionette',
  'underscore',
  'models/skribblecontrol',
  'text!templates/skribblecontrol',
  'views/currentskribble'
], function( Marionette, _, SkribbleControlModel, template, CurrentSkribbleView ) {
  'use strict';

  var SkribbleControlView = Marionette.LayoutView.extend({
    model: new SkribbleControlModel(),
    template: _.template( template ),
    regions: {
      current: '.c-current-skribble',
      parent: 'c-parent-skribble',
      children: 'c-children'
    }
  });

  return SkribbleControlView;
});
