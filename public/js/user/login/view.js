define([
  'marionette',
  'underscore',
  'jquery',
  'user/service',
  'text!user/login/template.html'
], function( Marionette, _, $, UserService, template ) {
  'use strict';

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
      e.preventDefault();


      var authString = base64.encode( this.ui.username.val() + ':' + this.ui.password.val() );

      $.ajax({
        type: 'GET',
        url: 'api/login',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader( 'Authorization', 'Basic ' + authString )
        },
        success: function( data, status, xhr ) {
          console.log( data );
          console.log( xhr );
        },
        dataType: 'json'
      });
    }
  });
  return LoginView;
});
