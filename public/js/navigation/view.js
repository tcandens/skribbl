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
        console.log('user change');
      }, this);
      NavChannel.reply('activate', function( button ) {
        console.log( button );
        this.activateNav( button );
      }, this);
    },
    activateNav: function( button ) {
      switch( button ) {
        case 'login':
          this.ui.loginLink.addClass('hidden');
          console.log(button)
          break;
        default:
          console.log( button );
      }
    },
    toggleLogin: function( user ) {
      if ( user.isAuthenticated ) {
        this.ui.loginLink.prop('hidden', true);
        this.ui.logoutLink.removeAttr('hidden');
        this.ui.profileLink.removeAttr('hidden');
      } else {
        this.ui.loginLink.removeAttr('hidden');
        this.ui.logoutLink.prop('hidden', true);
        this.ui.profileLink.prop('hidden', true);
      }
    },
    onBeforeShow: function() {
      console.log("on before show");
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
