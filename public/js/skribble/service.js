define([
  'jquery',
  'backbone.radio',
  'skribble/model',
  'skribble/collection'
], function( $, Radio, SkribbleModel, SkribbleCollection ) {
  'use strict';

  function Stack() {
    var stack = [];
    var top = 0;
    var length = stack.length;
    this.push = function( item ) {
      stack[ top++ ] = item;
    }
    this.pop = function() {
      top = top <= 0 ? 0 : top;
      return stack[ top-- ];
    }
    this.peek = stack[ top ];
  }

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

      // ACTIONS
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
            var siblings = fetchedModel.get('children') || [];
            // 4. Any children returned from parent fetch are loaded to siblings, minus current
            siblings = new SkribbleCollection( siblings );
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
        //current.asyncFetch(function( fetched) {
        // Adding to master, not yet needed
        //$.when( fetched ).then(function() {
          //_master.add( children, {merge: true} );
        //})
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
      function findParent() {
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
              } else {
                console.log( 'Root skribble was fetched' );
                parents.clear();
                return _package();
              }
            });
          } else {
            console.log( 'Root skribble!' );
            return _package();
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
          return _package();
        }
      }

      // Add New
      // 1. Accepts object or attributes to be turned into model
      // 2. Merge attr with current skribbl _id to be used as skribbl_parent
      // 2. Add model to collection, replace

      return {
        seedWith: seed.bind( this ),
        findChild: findChildren.bind( this ),
        findParent: findParent.bind( this ),
        findNext: findNextSibling.bind( this ),
        findPrevious: findPreviousSibling.bind( this )
      };
    };

    return {
      // SINGLETON!
      getInstance: function() {
        if ( !instance ) {
          instance = initService();
        }
        return instance;
      }
    }

  })();

  // RETURN A SINGLETON
  return SkribbleService;
});
