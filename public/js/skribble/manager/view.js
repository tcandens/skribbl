define([
  'marionette',
  'backbone.radio',
  'skribble/service',
  'skribble/new/view',
  'skribble/current/view',
  'skribble/parent/view',
  'user/service',
  'text!skribble/manager/template.html'
], function( Marionette, Radio, SkribbleService, NewSkribbleView, CurrentSkribbleView, ParentSkribbleView, UserService, template ) {
  'use strict';

  var ManagerChannel = Radio.channel('SkribbleManager');
  var ServiceChannel = Radio.channel('SkribbleService');
  var RouterChannel = Radio.channel('Router');
  var RootChannel = Radio.channel('RootView')
  var userService = UserService.getInstance();

  var SkribbleManagerView = Marionette.LayoutView.extend({
    tagName: 'section',
    className: 'c-skribble-manager center-block',
    template: _.template( template ),
    regions: {
      current: '.current-container',
      parent: '.parent-container',
      new: '.new-container'
    },
    initialize: function( options ) {
      // Attach instance of SkribbleService for requesting skribble data
      this.service = SkribbleService.getInstance();
      // Listen to service event on seeded to build first views
      ServiceChannel.reply('seeded', this.build, this);
      // Global method to test if manager is rendered
      ManagerChannel.reply('isRendered', function() {
        return this._isRendered;
      }, this );
    },
    onRender: function() {
      if ( userService.isAuthenticated() ) {
        this.showChildView('new', new NewSkribbleView() );
      }
    },
    onBeforeDestroy: function() {
      RootChannel.request('removeClass', 'is-switched');
    },
    ui: {
      next: '.ui-next-button',
      prev: '.ui-prev-button',
      children: '.ui-children-button',
      parent: '.ui-parent-button'
    },
    events: {
      'click @ui.next': 'findNext',
      'click @ui.prev': 'findPrev',
      'click @ui.children': 'selectChildren',
      'click @ui.parent': 'selectParent'
    },
    build: function( skribblePackage ) {
      var currentView = new CurrentSkribbleView({ model: skribblePackage.current });
      var parentView = new ParentSkribbleView({ model: skribblePackage.parent });
      if ( skribblePackage.current ) this.showChildView('current', currentView);
      if ( skribblePackage.parent ) this.showChildView('parent', parentView);
      if ( !skribblePackage.parent && this.getChildView('parent') ) this.getChildView('parent').destroy();
      RootChannel.request('toggleClass', 'is-switched');
      this.el.className = skribblePackage.displayClass + ' ' + this.className;
      this.navigate( skribblePackage );
      return this;
    },
    navigate: function( skribblePackage ) {
      var id = skribblePackage.current.get('_id');
      var url = 'skribble/' + id;
      RouterChannel.request('navigate', url, { trigger: false, replace: true });
    },
    selectChildren: function() {
      RootChannel.request('setClass', 'is-switching-children');
      var skribblePackage = this.service.findChild();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    findNext: function() {
      RootChannel.request('setClass', 'is-switching-next');
      var skribblePackage = this.service.findNext();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    findPrev: function() {
      RootChannel.request('setClass', 'is-switching-prev');
      var skribblePackage = this.service.findPrevious();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    selectParent: function() {
      RootChannel.request('setClass', 'is-switching-parent');
      this.service.findParent(function( skribblePackage ) {
        this.build( skribblePackage );
        this.navigate( skribblePackage );
        console.log( skribblePackage );
      }.bind( this ));
    }
  });

  return SkribbleManagerView;
});
