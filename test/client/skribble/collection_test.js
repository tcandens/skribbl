'use strict';

var expect = chai.expect;

describe('Skribble Backbone Collection', function() {

  var Backbone, SkribbleCollection, SkribbleModel;
  var testCollection, testModel;

  beforeEach(function(done) {
    require([
      'backbone',
      'skribble/skribble_collection',
      'skribble/skribble_model'
    ], function( backbone, skribbleCollection, skribbleModel ) {
      Backbone = backbone;
      SkribbleCollection = skribbleCollection;
      SkribbleModel = skribbleModel;
      testCollection = new skribbleCollection();
      testModel = new skribbleModel();
      done();
    });
  });

  it('should have a model property', function(done) {
    testModel.url = 'localhost:8000/api/storys/random';
    testModel.fetch({
      success: function( model, response, options ) {
        expect( model ).to.exist;
        console.log( model );
        done();
      },
      error: function( collection, response, options ) {
        expect.fail();
        done();
      }
    });
  });

});
