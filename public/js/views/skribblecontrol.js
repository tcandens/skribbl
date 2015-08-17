define([
  'marionette',
  'underscore',
  'jquery',
  'backbone.radio',
  'models/skribblecontrol',
  'models/skribblemodel',
  'text!templates/skribblecontrol.html',
  'views/currentskribble'
], function( Marionette, _, $, Radio, SkribbleControlModel, SkribbleModel, template, CurrentSkribbleView ) {
  'use strict';

  var SkribbleControlView = Marionette.LayoutView.extend({
    tagName: 'section',
    className: 'c-skribble-control',
    template: _.template( template ),
    regions: {
      current: '.c-current-skribble',
      parent: '.c-parent-skribble',
      children: '.c-children'
    },
    initialize: function() {
      Radio.channel('skribbleControl').reply('set:currentSkribble', function( view ) {
        this.showChildView('current', view);
        this.model = view.model;
        if ( this.model.get('parent_skribbl') ) {
          var parentSkribbleModel = new SkribbleModel();
          parentSkribbleModel.url = this.model.get('parent_skribbl');
          var fetched = parentSkribbleModel.fetch();
        }
        if ( this.model.get('children').length > 0 ) {
          var children = this.model.get('children').models;
          var currentIndex = this.model.get('currentChild') || 0;
          var child = children[ currentIndex ];
          var childSkribbleView = new CurrentSkribbleView({ model: child });
          this.showChildView('children', childSkribbleView );
          this.model.set('currentChild', 0);
        }
      }, this);
    },
    events: {
      'click .c-skribble-control__nav-next': 'showNext',
      'click .c-skribble-control__nav-prev': 'showPrev',
    },
    showNext: function() {
      if ( this.model.get('currentChild') == this.model.get('children').models.length - 1 ) {
        console.log( 'Test True' );
        this.model.set({ currentChild: 0 });
      } else {
        this.model.set('currentChild', this.model.get('currentChild') + 1 );
      }
      var childIndex = this.model.get('currentChild');
      var nextModel = this.model.get('children').models[ childIndex ];
      var nextView = new CurrentSkribbleView({ model: nextModel });
      this.showChildView('children', nextView);
    },
    showPrev: function() {
      if ( this.model.get('currentChild') == 0 ) {
        this.model.set('currentChild', this.model.get('children').models.length - 1 );
      } else {
        this.model.set('currentChild', this.model.get('currentChild') - 1 );
      }
      var childIndex = this.model.get('currentChild');
      var prevModel = this.model.get('children').models[ childIndex ];
      var prevView = new CurrentSkribbleView({ model: prevModel });
      this.showChildView('children', prevView);
    }
  });

  return SkribbleControlView;
});
