requirejs.config({
  baseUrl: 'js/',
  paths: {
    'lodash': '../../vendor/lodash/lodash',
    'jquery': '../../vendor/jquery/dist/jquery',
    'backbone': '../../vendor/backbone/backbone',
    'wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
    'marionette': '../../vendor/backbone.marionette/lib/backbone.marionette',
  },
  map: {
    '*': {
      underscore: 'lodash'
    }
  }
});

requirejs( [ 'app' ],
  function( App ) {
    var app = new App();
    app.start();
    window.app = app;
  }
);
