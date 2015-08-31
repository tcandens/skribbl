define([
  'marionette',
  'underscore',
  'jquery',
  'user/service',
  'text!user/login/template.html'
], function( Marionette, _, $, UserService, template ) {
  'use strict';

  var service = UserService.getInstance();

  var LoginView = Marionette.ItemView.extend({
    tagName: 'aside',
    template: _.template( template ),
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
          if ( error ) console.log( 'There was an error: ' + error );
          console.log( user );
        }
      );
    }
  });
  return LoginView;
});
