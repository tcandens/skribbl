define([
  'backbone.radio',
  'skribble/model',
  'skribble/collection'
], function( Radio, SkribbleModel, SkribbleCollection ) {
  'use strict';

  var SkribbleService = function() {
    // A private master collection?
    // Siblings collection
    // Current reference
    // Parent reference, a stack of predecessors
    // Children reference, remains an array until loaded into siblings
    //
    // ACTIONS
    // Seed with first model & emit event
    // 1. Add model to collection
    // 2. Add model to current
    // 3. Fetch parent model from parent_skribbl id
    // 4. Any children returned from parent fetch are loaded to siblings, minus current
    // 5. RETURN: object with current, parent references to build views
    //
    // Get current
    //
    // Select children
    // 1. Move first child into current reference
    // 2. Move current reference to parent stack
    // 3. Reset siblings collection & move any other children into siblings
    // 4. Sync current to load more children
    // 5. RETURN: object with current, parent references as event to build views
    //
    // Find Next
    // 1. Search siblings collection for next model
    // 2. Replace current with found model
    // 3. If next does not exist
    // 4. RETURN: object with current reference to build view as event
    //
    // Find Prev
    // 1. Search siblings collection for previous model
    // 2. Replace current with found model
    // 3. If previoux does not exist, RETURN: current
    // 4. RETURN: object with current reference as event to build view
    //
    // Select Parent
    // 1. Replace current ref with parent ref
    // 2. Search master collection for new parent_skribbl
    // 3. # if it does not exist: Create, fetch, and add to collection
    // 4. Replace parent ref with new parent from parent_skribbl
    // 5. Replace siblings with all children from parent minus current
    // 6. RETURN: object with current, parent models as event to build views
    //
    // Add New
    // 1. Accepts object or attributes to be turned into model
    // 2. Merge attr with current skribbl _id to be used as skribbl_parent
    // 2. Add model to collection, replace
    return {

    }
  }

  return SkribbleService;
});
