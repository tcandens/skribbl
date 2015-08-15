define([ 'marionette', 'backbone.radio', 'views/currentskribble', 'models/skribblemodel' ],
  function( Marionette, Radio, CurrentSkribbleView, SkribbleModel ) {
    'use strict';

    // TODO: Create Controller
    var Router = Marionette.AppRouter.extend({
      routes: {
        '': 'index',
        ':id': 'showSkribble'
      },
      index: function() {
        var skribbleModel = new SkribbleModel();
        skribbleModel.url = '/api/storys/random';
        // Have CurrentSkribbleView return a promise
        var contentView = new CurrentSkribbleView({ model: skribbleModel });
        Radio.channel('root').request('set:content', contentView);
      },
      showSkribble: function( id ) {
      }
    });
    return Router;
  }
);
