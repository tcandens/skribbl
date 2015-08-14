define([ 'marionette', 'eventbus', 'randomstory/view' ],
  function( Marionette, EventBus, RandomStoryView ) {
    var RootView = Marionette.LayoutView.extend({
      el: '#main',
      template: '#main-template',
      regions: {
        current: '#current'
      },
      initialize: function() {
        EventBus.reqres.setHandler('root', function(newView) {
          this.getRegion('current').show( newView );
        });
      },
      onBeforeShow: function() {
        this.getRegion('current').show( new RandomStoryView() );
      }
    });
    return RootView;
  }
);
