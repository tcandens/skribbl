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
    className: 'card row text-center p-a-lg',
    template: _.template( template ),
    templateHelpers: function() {
      return {
        getDate: function() {
          var date = new Date( this.created_at );
          return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        },
        getId: function() {
          return '...' + this._id.slice(-5);
        }
      }
    },
    ui: {
      view: '.show-skribble',
      read: '.show-story'
    },
    events: {
      'click @ui.view': 'viewSkribble',
      'click @ui.read': 'readSkribble'
    },
    viewSkribble: function() {
      var route = 'skribble/' + this.model.get('_id');
      RouterChannel.request('navigate', route, {trigger:true, replace: false});
    },
    readSkribble: function() {
      var route = 'skribble/' + this.model.get('_id') + '/trace';
      RouterChannel.request('navigate', route, {trigger:true});
    }
  });
  return SkribbleListItemView;
});
