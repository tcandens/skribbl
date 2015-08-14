define([ 'marionette', 'eventbus', 'rootview' ],
  function( Marionette, EventBus, RootView ) {
    var Router = Marionette.AppRouter.extend({
      routes: {
        '': 'showRandomStory',
        ':id': 'showSkribble'
      },
      showRandomStory: function() {
        EventBus.vent.trigger('global', 'router:showRandomStory');
        var rootView = new RootView();
        rootView.render();
      },
      showSkribble: function( id ) {
        alert( id );
      }
    });
    return Router;
  }
);
