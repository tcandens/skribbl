define([
  'jquery',
  'backbone.radio',
  'base64',
  'cookies'
], function( $, Radio, base64, cookies ) {
  'use strict';

  // Singleton Service For User login, sessions, and auth
  var UserService = (function () {
    var instance;

    var vent = Radio.channel('UserService');

    function initService() {

      var user;

      // Create User
      function createUser( email, password, username ) {

      }
      // LOGIN
      function login( email, password ) {

      }

      // isAuthenticated
      function isAuthenticated() {

      }

      // getCredentials
      function getCredentials() {

      }

      // LOGOUT
      function logout() {

      }

      // Return Public Functions Object
      return {
        login: login.bind( this ),
        logout: logout.bind( this ),
        isAuthenticated: isAuthenticated.bind( this ),
        credentials: getCredentials.bind( this ),
        createUser: createUser.bind( this )
      }

    }

    return {
      getInstance: function() {
        if ( !instance ) {
          instance = initService();
        }
        return instance;
      }
    }

  })();

  return UserService;
});
