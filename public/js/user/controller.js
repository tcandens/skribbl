define([
  'marionette',
  'backbone.radio',
  'user/login/view'
], function( Marionette, Radio, LoginView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');

  var UserController = {
    login: function() {
      var loginView = new LoginView();
      RootChannel.request('set:content', loginView);
    }
  };
  return UserController;
});
