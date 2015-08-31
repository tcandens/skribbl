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

    var config = {
      cookieName: 'eat',
    }

    function initService() {

      var user = {
        isAuthenticated: false
      };

      // Create User
      function createUser( email, password, username ) {

      }
      // LOGIN
      function login( email, password, callback ) {
        var authString = 'Basic ';
        authString += base64.encode( email + ':' + password );
        //authString += btoa( email + ':' + password );
        console.log( authString );

        $.ajax({
          type: 'GET',
          url: 'api/login',
          dataType: 'json',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader( 'Authorization', authString );
          }
        })
          .done(function ( data, status, xhr ) {
            // Set Cookies!
            cookies.set( config.cookieName, data.eat );
            // Set User and isAuthenticated
            user.isAuthenticated = true;
            user.email = email;
            user.token = data.eat;
            // Emit event?
            if ( typeof callback === 'function' ) callback( null, user );
          })
          .fail(function ( xhr, status, error ) {
            // Emit event?
            if ( typeof callback === 'function' ) callback( error, user );
          })
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
