define([
  'marionette',
  'underscore',
  'backbone.radio',
  'user/service',
  'text!navigation/template.html'
], function( Marionette, _, Radio, UserService, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');

  var service = UserService.getInstance();

  var NavView = Marionette.ItemView.extend({
    template: _.template( template ),
    ui: {
      loginLink: '#login-link',
      logoutLink: '#logout-link',
      profileLink: '#profile-link'
    },
    events: {
      'click @ui.loginLink': 'login',
      'click @ui.randomLink': 'randomSkribble',
      'click @ui.profileLink': 'profile'
    },
    toggleLogin: function() {
      if ( service.isAuthenticated() ) {
        this.ui.loginLink.hide();
      } else {
        this.ui.logoutLink.hide();
        this.ui.profileLink.hide();
      }
    },
    onBeforeShow: function() {
      this.toggleLogin();
    },
    login: function( e ) {
      e.preventDefault();
      RouterChannel.request('navigate', 'user/login', {trigger:true, replace:false});
      console.log('LOGIN!');
    },
    profile: function() {
      RouterChannel.request('navigate', 'user/profile', {trigger: true});
    },
    randomSkribble: function() {
      RouterChannel.request('navigate', 'skribble/random', {trigger:true});
    }
  });
  return NavView;
});
