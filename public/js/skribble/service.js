define([
  'jquery',
  'backbone.radio',
  'skribble/model',
  'skribble/collection',
  'user/service',
  'base64'
], function( $, Radio, SkribbleModel, SkribbleCollection, UserService, base64 ) {
  'use strict';

  var userService = UserService.getInstance();

  // TODO: Consider Async Callback Based Versions of these methods
  var SkribbleService = (function () {

    var instance;

    var vent = Radio.channel('SkribbleService');

    function initService() {
      // A private master collection?
      var master = new SkribbleCollection();
      // Siblings collection
      var siblings = new SkribbleCollection();
      // Current reference
      var current;
      // Parent reference, a stack of predecessors
      //var _parents = new Stack();
      var parents = (function() {
        var stack = [];
        function _push( item ) {
          stack.push( item );
        }
        function _pop() {
          return stack.pop();
        }
        function _peek() {
          return stack[ stack.length - 1 ];
        }
        function _length() {
          return stack.length;
        }
        function _clear() {
          stack = [];
        }
        return {
          push: _push,
          pop: _pop,
          peek: _peek,
          length: _length,
          clear: _clear
        }
      })();
      // Children reference, remains an array until loaded into siblings
      //
      // Helper function to package internal data a object to pass through
      var _package = function() {
        return {
          current: current,
          parent: parents.peek()
        }
      }

      function seed( model, callback ) {
        // Seed with first model & emit event
        // 1. Add model to collection
        master.add( model, { reset: true } );
        // 2. Add model to current
        current = model;
        // 3. Fetch parent model from parent_skribbl id
        var parentModel;
        var parentId = model.get('parent_skribbl') || null;
        // if there is a parent_skribbl, fetch it
        if ( parentId ) {
          parentModel = new SkribbleModel({ _id: parentId });
          parentModel.asyncFetch(function( fetchedModel ) {
            parents.push( fetchedModel );
            var siblingsArray = fetchedModel.get('children') || [];
            // 4. Any children returned from parent fetch are loaded to siblings, minus current
            siblings.add( siblingsArray, {reset: true} );
            if ( typeof callback === 'function' ) {
              callback ( _package() );
            } else {
              vent.request('seeded ready', _package() );
            }
          });
        // Otherwise return model without parent
        } else {
          if ( typeof callback == 'function' ) {
            callback ( _package() );
          } else {
            vent.request('seeded ready', _package() );
          }
        }
      }

      // Select children
      function findChildren() {
        // TEST IF THERE ARE CHILDREN
        var children = current.get('children') || undefined;
        if ( !children ) {
          console.log('no children');
          return _package();
        }
        parents.push( current );
        console.log( parents.length() );
        // 3. Reset siblings collection & move any other children into siblings
        siblings.reset();
        siblings.add( children );
        current = siblings.at( 0 );
        // 4. Sync current to load more children
        var fetched = current.fetch();
        return _package();
      }

      // Find Next
      function findNextSibling() {
        // 1. Search siblings collection for next model
        var nextSibling = siblings.at( siblings.indexOf( current ) + 1 );
        // 2. Replace current with found model
        // 3. If next does not exist
        current = nextSibling || current;
        // 4. RETURN: object with current reference to build view as event
        return _package();
      }

      // Find Prev
      function findPreviousSibling() {
        // 1. Search siblings collection for previous model
        var previousSibling = siblings.at( siblings.indexOf( current ) - 1 );
        // 2. Replace current with found model
        // 3. If previoux does not exist, RETURN: current
        current = previousSibling || current;
        // 4. RETURN: object with current reference as event to build view
        return _package();
      }

      // Select Parent
      function findParent( callback ) {
        // TEST IF THERE IS A PARENT!
        if ( parents.length() <= 0 ) {
          // Check if _current.parent_skribbl exists
          var parentId = current.get('parent_skribbl') || undefined;
          // If it does create model and fetch it
          if ( parentId ) {
            var parentModel = new SkribbleModel({ id: parentId });
            parentModel.asyncFetch(function( fetched ) {
              current = fetched;
              var gParentId = fetched.get('parent_skribbl') || undefined;
              if ( gParentId ) {
                // Further parent needs to be fetched and its children bound to current siblings
                var gParentModel = new SkribbleModel({ id: gParentId });
                gParentModel.asyncFetch(function( fetched ) {
                  parent = fetched;
                  siblings.reset();
                  siblings.add( fetched.children );
                  if ( typeof callback === 'function' ) {
                    callback( _package() );
                  }
                })
              } else {
                parents.clear();
                if ( typeof callback === 'function' ) {
                  callback( _package() );
                }
              }
            });
          } else {
            if ( typeof callback === 'function' ) {
              callback( _package() );
            }
          }
          // Else return package
        } else {
          console.log( 'Parent Stack Not Empty!' );
          current = parents.pop();
          // Reset siblings
          siblings.reset();
          if ( parents.peek() ) {
            // Grab siblings from existing parent stack
            siblings.add( parents.peek().get('children') );
          }
          var parentId = current.get('parent_skribbl') || undefined;
          if ( parentId ) {
            var parentModel = new SkribbleModel({ id: parentId });
            parentModel.asyncFetch(function( model ) {
              siblings.add( model.get('children') );
            });
          }
          if ( typeof callback === 'function' ) {
            callback( _package() );
          }
        }
      }

      function createSkribble( skribble, callback ) {
        userService.credentials(function( user ) {
          var currentId = current.get('id') || current.get('_id') || undefined;
          var skribbleModel = current.clone().unset('_id').unset('id');
          skribbleModel.set({
            'eat': user.token,
            'parent_skribbl': currentId,
            'author': user.username,
            'content': skribble.content
          });
          skribbleModel.save({
            success: callback,
            failure: function( model, response, options ) {
              console.log('Could not create skribble');
            }
          });

          console.log( user.token );
          console.log( current.get('_id') );
        });
      }

      function _getState() {
        return {
          current: current,
          parent: parents.peek(),
          siblings: siblings
        }
      }

      // #PUBLIC methods
      return {
        seedWith: seed,
        findChild: findChildren,
        findParent: findParent,
        findNext: findNextSibling,
        findPrevious: findPreviousSibling,
        createSkribble: createSkribble,
        // Internal methods useful for testing and inspecting
        _state: _getState
      };
    };

    return {
      // SINGLETON!
      getInstance: function() {
        if ( !instance ) {
          instance = initService();
        }
        return instance;
      },
      _clear: function() {
        instance = undefined;
      }
    }

  })();

  // RETURN A SINGLETON
  return SkribbleService;
});
