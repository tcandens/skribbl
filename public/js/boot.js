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
    'base64': '../vendor/base-64/base64',
    'cookies': '../vendor/js-cookie/src/js.cookie',
    'timelineLite': '../vendor/gsap/src/minified/TimelineLite.min',
    'tweenLite': '../vendor/gsap/src/minified/TweenLite.min',
    'easingPack': '../vendor/gsap/src/minified/easing/EasePack.min',
    'cssPlugin': '../vendor/gsap/src/minified/plugins/CSSPlugin.min',
    'fittext': '../vendor/FitText.js/jquery.fittext'
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
  },
  shim: {
    'fittext': ['jquery']
  }
});

requirejs( [ 'app' ],
  function( App ) {
    'use strict';

    var app = new App();
    app.start();
  }
);
