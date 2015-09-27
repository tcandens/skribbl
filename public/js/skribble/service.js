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

  var SkribbleService = (function () {
    var instance;
    var vent = Radio.channel('SkribbleService');

    function initService() {
      var master = new SkribbleCollection();
      var siblings = new SkribbleCollection();
      var current;
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
      var _package = function() {
        var hasParent = parents.length() > 0 ? true : false;
        var hasChildren = current.get('children') && current.get('children').length > 0 ? true : false;
        var hasNext = siblings.at( siblings.indexOf( current ) + 1 ) ? true : false;
        var hasPrev = siblings.at( siblings.indexOf( current ) - 1 ) ? true : false;
        var displayClasses = [];

        if ( !hasParent ) displayClasses.push('is-no-parent');
        if ( !hasChildren ) displayClasses.push('is-no-children');
        if ( !hasNext ) displayClasses.push('is-no-next');
        if ( !hasPrev ) displayClasses.push('is-no-previous')

        return {
          current: current,
          parent: parents.peek(),
          displayClass: displayClasses.join(' ')
        }
      }

      function seed( model, callback ) {
        master.add( model, { reset: true } );
        current = model;
        var parentModel;
        var parentId = model.get('parent_skribbl') || null;
        if ( parentId ) {
          parentModel = new SkribbleModel({ _id: parentId });
          parentModel.asyncFetch(function( fetchedModel ) {
            parents.push( fetchedModel );
            var siblingsArray = fetchedModel.get('children') || [];
            siblings.add( siblingsArray, {reset: true} );
            if ( typeof callback === 'function' ) {
              callback ( _package() );
            } else {
              vent.request('seeded ready', _package() );
            }
          });
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
        var children = current.get('children') || undefined;
        if ( !children || children.length <= 0 ) {
          return _package();
        }
        parents.push( current );
        siblings.reset();
        siblings.add( children );
        current = siblings.at( 0 );
        var fetched = current.fetch();
        return _package();
      }

      // Find Next
      function findNextSibling() {
        var nextSibling = siblings.at( siblings.indexOf( current ) + 1 );
        current = nextSibling || current;
        return _package();
      }

      // Find Prev
      function findPreviousSibling() {
        var previousSibling = siblings.at( siblings.indexOf( current ) - 1 );
        current = previousSibling || current;
        return _package();
      }

      // Select Parent
      function findParent( callback ) {
        if ( parents.length() <= 0 ) {
          var parentId = current.get('parent_skribbl') || undefined;
          if ( parentId ) {
            var parentModel = new SkribbleModel({ _id: parentId });
            parentModel.asyncFetch(function( fetched ) {
              current = fetched;
              var gParentId = fetched.get('parent_skribbl') || undefined;
              if ( gParentId ) {
                var gParentModel = new SkribbleModel({ _id: gParentId });
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
          siblings.reset();
          if ( parents.peek() ) {
            siblings.add( parents.peek().get('children') );
          }
          var parentId = current.get('parent_skribbl') || undefined;
          if ( parentId ) {
            var parentModel = new SkribbleModel({ _id: parentId });
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
          var currentId = current.get('_id') ? current.get('_id') : null;
          var skribbleModel = current.clone().unset('_id').unset('id');
          skribbleModel.set({
            'eat': user.token,
            'parent_skribbl': currentId,
            'author': user.username,
            'content': skribble.content,
          });
          skribbleModel.save(null, {
            success: function( model, response, options ) {
              if ( typeof callback === 'function' ) callback( response );
            },
            error: function( model, response, options ) {
              console.log('Could not create skribble');
            }
          });
        });
      }

      function createStory( skribble, callback ) {
        userService.credentials(function( user ) {
          var storySkribble = new SkribbleModel({
            'eat': user.token,
            'author': user.username,
            'story_name': skribble.story_name,
            'content': skribble.content,
          });
          console.log( storySkribble );
          storySkribble.save(null, {
            success: function( model, response, options ) {
              if ( typeof callback == 'function' ) callback( response );
            },
            error: function( model, response, options ) {
              console.log('Could not create story');
            }
          });
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
        createStory: createStory,
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
