define([ 'marionette', '../views/skribbls', '../models/skribbl' ],
  function( Marionette, SkribblView, Skribbl ) {
    var RootView = Marionette.LayoutView.extend({
      el: 'body',
      initialize: function() {
      },
      template: '#main-template',
      regions: {
        left: '#left',
        right: '#right'
      }
    });
    return RootView;
  }
);
