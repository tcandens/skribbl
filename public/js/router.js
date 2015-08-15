define([ 'marionette', 'backbone.radio', 'views/currentskribble' ],
  function( Marionette, Radio, CurrentSkribbleView ) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      routes: {
        '': 'index',
        ':id': 'showSkribble'
      },
      index: function() {
        var contentView = new CurrentSkribbleView();
        Radio.channel('root').request('set:content', contentView);
      },
      showSkribble: function( id ) {
      }
    });
    return Router;
  }
);
