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
  var NavChannel = Radio.channel('Navigation');

  var service = UserService.getInstance();

  var NavView = Marionette.ItemView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav nav-pills',
    template: _.template( template ),
    ui: {
      loginLink: '#login-link',
      logoutLink: '#logout-link',
      profileLink: '#profile-link',
      homeLink: '#home-link'
    },
    events: {
      'click @ui.loginLink': 'showLogin',
      'click @ui.randomLink': 'showRandomSkribble',
      'click @ui.profileLink': 'showProfile',
      'click @ui.homeLink': 'showHome'
    },
    initialize: function() {
      UserChannel.reply('user', function( user ) {
        this.toggleLogin( user );
      }, this);
      NavChannel.reply('activate', function( button ) {
        console.log( button );
        this.activateNav( button );
      }, this);
    },
    activateNav: function( button ) {
      switch( button ) {
        case 'login':
          this.ui.loginLink.addClass('active');
          console.log('activate login button');
          break;
        default:
          console.log( button );
      }
    },
    toggleLogin: function( user ) {
      if ( user.isAuthenticated ) {
        this.ui.loginLink.addClass('disabled').removeClass('active');
        this.ui.logoutLink.addClass('disabled').removeClass('active');
        this.ui.profileLink.removeClass('disabled');
      } else {
        this.ui.loginLink.removeClass('disabled');
        this.ui.logoutLink.addClass('disabled').removeClass('active');
        this.ui.profileLink.addClass('disabled').removeClass('active');
      }
    },
    onBeforeShow: function() {
      service.credentials(function( user ) {
        this.toggleLogin( user );
      }.bind( this ))
    },
    showHome: function( e ) {
      e.preventDefault();
      RouterChannel.request('navigate', '', {trigger:true});
    },
    showLogin: function( e ) {
      e.preventDefault();
      RouterChannel.request('navigate', 'user/login', {trigger:true, replace:false});
    },
    showProfile: function( e ) {
      e.preventDefault();
      RouterChannel.request('navigate', 'user/profile', {trigger: true});
    },
    showRandomSkribble: function() {
      RouterChannel.request('navigate', 'skribble/random', {trigger:true});
    }
  });
  return NavView;
});
