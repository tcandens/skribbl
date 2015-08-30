define([
  'marionette',
  'backbone.radio',
  'skribble/service',
  'skribble/new/view',
  'skribble/current/view',
  'skribble/parent/view',
  'text!skribble/manager/template.html'
], function( Marionette, Radio, SkribbleService, NewSkribbleView, CurrentSkribbleView, ParentSkribbleView, template ) {
  'use strict';

  var ManagerChannel = Radio.channel('SkribbleManager');
  var ServiceChannel = Radio.channel('SkribbleService');

  var SkribbleManagerView = Marionette.LayoutView.extend({
    tagName: 'section',
    className: 'c-skribble-manager',
    template: _.template( template ),
    regions: {
      current: '.c-current-skribble',
      parent: '.c-parent-skribble',
      children: '.c-children-skribble',
      new: '.c-new-skribble'
    },
    initialize: function( options ) {
      // Attach instance of SkribbleService for requesting skribble data
      this.service = SkribbleService.getInstance();
      // Listen to service event on seeded to build first views
      ServiceChannel.reply('seeded', this.build, this);
    },
    onRender: function() {
      this.showChildView('new', new NewSkribbleView() );
    },
    events: {
      'click .c-skribble-manager__nav-next': 'findNext',
      'click .c-skribble-manager__nav-prev': 'findPrev',
      'click .c-skribble-manager__select-child': 'selectChildren',
      'click .c-skribble-manager__select-parent': 'selectParent'
    },
    build: function( skribblePackage ) {
      console.log( skribblePackage );
      var currentView = new CurrentSkribbleView({ model: skribblePackage.current });
      var parentView = new ParentSkribbleView({ model: skribblePackage.parent });
      if ( skribblePackage.current ) this.showChildView('current', currentView);
      if ( skribblePackage.parent ) this.showChildView('parent', parentView);
      return this;
    },
    selectChildren: function() {
      // Request from SkribbleService singleton then build and display
      var skribblePackage = this.service.findChild();
      this.build( skribblePackage );
      // views with returned object
    },
    findNext: function() {
      // Request from SkribbleService singleton then build and display
      // views with returned object
    },
    findPrev: function() {
      // Request from SkribbleService singleton then build and display
      // views with returned object
    },
    selectParent: function() {
      // Request from SkribbleService singleton then build and display
      // views with returned object
    }
  });

  return SkribbleManagerView;
});
