define([
  'marionette',
  'backbone.radio',
  'user/login/view',
  'user/create/view'
], function( Marionette, Radio, LoginView, CreateView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');

  var UserController = {
    login: function() {
      var loginView = new LoginView();
      RootChannel.request('set:content', loginView);
    },
    create: function() {
      var createView = new CreateView();
      RootChannel.request('set:content', createView);
    }
  };
  return UserController;
});
