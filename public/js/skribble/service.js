define([
  'jquery',
  'backbone.radio',
  'skribble/model',
  'skribble/collection'
], function( $, Radio, SkribbleModel, SkribbleCollection ) {
  'use strict';

  var SkribbleService = (function () {

    var instance;

    var vent = Radio.channel('SkribbleService');

    function initService() {
      // A private master collection?
      var _master = new SkribbleCollection();
      // Siblings collection
      var _siblings = new SkribbleCollection();
      // Current reference
      var _current;
      // Parent reference, a stack of predecessors
      var _parents = (function() {
        var stack = [];
        function _push( item ) {
          stack.push( item );
        }
        function _pop() {
          return stack.pop()
        }
        return {
          push: _push,
          pop: _pop
        }
      })();
      // Children reference, remains an array until loaded into siblings
      //
      // Helper function to package internal data a object to pass through
      var _package = function() {
        return {
          current: _current,
          parent: _parents[ _parents.length - 1 ]
        }
      }

      // ACTIONS
      function _seed( model, callback ) {
        // Seed with first model & emit event
        // 1. Add model to collection
        _master.add( model );
        // 2. Add model to current
        _current = model;
        // 3. Fetch parent model from parent_skribbl id
        var parentModel;
        var parentId = model.get('parent_skribbl') || null;
        // if there is a parent_skribbl, fetch it
        if ( parentId ) {
          parentModel = new SkribbleModel({ _id: parentId });
          var fetched = parentModel.fetch();
          $.when( fetched ).then(function() {
            _parent = parentModel;
            var children = parentModel.get('children') || [];
            // 4. Any children returned from parent fetch are loaded to siblings, minus current
            _siblings = new SkribbleCollection( children );
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

      // Get current?

      // Select children
      function _findChildren() {
        // TEST IF THERE ARE CHILDREN;
        // 1. Move first child into current reference
        var children = _current.get('children') || null;
        var firstChild = children[0];
        // 2. Move current reference to parent stack
        _parents.push( _current );
        // 3. Reset siblings collection & move any other children into siblings
        _siblings.add( children, {reset: true} );
        _current = _siblings.shift();
        // 4. Sync current to load more children
        var fetched = _current.fetch();
        $.when( fetched ).then(function() {
          console.log('children fetched');
        })
        //vent.request('ready', _package() );
        return _package();
      }

      // Find Next
      function _findNextSibling() {
        // 1. Search siblings collection for next model
        // 2. Replace current with found model
        // 3. If next does not exist
        // 4. RETURN: object with current reference to build view as event
      }

      // Find Prev
      function _findPreviousSibling() {
        // 1. Search siblings collection for previous model
        // 2. Replace current with found model
        // 3. If previoux does not exist, RETURN: current
        // 4. RETURN: object with current reference as event to build view
      }

      // Select Parent
      function _findParent() {
        // TEST IF THERE IS A PARENT!
        // 1. Replace current ref with parent ref
        _current = _parents.pop();
        // 2. Search master collection for new parent_skribbl
        var tempParent = _master.findWhere({ _id: _current.id });
        // 3. # if it does not exist: Create, fetch, and add to collection
        // 4. Replace parent ref with new parent from parent_skribbl
        // 5. Replace siblings with all children from parent minus current
        // 6. RETURN: object with current, parent models as event to build views
        return _package();
      }

      // Add New
      // 1. Accepts object or attributes to be turned into model
      // 2. Merge attr with current skribbl _id to be used as skribbl_parent
      // 2. Add model to collection, replace

      return {
        seedWith: _seed.bind( this ),
        findChild: _findChildren.bind( this ),
        findParent: _findParent.bind( this )
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
