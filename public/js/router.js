define([ 'marionette', 'eventbus', 'rootview' ],
  function( Marionette, EventBus, RootView ) {
    var Router = Marionette.AppRouter.extend({
      routes: {
        '': 'showRandomStory',
        ':id': 'showSkribble'
      },
      showRandomStory: function() {
      },
      showSkribble: function( id ) {
      }
    });
    return Router;
  }
);
