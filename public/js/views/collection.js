define([ 'marionette', '../eventbus', '../collections/master' ],
  function( Marionette, EventBus, MasterCollection ) {
    var SkribbleItemView = Marionette.ItemView.extend({
      template: '#skribbl-template'
    });
    var SkribbleCollectionView = Marionette.CollectionView.extend({
      initialize: function() {
        this.collection = new MasterCollection();
        this.collection.url = '/api/storys/random/';
      },
      onBeforeRender: function() {
        this.collection.fetch();
      },
      childView: SkribbleItemView
    });
    return SkribbleCollectionView;
  }
);
