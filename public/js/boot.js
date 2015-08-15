requirejs.config({
  baseUrl: 'js',
  paths: {
    'lodash': '../../vendor/lodash/lodash',
    'jquery': '../../vendor/jquery/dist/jquery',
    'backbone': '../../vendor/backbone/backbone',
    'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
    'marionette': '../../vendor/backbone.marionette/lib/core/backbone.marionette',
    'backbone.radio': '../../vendor/backbone.radio/build/backbone.radio',
    'marionette.radio': 'marionette.radio',
    'text': '../vendor/requirejs-text/text',
  },
  map: {
    '*': {
      'marionette': 'marionette.radio',
      'underscore': 'lodash',
      'backbone.wreqr': 'backbone.radio'
    },
    'marionette.radio': {
      'marionette': 'marionette'
    }
  }
});

requirejs( [ 'app' ],
  function( App ) {
    'use strict';

    var app = new App();
    app.start();
  }
);
