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
      // Radio accessible bool for rendering flow
      ManagerChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this);
      // Radio accessible command to set collection from router controller
      ManagerChannel.reply('set:collection', function( collection ) {
        this.collection = collection;
        this.state.set({
          current: this.collection.at( 0 )
        });
      }, this);
      ManagerChannel.reply('build:all', function() {
        this.buildAll();
      }, this);
    },
    events: {
      'click .c-skribble-manager__nav-next': 'findNext',
      'click .c-skribble-manager__nav-prev': 'findPrev',
      'click .c-skribble-manager__select-child': 'selectChildren'
    },
    getCurrent: function() {
      return this.state.get('current') || this.collection.at( 0 );
    },
    setCurrent: function( model ) {
      this.state.set('current', model);
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
      if ( !this.state.get('parent') ) return;
      var parentModel = this.state.get('parent') || null;
      var parentView = new ParentView({ model: parentModel })
      this.showChildView('parent', parentView);
    },
    selectChildren: function() {
      if ( this.getCurrent().get('children') ) {
        // Make sure that any lazy fetched models have children parsed into collection
        var child = this.getCurrent().get('children').at( 0 );
        this.state.set('parent', this.getCurrent() );
        this.setCurrent( child );
        // if child does not have children, lazy fetch
        if ( this.getCurrent().get('children') ) {
          this.getCurrent().fetch();
        }
      } else {
        console.log('No Children');
      }
    },
    findNext: function() {
      var nextModel = this.getCurrent().findNext();
      this.setCurrent( nextModel );
      return this;
    },
    findPrev: function() {
      var prevModel = this.getCurrent().findPrev();
      this.setCurrent( prevModel );
      return this;
    }
  });

  return SkribbleManagerView;
});
