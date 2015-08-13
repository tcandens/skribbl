define([ 'backbone', '../models/skribbl' ],
  function( Backbone, Skribbl ) {
    return Backbone.Collection.extend({
      model: Skribbl,
      parse: function( response ) {
        var array = []
        function parseTree( node ) {
          if ( !node.children || node.children.length === 0 ) {
            array.push( node );
            return;
          }
          var children = _.clone( node.children );
          delete node.children;
          children.forEach(function( el, i ) {
            parseTree( el );
          }.bind( this ) );
        }
        parseTree( response );
        delete response.children;
        array.push( response );
        return array;
      }
    });
  }
);
