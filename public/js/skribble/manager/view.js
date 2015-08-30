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
      if ( !skribblePackage.parent && this.getChildView('parent') ) this.getChildView('parent').destroy();
      return this;
    },
    selectChildren: function() {
      var skribblePackage = this.service.findChild();
      this.build( skribblePackage );
    },
    findNext: function() {
      var skribblePackage = this.service.findNext();
      this.build( skribblePackage );
    },
    findPrev: function() {
      var skribblePackage = this.service.findPrevious();
      this.build( skribblePackage );
    },
    selectParent: function() {
      var skribblePackage = this.service.findParent();
      this.build( skribblePackage );
    }
  });

  return SkribbleManagerView;
});
