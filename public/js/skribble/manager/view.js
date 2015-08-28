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
  var stateModel = Backbone.Model.extend({});

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
      // State.current holds pointer to current skribble within this.collection
      this.state = new stateModel();
      // Listen to change in current skribble on state model
      this.listenTo( this.state, 'change:current', this.buildCurrent );
      this.listenTo( this.state, 'change:parent', this.buildParent );
      this.listenTo( this.state, 'change:current', this.syncCurrent );
      // Radio accessible bool for rendering flow
      ManagerChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this);
      // Radio accessible command to set collection from router controller
      ManagerChannel.reply('set:collection', function( collection ) {
        this.collection = collection;
        this.setCurrent( this.collection.at(0) );
      }, this);
      ManagerChannel.reply('build:all', function() {
        this.buildAll();
      }, this);
    },
    events: {
      'click .c-skribble-manager__nav-next': 'findNext',
      'click .c-skribble-manager__nav-prev': 'findPrev',
      'click .c-skribble-manager__select-child': 'selectChildren',
      'click .c-skribble-manager__select-parent': 'selectParent'
    },
    getCurrent: function() {
      return this.state.get('current');
    },
    setCurrent: function( model ) {
      this.state.set('current', model);
      // Navigate to current model ID
      var url = 'skribble/' + this.getCurrent().get('_id');
      Radio.channel('Router').request('navigate', url, false );
    },
    syncCurrent: function() {
      return this.getCurrent().fetch();
    },
    buildAll: function() {
      this.buildCurrent();
      this.buildParent();
      return this;
    },
    buildCurrent: function() {
      var modelView = new CurrentView({ model: this.getCurrent() });
      this.showChildView('current', modelView);
      return this;
    },
    buildParent: function() {
      if ( !this.state.get('parent') ) {
        console.log( 'no parent' );
        Radio.channel('RootView').request('set:error', 'No Parent!' );
        return;
      }
      var parentModel = this.state.get('parent') || null;
      var parentView = new ParentView({ model: parentModel })
      this.showChildView('parent', parentView);
    },
    selectChildren: function() {
      if ( this.getCurrent().get('children').length ) {
        // Make sure that any lazy fetched models have children parsed into collection
        var children = this.getCurrent().get('children');
        this.state.set('parent', this.getCurrent() );
        this.setCurrent( children.at(0) );
        this.collection.push( children )
        // if child does not have children, lazy fetch
        if ( this.getCurrent().get('children') ) {
          this.getCurrent().fetch();
        }
      } else {
        Radio.channel('RootView').request('set:error', 'No Children');
      }
    },
    findNext: function() {
      var nextModel = this.getCurrent().findNext();
      if ( nextModel !== null ) {
        this.setCurrent( nextModel );
      } else {
        Radio.channel('RootView').request('set:error', 'No Next');
      }
      return this;
    },
    findPrev: function() {
      var prevModel = this.getCurrent().findPrev();
      if ( prevModel !== null ) {
        this.setCurrent( prevModel );
      } else {
        Radio.channel('RootView').request('set:error', 'No Previous');
      }
      return this;
    },
    selectParent: function() {
      var parentId = this.getCurrent().get('skribbl_parent');
      var parentModel = new SkribbleModel({ _id: parentId });
    }
  });

  return SkribbleManagerView;
});
