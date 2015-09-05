define([
  'marionette',
  'underscore',
  'jquery',
  'user/service',
  'skribble/list/view',
  'skribble/collection',
  'text!user/profile/template.html'
], function( Marionette, _, $, UserService, SkribbleListView, SkribbleCollection, template ) {
  'use strict';

  var userService = UserService.getInstance();

  var ProfileView = Marionette.LayoutView.extend({
    template: _.template( template ),
    regions: {
      nav: '.c-profile__navigation',
      skribbleList: '.c-profile__skribble-list'
    },
    onShow: function() {
      this.viewList();
    },
    viewList: function() {
      var self = this;
      var skribbleCollection = new SkribbleCollection();
      var listView = new SkribbleListView({ collection: skribbleCollection });
      // Get user if authenticated
      userService.credentials(function( user ) {
        skribbleCollection.url = 'api/skribbl/user/' + user.username;
        var fetched = skribbleCollection.fetch();
        $.when( fetched ).then(function() {
          self.showChildView('skribbleList', listView);
        })
      });
    }
  });
  return ProfileView;
});
