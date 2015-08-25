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
      this.listenTo( this.state, 'change:current', this.buildAll );
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
      if ( this.getCurrent().get('parent_skribbl') ) {
        console.log( 'Parent found!' );
      } else {
        console.log( 'No Parent' );
      }
      return this;
    },
    selectChildren: function() {
      if ( this.getCurrent().get('children') ) {
        var child = this.getCurrent().get('children').at( 0 );
        this.state.set('current', child);
        // if child does not have children, lazy fetch
        if ( !child.get('children') ) {
          var success = function ( model, res, opt ) {
            console.log( model );
          }
          var failure = function ( model, res, opt ) {
            console.log( model );
            console.log('failure');
          }
          child.fetch({ success, failure });
        }
        console.log('children exist');
      } else {
        console.log('no children');
      }
    },
    findNext: function() {
      console.log('Find Next');
    }
  });

  return SkribbleManagerView;
});
