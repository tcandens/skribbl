define([
  'jquery',
  'backbone.radio',
  'base64',
  'cookies'
], function( $, Radio, base64, cookies ) {
  'use strict';

  var RouterChannel = Radio.channel('Router');
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

      function startCheck() {
        var userCookie = cookies.getJSON( config.cookieName ) || undefined;
        if ( userCookie ) {
          // fetch user info
          user.token = userCookie.token;
          user.email = userCookie.email;
          user.username = userCookie.username;
          user.isAuthenticate = true;
          vent.request('user', user);
          console.log( user );
        }
      }

      // Create User
      function createUser( userObject, callback ) {
        $.ajax({
          method: 'POST',
          url: 'api/users',
          data: JSON.stringify( userObject ),
          dataType: 'json',
          contentType: 'application/json'
        })
          .done(function ( data, status, xhr ) {
            if ( typeof callback === 'function' ) callback( null, data );
          })
          .fail(function ( xhr, status, error ) {
            if ( typeof callback === 'function' ) callback( error, xhr );
          });
      }
      // LOGIN
      function login( email, password, callback ) {
        var authString = 'Basic ';
        authString += base64.encode( email + ':' + password );

        $.ajax({
          method: 'GET',
          url: 'api/login',
          dataType: 'json',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader( 'Authorization', authString );
          }
        })
          .done(function ( data, status, xhr ) {
            // Set Cookies!
            var tempCookie = {
              token: data.eat,
              email: data.email,
              username: data.username
            }
            cookies.set( config.cookieName, tempCookie );
            console.log( tempCookie );
            // Set User and isAuthenticated
            user.isAuthenticated = true;
            user.email = data.email;
            user.token = data.eat;
            user.username = data.username;
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
        return user.isAuthenticated;
      }

      // getCredentials
      function getCredentials( callback ) {
        if ( user.isAuthenticated ) {
          if ( typeof callback === 'function' ) callback( user );
        } else {
          RouterChannel.request('navigate', 'user/login', {trigger: true, replace: false});
          console.log( 'Is not authenticated' );
        }
      }

      // LOGOUT
      function logout() {

      }

      startCheck();

      // Return Public Functions Object
      return {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated,
        credentials: getCredentials,
        createUser: createUser,
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
