define([
  'marionette',
  'underscore',
  'skribble/collection',
  'skribble/list/item/view',
  'text!skribble/list/template.html'
], function( Marionette, _, SkribbleCollection, ItemView, template ) {
  'use strict';

  var SkribbleListView = Marionette.CollectionView.extend({
    childView: ItemView
  });
  return SkribbleListView;
});
