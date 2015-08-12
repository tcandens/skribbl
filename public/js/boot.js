requirejs.config({
  baseUrl: './',
  paths: {
    'underscore': '../vendor/underscore/underscore',
    'jquery': '../vendor/jquery/dist/jquery',
    'backbone': '../vendor/backbone/backbone',
    'marionette': '../vendor/backbone.marionette/lib/backbone.marionette',
  }
});

requirejs( ['underscore', 'jquery', 'backbone', 'marionette'],
  function(_, $, Backbone, Marionette) {
    var App = Marionette.Application.extend({
      initialize: function() {
        console.log('App Started!');
      }
    });
    window.App = new App();
  }
);
