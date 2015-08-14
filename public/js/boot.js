requirejs.config({
  baseUrl: 'js/',
  paths: {
    'lodash': '../../vendor/lodash/lodash',
    'jquery': '../../vendor/jquery/dist/jquery',
    'backbone': '../../vendor/backbone/backbone',
    'marionette': '../../vendor/backbone.marionette/lib/backbone.marionette',
    'backbone.radio': '../vendor/backbone.radio/build/backbone.radio',
    'marionette.radio': 'marionette.radio'
  },
  map: {
    '*': {
      marionette: 'marionette.radio',
      underscore: 'lodash'
    },
    'marionette.radio': {
      marionette: 'marionette'
    }
  }
});

requirejs( [ 'app' ],
  function( App ) {
    var app = new App();
    app.start();
  }
);
