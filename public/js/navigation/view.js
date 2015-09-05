define([
  'marionette',
  'underscore',
  'backbone.radio',
  'user/service',
  'text!navigation/template.html'
], function( Marionette, _, Radio, UserService, template ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');
  var UserChannel = Radio.channel('UserService');

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
    initialize: function() {
      UserChannel.reply('user', function( user ) {
        this.toggleLogin( user );
      }, this)
    },
    toggleLogin: function( user ) {
      if ( user.isAuthenticated ) {
        this.ui.loginLink.hide();
        this.ui.logoutLink.hide();
        this.ui.profileLink.show();
      } else {
        this.ui.loginLink.show();
        this.ui.logoutLink.hide();
        this.ui.profileLink.hide();
      }
    },
    onBeforeShow: function() {
      service.credentials(function( user ) {
        this.toggleLogin( user );
      }.bind( this ))
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
