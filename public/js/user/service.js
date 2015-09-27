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
          // Test token freshness
          $.ajax({
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: 'api/token',
            data: JSON.stringify({ eat: userCookie.token })
          })
            .done(function( data, status, xhr ) {
              // Status returns with 200
              user.token = userCookie.token;
              user.email = userCookie.email;
              user.username = userCookie.username;
              user.isAuthenticated = true;
              vent.request('user', user);
            })
            .fail(function( xhr, status, error ) {
              // Status 401 Unauthorized, clear expired cookie
              cookies.remove( config.cookieName );
            });
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
            vent.request('user', user);
          })
          .fail(function ( xhr, status, error ) {
            if ( typeof callback === 'function' ) callback( error, xhr );
            vent.request('user', user);
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
            cookies.set( config.cookieName, tempCookie, { expires: 7, path: '' } );
            // Set User and isAuthenticated
            user.isAuthenticated = true;
            user.email = data.email;
            user.token = data.eat;
            user.username = data.username;
            // Emit event?
            if ( typeof callback === 'function' ) callback( null, user );
            vent.request('user', user);
          })
          .fail(function ( xhr, status, error ) {
            // Emit event?
            if ( typeof callback === 'function' ) callback( error, user );
            vent.request('user', user);
          })
      }

      // isAuthenticated
      function isAuthenticated() {
        return user.isAuthenticated;
      }

      // getCredentials
      function getCredentials( callback ) {
        if ( user.isAuthenticated ) {
          if ( typeof callback === 'function' ) { callback( user ) }
          else { return user };
          vent.request('user', user);
        } else {
          RouterChannel.request('navigate', 'user/login', {trigger: true, replace: false});
          vent.request('user', user);
          console.log( 'Is not authenticated' );
        }
      }

      // LOGOUT
      function logout() {
        cookies.remove( config.cookieName, { path: '' } );
        user.isAuthenticated = false;
        vent.request('user', user);
        RouterChannel.request('navigate', 'user/login', {trigger: true, replace: false});
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
