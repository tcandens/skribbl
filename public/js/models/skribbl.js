define('models/skribbl',
  [ 'backbone' ],
  function( Backbone ) {
    return Backbone.Model.extend({
      initialize: function() {
        console.log( 'new skribbl!' );
      }
    });
  }
);
