define([
  'marionette',
  'underscore',
  'backbone.radio',
  'text!skribble/list/item/template.html'
], function( Marionette, _, Radio, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var SkribbleListItemView = Marionette.ItemView.extend({
    tagName: 'article',
    className: 'list-item',
    template: _.template( template ),
    ui: {
      id: '.skribble-id'
    },
    events: {
      'click @ui.id': 'gotoSkribble'
    },
    gotoSkribble: function() {
      var route = 'skribble/' + this.model.get('_id');
      RouterChannel.request('navigate', route, {trigger:true, replace: false});
    }
  });
  return SkribbleListItemView;
});
