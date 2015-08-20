'use strict';

var expect = chai.expect;

describe('Skribble Backbone Collection', function() {

  var Backbone, SkribbleCollection;

  before(function(done) {
    require([
      'backbone',
      'underscore',
      'skribble/skribble_collection'
    ], function( backbone, _, skribbleCollection ) {
      Backbone = backbone;
      SkribbleCollection = skribbleCollection;
      console.log('Whaaat');
      done();
    });
  });

  it('should have a model property', function() {
    var collection = new SkribbleCollection();
    expect( collection ).to.be.instanceof( Backbone.Collection );
  });

});
