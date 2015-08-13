define([ 'marionette', '../eventbus', 'views/collection' ],
  function( Marionette, EventBus, SkribbleCollectionView ) {
    var RootView = Marionette.LayoutView.extend({
      el: '#main',
      template: '#main-template',
      regions: {
        left: '#left',
        right: '#right'
      },
      initialize: function() {
        EventBus.on('app:start', function() {
          this.getRegion('left').show( new SkribbleCollectionView() );
        }.bind( this ));
      }
    });
    return RootView;
  }
);
