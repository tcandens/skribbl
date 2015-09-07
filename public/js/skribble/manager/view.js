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
  var userService = UserService.getInstance();

  var SkribbleManagerView = Marionette.LayoutView.extend({
    tagName: 'section',
    className: 'c-skribble-manager col-sm-12 col-lg-4 col-lg-offset-4',
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
      // Unclear conditional structure
      var currentView = new CurrentSkribbleView({ model: skribblePackage.current });
      var parentView = new ParentSkribbleView({ model: skribblePackage.parent });
      if ( skribblePackage.current ) this.showChildView('current', currentView);
      if ( skribblePackage.parent ) this.showChildView('parent', parentView);
      if ( !skribblePackage.parent && this.getChildView('parent') ) this.getChildView('parent').destroy();
      this.navigate( skribblePackage );
      return this;
    },
    navigate: function( skribblePackage ) {
      var id = skribblePackage.current.get('_id');
      var url = 'skribble/' + id;
      RouterChannel.request('navigate', url, { trigger: false, replace: true });
    },
    selectChildren: function() {
      var skribblePackage = this.service.findChild();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    findNext: function() {
      var skribblePackage = this.service.findNext();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    findPrev: function() {
      var skribblePackage = this.service.findPrevious();
      this.build( skribblePackage );
      this.navigate( skribblePackage );
    },
    selectParent: function() {
      this.service.findParent(function( skribblePackage ) {
        this.build( skribblePackage );
        this.navigate( skribblePackage );
        console.log( skribblePackage );
      }.bind( this ));
    }
  });

  return SkribbleManagerView;
});
