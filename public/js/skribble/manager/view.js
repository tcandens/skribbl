define([
  'marionette',
  'underscore',
  'jquery',
  'backbone',
  'backbone.radio',
  'skribble/service',
  'text!skribble/manager/template.html',
], function( Marionette, _, $, Backbone, Radio, SkribbleService, template ) {
  'use strict';

  var ManagerChannel = Radio.channel('SkribbleManager');

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
      this.service = new SkribbleService();
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
    selectChildren: function() {
    },
    findNext: function() {
    },
    findPrev: function() {
    },
    selectParent: function() {
    }
  });

  return SkribbleManagerView;
});
