define([
  'marionette',
  'underscore',
  'jquery',
  'backbone',
  'backbone.radio',
  'skribble/model',
  'skribble/current/view',
  'skribble/parent/view',
  'text!skribble/manager/template.html',
], function( Marionette, _, $, Backbone, Radio, SkribbleModel, CurrentView, ParentView, template ) {
  'use strict';

  var ManagerChannel = Radio.channel('SkribbleManager');

  var SkribbleManagerView = Marionette.LayoutView.extend({
    tagName: 'section',
    className: 'c-skribble-manager',
    template: _.template( template ),
    regions: {
      current: '.c-current-skribble',
      parent: '.c-parent-skribble',
      children: '.c-children-skribble'
    },
    initialize: function() {
      // Create View Model
      this.state = new Backbone.Model.extend({});
      ManagerChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this);
      ManagerChannel.reply('set:collection', function( collection ) {
        this.collection = collection;
      }, this);
      ManagerChannel.reply('build:all', function() {
        this.buildAll();
      }, this);
    },
    events: {
      'click .c-skribble-manager__nav-next': 'showNext',
      'click .c-skribble-manager__nav-prev': 'showPrev',
      'click .c-skribble-manager__select-child': 'selectChild'
    },
    buildAll: function() {
      var currentIndex = this.state.get('current');
      var currentModel = this.collection.at( currentIndex );
      buildCurrent( currentModel );
      return this;
    },
    buildCurrent: function( model ) {
      var modelView = new CurrentView({ model: model });
      this.showChildView('current', modelView);
      return this;
    }
  });

  return SkribbleManagerView;
});
