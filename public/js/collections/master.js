define([ 'backbone', 'underscore', '../models/skribbl' ],
  function( Backbone, _, Skribbl ) {
    return Backbone.Collection.extend({
      model: Skribbl,
      parse: function( response ) {
        console.log( response );
        var array = []
        function parseTree( node ) {
          if ( !node.children || node.children.length === 0 ) {
            console.log('pushing childless node')
            array.push( node );
            return;
          }
          var children = _.clone( node.children );
          console.log( children );
          delete node.children;
          children.forEach(function( el, i ) {
            console.log('iterating over children of ' + i );
            parseTree( el );
          });
        }
        parseTree( response );
        delete response.children;
        array.push( response );
        return array;
      }
    });
  }
);
