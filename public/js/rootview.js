define([ 'marionette', 'eventbus', 'randomstory/view' ],
  function( Marionette, EventBus, RandomStoryView ) {
    var RootView = Marionette.LayoutView.extend({
      el: '#main',
      template: '#main-template',
      regions: {
        current: '#current'
      },
      initialize: function() {
      },
      onBeforeShow: function() {
        this.getRegion('current').show( new RandomStoryView() );
      }
    });
    return RootView;
  }
);
