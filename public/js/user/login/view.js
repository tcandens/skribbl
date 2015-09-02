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
    initialize: function( options ) {
      ServiceChannel.reply('user', function( user ) {
        alert('Email: ' + user.email );
        console.log('Hello!');
      }, this );
    },
    ui: {
      username: 'input[type=text]',
      password: 'input[type=password]',
      submit: 'input[type=submit]',
      form: 'form.c-login-form'
    },
    events: {
      'submit @ui.form': 'submitForm'
    },
    submitForm: function( e ) {
      console.log( e );
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
