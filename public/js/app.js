define('app',
  [ 'marionette', 'backbone', 'wreqr', 'views/rootview', 'collections/master' ],
  function( Marionette, Backbone, wreqr, RootView, MasterCollection ) {
    var App = Marionette.Application.extend({
      rootView: new RootView(),
      onStart: function() {
        if ( Backbone.history ) {
          Backbone.history.start();
          console.log('History started!');
        }
        this.collection = new MasterCollection();
        this.collection.url = 'api/storys/random';
        this.collection.fetch();
        console.log('App Started');
        this.rootView.render();
      }
    });
    return App;
  }
);
