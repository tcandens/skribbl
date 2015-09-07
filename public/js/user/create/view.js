define([
  'marionette',
  'underscore',
  'backbone.radio',
  'user/service',
  'text!user/create/template.html'
], function( Marionette, _, Radio, UserService, template ) {
  'use strict';

  var ServiceChannel = Radio.channel('UserService');
  var RouterChannel = Radio.channel('Router');
  var service = UserService.getInstance();

  var CreateUserView = Marionette.ItemView.extend({
    template: _.template( template ),
    className: 'col-sm-12 col-lg-4 col-lg-offset-4',
    ui: {
      email: '.ui-email',
      username: '.ui-username',
      password: '.ui-password',
      submit: '.ui-submit',
      form: '.ui-form'
    },
    events: {
      'submit @ui.form': 'submitForm'
    },
    submitForm: function( e ) {
      e.preventDefault();
      var user = {
        username: this.ui.username.val(),
        email: this.ui.email.val(),
        password: this.ui.password.val()
      }
      service.createUser( user, this.handleCreation );
    },
    handleCreation: function( error, data ) {
      // Error Service: This error will mean that user already exists
      if ( error ) console.log( 'Error creating user: ' + error );
      if ( data.success ) RouterChannel.request('navigate', 'user/login', {trigger: true} );
    }
  });
  return CreateUserView;
});
