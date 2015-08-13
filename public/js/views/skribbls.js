define([ 'marionette' ],
  function( Marionette ) {
    var SkribblView = Marionette.ItemView.extend({
      tagName: 'div',
      className: 'skribbl',
      template: '#skribbl-template',
    });
    return SkribblView;
  }
);
