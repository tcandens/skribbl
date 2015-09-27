define([
  'marionette',
  'underscore',
  'jquery',
  'user/service',
  'backbone.radio',
  'text!user/login/template.html'
], function( Marionette, _, $, UserService, Radio, template ) {
  'use strict';

  var ServiceChannel = Radio.channel('UserService');
  var RouterChannel = Radio.channel('Router');
  var service = UserService.getInstance();

  var LoginView = Marionette.ItemView.extend({
    tagName: 'aside',
    template: _.template( template ),
    ui: {
      username: 'input[type=text]',
      password: 'input[type=password]',
      submit: 'input[type=submit]',
      form: 'form#login-form',
      signUp: 'a#signup-link'
    },
    events: {
      'submit @ui.form': 'submitForm',
      'focus @ui.form': 'startAdding',
      'blur @ui.form': 'stopAdding',
      'click @ui.signUp': function( e ) {
        e.preventDefault();
        RouterChannel.request('navigate', 'user/create', {trigger: true, replace:false});
      }
    },
    startAdding: function() {
      $('html').addClass('is-logging-in');
    },
    stopAdding: function() {
      $('html').removeClass('is-logging-in');
    },
    submitForm: function( e ) {
      $('html').removeClass('is-logging-in');
      e.preventDefault();
      var username = this.ui.username.val();
      var password = this.ui.password.val();
      service.login(
        username,
        password,
        function( error, user ) {
          if ( error ) return console.log( 'There was an error: ' + error );
          RouterChannel.request('navigate', 'skribble/random', {trigger: true});
        }
      );
    }
  });
  return LoginView;
});
