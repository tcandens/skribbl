define([
  'marionette',
  'backbone.radio',
  'user/login/view',
  'user/create/view',
  'user/profile/view'
], function( Marionette, Radio, LoginView, CreateView, ProfileView ) {
  'use strict';

  var RootChannel = Radio.channel('RootView');
  var NavChannel = Radio.channel('Navigation');

  var UserController = {
    login: function() {
      var loginView = new LoginView();
      RootChannel.request('set:content', loginView);
      NavChannel.request('active', 'login');
    },
    create: function() {
      var createView = new CreateView();
      RootChannel.request('set:content', createView);
    },
    profile: function() {
      var profileView = new ProfileView();
      RootChannel.request('set:content', profileView);
    }
  };
  return UserController;
});
